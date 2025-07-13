import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: string,
        required: true
    },
    subTitle: {
        type: string
    },
    description: {
        type: string,
        required: true
    },
    category: {
        type: string,
        required: true
    },
    image: {
        type: string,
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true
    },
}, {
    timestamps: true
});

const Blog = mongoose.model("blog", blogSchema);
export default Blog;