const express = require("express")
const user = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router();

router.post("/user", async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!")});
    const data = new user(req.body)
    const result = await data.save()

    if (!result) {
        res.json({
            status: "FAILED",
            message: "user not register successfully...."
        })
    }
    else {
        res.json({
            status: "SUCCESS",
            message: "user register successfully....",
            data: result
        })
    }
})

router.get("/user", async (req, res) => {
    try {
        const result = await user.find()
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Not found record"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: result
            })
        }
    }
    catch (e) {
        console.log(e)
    }
})

router.get("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await user.findById(_id);
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Record not found on this ID"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: result
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})

router.put("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")});
        const result = await user.findByIdAndUpdate(_id,req.body,{new: true});
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Records not Update....",
                data: result
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Record is Updated successfully...",
                data: result
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})

router.delete("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        if (!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, "jwtkey", (err, userInfo) => {
          if (err) return res.status(403).json("Token is not valid!")});
        const result = await user.findByIdAndDelete(_id);
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Record not Delete..."
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Record is Delete successfully..."
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})

router.post('/register', async (req, res) => {
    try {
      const isExisting = await User.findOne({ email: req.body.email })
      if (isExisting) {
        return res
          .status(400)
          .json('Already such an account with this email. Try a new one!')
      }
 
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
  
      const newUser = await User.create({ ...req.body, password: hashedPassword })
      const { password, ...others } = newUser._doc
      const token = jwt.sign(
        { id: newUser._id, type: newUser.type },
        '641958e3f2d9d7a30e2608fe',
        { expiresIn: '5h' }
      )
  
      return     res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  
    } catch (error) {
      return res.status(404).json(error.message)
    }
  })
  
  router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
        throw new Error('User credentials are wrong!')
      }
      const comparePass = await bcrypt.compare(req.body.password, user.password)
      if (!comparePass) {
        return res.status(404).json('User credentials are wrong!')
      }
  
      const { password, ...others } = user._doc
      const token = jwt.sign(
        { id: user._id, type: user.type },
        '641958e3f2d9d7a30e2608fe',
        { expiresIn: '5h' }
      )
  
      return     res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other)
    } catch (error) {
      return res.status(404).json(error.message)
    }
  })


module.exports = router