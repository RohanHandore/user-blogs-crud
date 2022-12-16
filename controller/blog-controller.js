import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";



export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    }
    catch (err) {
        console.log(err);
    }
    if (!blogs) {
        return res.status(400).json({ message: "no blogs found" })
    }
    return res.status(200).json({ blogs })
};

export const AddBlog = async (req, res, next) => {
    const { title, discription, image, user } = req.body;
    let exitstingUser;
    try {
        exitstingUser = await User.findById(user)
    } catch (err) {
        console.log(err);
    }
    if (!exitstingUser) {
        return res.status(400).json({ message: "unable to find user by this id!" })
    }
    const blog = new Blog({
        title,
        discription,
        image,
        user
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        exitstingUser.blogs.push(blog);
        await exitstingUser.save({ session });
        await session.commitTransaction();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err })
    }
    return res.status(200).json({ blog });

}


export const updateBlog = async (req, res, next) => {
    const { title, discription } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            discription
        })
    }
    catch (err) {
        console.log(err);
    }
    if (!blog) {
        return res.status(401).json({ message: "unable to update the blog" });

    }
    return res.status(200).json({ blog });

}



export const getById = async (req, res, next) => {
    const Id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(Id);
    }
    catch (err) {
        console.log(err);
    }
    if (!blog) {
        return res.status(401).json({ message: "no such blog by this id" });
    }
    return res.status(200).json({ blog });


}



export const deleteBlog = async (req, res, next) => {
    const Id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(Id).populate("user");
        await blog.user.blogs.pull(blog)
        await blog.user.save();
    }
    catch (err) {
        console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "unable to delete" });
    }
    return res.status(200).json({ blog });


}


export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlog;
    try {
        userBlog = await User.findById(userId).populate("blogs")
    }
    catch (err) {
        console.log(err);
    }
    if (!userBlog) {
        return res.status(404).json({ message: "no blog found" });
    }
    return res.status(200).json({ blog: userBlog });


}


// string function

function indent(str) {
    var tokens = str.match(/!|,|pyjamas|(?:(?!pyjamas)[^!,])+/g);
    var depth = 0;
    var result = '';
    for (var i = 0; i < tokens.length; ++i) {
        var token = tokens[i];
        switch (token) {
            case '!':
                ++depth;
                result += token + '\n' ;
                break;
            case ',':
                --depth;
                result += '\n' + token;
                break;
            case 'blog:':
                result += token + '\n';
                break;
            default:
                result += token;
                break;
        }
    }
    return result;
}


export const getBlogText = async (req, res, next) => {
    const userId = req.params.id;
    let userBlog;
    try {
        userBlog = await User.findById(userId).populate("blogs")
    }
    catch (err) {
        console.log(err);
    }
    if (!userBlog) {
        return res.status(404).json({ message: "no blog found" });
    }

    // var text = JSON.stringify({ blog: userBlog["blogs"] });
    let blogs = userBlog["blogs"]
    // const maaap = new Map(blogs.entries());
    // const map = new Map(Object.entries(JSON.parse(blogs)));
    let str = ""
    blogs.map((blog, i) => {
        str += "#"+ parseInt(i+1) + '\n'
        str += "title: " + blog.title + '\n'
        str += "blog: " + blog.discription + '\n'
    })

    console.log(str)

    // for(let[key, values] of map){
    //     console.log(key,values);

    // }



    // maaap.set(blogs)
    // res.set({ "Content-Disposition": "attachment; filename=\"blogs.txt\"" });
    // text = indent(text)
    // text = text.replace(/[,"]/g, ' ');
    // text = text.replaceAll("{", "");
    // text = text.replaceAll("[", "");
    // text = text.replaceAll("}", "\n");
    // text = text.replaceAll("]", "\n");
    return res.send(str);

}