import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema= new Schema({
    "title": {
        type: String,
        require: true
    },
    "discription": {
        type: String,
        require:true,
    },
    "image": {
        require: true,
        type: String,
        minlength:3  
    },
    "user":{
        type: mongoose.Types.ObjectId,
        ref:"User",
        require: true
    }
})
export default mongoose.model("Blog",blogSchema);