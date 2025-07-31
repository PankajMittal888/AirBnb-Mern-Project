import multer from "multer";
const storage = multer.diskStorage({
  destination:(req, file, cb) =>{
    cb(null, './public')
  },
  filename:(req, file, cb)=>{
    const uniqueSuffix = Date.now();
    cb(null, file.originalname+ '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })
export default upload;