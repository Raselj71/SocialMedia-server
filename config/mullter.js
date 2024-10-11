import multer from "multer";

const storage = multer.memoryStorage()

export default multer(
    {
        storage: storage,
      
        
      
        fileFilter: function (req, file, cb) {
            const fileRegex = new RegExp('\.(jpg|jpeg|png|mp4)$');
            const fileName = file.originalname;

            if (!fileName.match(fileRegex)) {
               
                return cb(new Error('Invalid file type'));
            }
           
            cb(null, true);
        }
    })
    .array("mediaFiles",20)