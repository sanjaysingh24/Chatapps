import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from '../utils/config/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'chat_uploads',
        resource_type:'auto'
    }
})

const upload = multer({storage});
export default upload;