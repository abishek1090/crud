const express = require("express");
require("./DBConnection/conn");
const cors = require("cors");
const employee = require("./Routers/userRoute");
const app = express();
const port = process.env.PORT || 8004;
app.use(express.json());
app.use(employee);
app.use(cors());
app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
});

