import JobModel from "../model/job.model.js";
import ApplicantModel from '../model/applicant.model.js';

export default class JobController {
    // handler functions for job controller
    // to get the list of all jobs
    getJobList = (req, res) => {
        const jobs = JobModel.getAllJobs();
        res.status(200).render('joblist.ejs', {title: 'Hired | Jobs', jobs: jobs,
            locals: {userEmail:req.session.userEmail, userName:req.session.userName}
        });
    }
    // to get the details of a specific job
    getJobDetails = (req, res) => {
        const id = req.params.id;
        const job = JobModel.getJobById(id);
        if (job) {
            res.status(200).render('jobdetails.ejs', {title: 'Hired | Job Details', job: job,
                locals: {userEmail:req.session.userEmail, userName:req.session.userName}
            });
        } else {
            res.status(404).render('404error.ejs', { title: 'Hired | 404 error',
                locals: {userEmail:req.session.userEmail, userName:req.session.userName}
            });
        }
    }
    // to post a new job
    postJob = (req, res) => {
        const jobID = JobModel.postNewJob(req.body);
        const job = JobModel.getJobById(jobID);
        if (job) {
            res.redirect(`/jobs/${jobID}`);
            // res.status(200).render('jobdetails.ejs', {title: 'Hired | Job Details', job: job,
            //     locals: {userEmail:req.session.userEmail, userName:req.session.userName}
            // });
        } else {
            res.status(404).render('404error.ejs', {title: 'Hired | 404 error', 
                locals: {userEmail:req.session.userEmail, userName:req.session.userName}
            });
        }
    }
    // to apply to a job
    applyToJob = (req, res) => {
        const newApplicant = ApplicantModel.createApplicant(req.body, req.file.filename);
        const job = JobModel.addApplicant(newApplicant, req.params.id);
        if (job) {
            res.redirect(`/jobs/${req.params.id}`);
        } else {
            res.status(404).render('404error.ejs', {title: 'Hired | 404 error',
                locals: {userEmail:req.session.userEmail, userName:req.session.userName}
            });
        }
    }
    // to update job details
    updateJobDetails = (req, res) => {
        const updateStatus = JobModel.updateJob(req.body, req.params.id);
        if (updateStatus) {
            res.redirect(`/jobs/${req.params.id}`);
        } else {
            res.status(404).render('404error.ejs', { title: 'Hired | 404 error',
                locals: {userEmail:req.session.userEmail, userName:req.session.userName}
            });
        }
    }
    // to delete a job
    deteleJob = (req, res) => {
        const deletionStatus = JobModel.deleteJob(req.params.id);
        if (deletionStatus) {
            res.redirect(`/jobs`);
        } else {
            res.status(404).render('404error.ejs', { title: 'Hired | 404 error',
                locals: {userEmail:req.session.userEmail, userName:req.session.userName}
            });
        }
    }
    // search jobs functionality
    searchJob = (req, res) => {
        const filteredJobs = JobModel.searchJob(req.body.jobTitle);
        res.status(200).render('joblist.ejs', {title: 'Hired | Jobs', jobs: filteredJobs,
            locals: {userEmail:req.session.userEmail, userName:req.session.userName}
        });
    }
}