import express from 'express';
import JobController from '../controller/job.controller.js';
// file upload middleware
import { uploadFile } from '../middlewares/fileUpload.js';
// node mailer middleware
import { sendConfirmationMail } from '../middlewares/sendConfirmationMail.js';
// authentication middleware
import auth from '../middlewares/auth.js';
// initializing express router
const router = express.Router();
const jobController = new JobController();

router.get('/', jobController.getJobList);
router.get('/:id', jobController.getJobDetails);
router.post('/', auth, jobController.postJob);
router.post('/:id/apply', uploadFile.single('resume'), sendConfirmationMail, jobController.applyToJob);
router.post('/:id/update', auth, jobController.updateJobDetails);
router.get('/:id/delete', auth, jobController.deteleJob);
router.post('/search', jobController.searchJob);

export default router;