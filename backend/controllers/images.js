import Image from '../models/images.js';
import { parseToken } from '../utils/token.js';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (req, res) => {
    try {
        const image = req.file.path;
        const { name } = req.body;
        console.log(name, image);

        const userId = parseToken(req).id;

        const photoUrl = await cloudinary.uploader.upload(image);

        const newImage = Image.create({
            name,
            url: photoUrl.secure_url,
            user: userId
        });

        return res.status(200).send({
            message: 'Image uploaded successfully'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Failed to upload image'
        });
    }
}

export const getImages = async (req, res) => {
    try {
        const token = parseToken(req);

        if (!token) {
            return res.status(401).send({
                message: 'Unauthorized'
            });
        }

        const userId = token.id;

        const images = await Image.find({ user: userId });

        return res.status(200).send({
            images
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Failed to get images'
        });
    }
}