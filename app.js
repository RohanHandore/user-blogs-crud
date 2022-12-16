import express from 'express';
import blogRouter from './routs/blog-routs.js';
import router from './routs/user-routs.js';
import { conn } from './database/config.js';

const port = process.env.PORT || 80;
const app = express();

app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);


app.listen(port, conn(port))
