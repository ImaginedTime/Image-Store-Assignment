import { Router } from 'express';
import { body, header, validationResult } from 'express-validator';
import validateRequest from '../utils/validate.js';

import { uploadImage, getImages } from '../controllers/images.js';

import multer from 'multer';
const upload = multer({ dest: "uploads/" });


const router = Router();

router.get('/', [
    header('Authorization').exists().isString(),
    validateRequest,
], getImages);

router.post('/upload', [
    header('Authorization').exists().isString(),
    upload.single('image'),
    body('name').exists().isString(),
    validateRequest,
], uploadImage);

export default router;