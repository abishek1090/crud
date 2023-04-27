
const mongoose = require("mongoose")
const DB = 'mongodb+srv://abishek:abishek@cluster0.ynkm5pm.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(DB).then(() => {
    console.log("connection is successfully setup..")
}).catch((e)=>{
    console.log(e);
    console.log("connection is not build...");
});