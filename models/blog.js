const { Schema, model } = require('mongoose');
const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    coveredImageUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true});   

const Blog = model("Blog", blogSchema);

module.exports = Blog;
