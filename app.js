import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routs/blog-routs.js';
import router from './routs/user-routs.js';
 

const app = express();

app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);


// 7CpGZ826n5qUXRtj
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://admin:7CpGZ826n5qUXRtj@cluster0.u0wyvop.mongodb.net/Blog?retryWrites=true&w=majority").then(() => app.listen(80)).then(() => console.log("db connected")).catch((err) => { console.log(err) });



