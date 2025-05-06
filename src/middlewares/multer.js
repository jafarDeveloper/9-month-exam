import multer from "multer";
import {v2 as cloud} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import {config} from "dotenv";
config();

cloud.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloud,
    params: {
        folder: "fileUpload",
        allowed_formats: ["jpg", "png", "jpeg", "gif"]
    }
})

export const upload = multer({storage: storage});

export const deleteFileFromCloudinary = (publicId) => {
    return new Promise((resolve, reject) => {
      cloud.uploader.destroy(publicId, { invalidate: true, resource_type: "image" }, (error, result) => {
        if (error) {
          console.error("Cloudinary delete error:", error);
          reject(error);
        } else {
          console.log("Cloudinary delete result:", result);
          resolve(result);
        }
      });
    });
  };
  

