import  express from "express";
import {getAllBlogs,AddBlog,updateBlog,getById,deleteBlog,getByUserId,getBlogText} from "../controller/blog-controller.js";

const blogRouter = express.Router();


blogRouter.get("/", getAllBlogs)
blogRouter.post("/add", AddBlog)
blogRouter.put("/update/:id", updateBlog)
blogRouter.get("/:id", getById)
blogRouter.delete("/:id", deleteBlog)
blogRouter.get("/user/:id", getByUserId)
blogRouter.get("/user/download/:id", getBlogText)

export default blogRouter;