import multer from "multer";
// configuring multer for file upload
const storage = multer.diskStorage({
    destination : (req, res, next) => {
        next(null, './public/uploads/'); //path w.r.t index.js
    },
    filename : (req, res, next) => {
        next(null, req.body.name+'_'+Date.now()+'.pdf');
    }
});

export const uploadFile = multer({
    storage: storage
})