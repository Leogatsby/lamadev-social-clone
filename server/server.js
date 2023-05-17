require('dotenv').config();
require('./Config/db')();

const express = require("express");
const app = express();

const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//middleware
const userRoute = require("./Routers/users");
const authRoute = require("./Routers/auth");
const postRoute = require("./Routers/posts");


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);



// 서버 시작
app.listen(process.env.PORT, () => {
    console.log(`서버가 http://localhost:${process.env.PORT} 에서 작동 중입니다.`);
  });