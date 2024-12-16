const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require("./userController/user")
const postRouter = require("./postController/post")

app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userRouter)
app.use("/", postRouter)
app.use('/uploads', express.static('uploads'));







module.exports = app;