import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema= new Schema({
    "name": {
        type: String,
        require: true
    },
    "email": {
        type: String,
        require:true,
        unique : true
    },
    "password": {
        require: true,
        type: String,
        minlength:3  
    },
    "blogs":[{type: mongoose.Types.ObjectId , ref:"Blog", require:true}]
})
export default mongoose.model("User",userSchema);