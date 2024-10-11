import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';


 cloudinary.config({
    api_key:process.env.api_key,
    cloud_name:process.env.cloud_name,
    api_secret:process.env.api_secret
})

export const  uploadImage = async (fileStream, fileName)=>{
    const result = await uploadStream(fileStream, fileName);
    return result;
}

const uploadStream = (fileStream, name) => {

   
    return new Promise((resolve, reject) => {        
        cloudinary.uploader.upload_stream({ public_id: name }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }).end(fileStream)
    });
};