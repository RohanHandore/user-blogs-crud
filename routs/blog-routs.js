import  express from "express";
import { getAllBlogs } from "../controller/blog-controller.js";
import { AddBlog } from "../controller/blog-controller.js";
import { updateBlog } from "../controller/blog-controller.js";
import { getById } from "../controller/blog-controller.js";
import { deleteBlog } from "../controller/blog-controller.js";
import { getByUserId } from "../controller/blog-controller.js";

const blogRouter = express.Router();


blogRouter.get("/", getAllBlogs)
blogRouter.post("/add", AddBlog)
blogRouter.put("/update/:id", updateBlog)
blogRouter.get("/:id", getById)
blogRouter.delete("/:id", deleteBlog)
blogRouter.get("/user/:id", getByUserId)

export default blogRouter;