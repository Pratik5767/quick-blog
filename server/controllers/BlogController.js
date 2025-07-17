import fs from "fs"
import imageKit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";

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

        const fileBuffer = fs.readFileSync(imageFile.path);

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

        res.json({
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