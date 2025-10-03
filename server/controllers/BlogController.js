import fs from "fs"
import imageKit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // check if all the fields are present
        if (!title || !description || !category || !imageFile) {
            return res.json({
                success: false,
                message: "Please enter all the fields"
            })
        }

        const fileBuffer = fs.readFileSync(imageFile.path); // converting into base64 format

        // upload Image to Imagekit
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // optimization through imagekit URL transformation
        const optimizedImageURL = imageKit.url({
            path: response.filePath,
            transformation: [
                { quality: "auto" }, // Auto compress
                { format: "webp" }, // convert to morden format
                { width: "1280" } // width resizing
            ]
        });

        const image = optimizedImageURL;
        await Blog.create({
            title, subTitle, description, category, image, isPublished
        })

        return res.json({
            success: true,
            message: "Blog added successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blog = await Blog.find({ isPublished: true });
        return res.json({
            success: true,
            blog
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({
                success: false,
                message: 'Blog not found'
            })
        }

        return res.json({
            success: true,
            blog
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);

        // delete all comments associated with this blogs
        await Comment.deleteMany({ blog: id });

        return res.json({
            success: true,
            message: 'Blog deleted successfully'
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        return res.json({
            success: true,
            message: 'Blog status updated'
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({ blog, name, content });
        return res.json({
            success: true,
            message: 'Comment added for review'
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        return res.json({
            success: true,
            comments
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}