// importing uuid for generating unique id for jobs
import { v4 as uuidv4 } from 'uuid';
import ApplicantModel from './applicant.model.js';
export default class JobModel {
    constructor(id, category, designation, location, companyName,
        salary, deadline, skills, openings, postedDate, applicants) {
        this.id = id;
        this.category = category;
        this.designation = designation;
        this.location = location;
        this.companyName = companyName;
        this.salary = salary;
        this.deadline = deadline;
        this.skills = skills;
        this.openings = openings;
        this.postedDate = postedDate;
        this.applicants = applicants;
    }
    // get all jobs
    static getAllJobs() {
        return jobs;
    }
    // get a job by id
    static getJobById(id) {
        const job = jobs.find(job => job.id === id);
        return job;
    }
    // post a new job
    static postNewJob(job) {
        // converting skills field string input to array
        const extractedSkills = job.skills.split(',');
        const skills = extractedSkills.map(skill => skill.trim());
        const newJob = {
            id: uuidv4(),
            category: job.category,
            designation: job.designation,
            location: job.location,
            companyName: job.companyName,
            salary: job.salary,
            deadline: job.deadline,
            skills: skills,
            openings: job.openings,
            postedDate: new Date().toLocaleDateString(),
            applicants: []
        }
        jobs.push(newJob);
        return newJob.id;
    }
    // update a job by id
    static updateJob(job, id) {
        // converting skills field string input to array
        const extractedSkills = job.skills.split(',');
        const skills = extractedSkills.map(skill => skill.trim());
        job.skills = skills;
        const existingJob = JobModel.getJobById(id);
        if(existingJob){
            for(let key in existingJob){
                if(job.hasOwnProperty(key)){
                    existingJob[key] = job[key];
                }
            }
            return true;
        } else {
            return false;
        }
    }
    // delete a job by id
    static deleteJob(id) {
        const jobIndex = jobs.findIndex(job => job.id === id);
        if(jobIndex || jobIndex>=0) {
            jobs.splice(jobIndex, 1);
            return true;
        } else {
            return false;
        }
    }
    // to add a new applicant
    static addApplicant(newApplicant, id) {
        const job = JobModel.getJobById(id);
        if(job) {
            job.applicants.push(newApplicant);
        }
        return job;
    }
    // search jobs
    static searchJob(searchKeyword) {
        const jobDesignation = new RegExp(searchKeyword, 'i'); //regex ignore case
        const filteredJobs = jobs.filter(job => {
            return jobDesignation.test(job.designation) || jobDesignation.test(job.companyName);
        })
        return filteredJobs;
    }
}

const jobs = [
    {
        id: uuidv4(),
        category: 'Tech',
        designation: 'SDE-I',
        location: 'Madurai',
        companyName: 'HCL',
        salary: '6-7LPA',
        deadline: new Date().toLocaleDateString(),
        skills: ['Java', 'JavaScript', 'NodeJS', 'ReactJS'],
        openings: 10,
        postedDate: new Date().toLocaleDateString(),
        applicants: [
            new ApplicantModel(uuidv4(), 'Adithya', 'adi@gmail.com', '9283663728', '/uploads/Demo.pdf'),
            new ApplicantModel(uuidv4(), 'Ashok', 'ashok@gmail.com', '8289873728', '/uploads/Demo.pdf'),
            new ApplicantModel(uuidv4(), 'Vetri', 'vetri@gmail.com', '7823663720', '/uploads/Demo.pdf')
        ]
    },
    {
        id: uuidv4(),
        category: 'Tech',
        designation: 'MERN stack developer',
        location: 'Chennai',
        companyName: 'TCS',
        salary: '7-8LPA',
        deadline: new Date().toLocaleDateString(),
        skills: ['Java', 'JavaScript', 'NodeJS', 'ReactJS', 'Express', 'MongoDB'],
        openings: 10,
        postedDate: new Date().toLocaleDateString(),
        applicants: [
            new ApplicantModel(uuidv4(), 'Adithya', 'adi@gmail.com', '9283663728', '/uploads/Demo.pdf'),
            new ApplicantModel(uuidv4(), 'Ashok', 'ashok@gmail.com', '8289873728', '/uploads/Demo.pdf'),
            new ApplicantModel(uuidv4(), 'Vetri', 'vetri@gmail.com', '7823663720', '/uploads/Demo.pdf')
        ]
    },
    {
        id: uuidv4(),
        category: 'Tech',
        designation: 'SDE-II',
        location: 'Bangalore',
        companyName: 'Amazon',
        salary: '10-12LPA',
        deadline: new Date().toLocaleDateString(),
        skills: ['C++', 'JavaScript', 'NodeJS', 'ReactJS'],
        openings: 10,
        postedDate: new Date().toLocaleDateString(),
        applicants: [
            new ApplicantModel(uuidv4(), 'Adithya', 'adi@gmail.com', '9283663728', '/uploads/Demo.pdf'),
            new ApplicantModel(uuidv4(), 'Ashok', 'ashok@gmail.com', '8289873728', '/uploads/Demo.pdf'),
            new ApplicantModel(uuidv4(), 'Vetri', 'vetri@gmail.com', '7823663720', '/uploads/Demo.pdf')
        ]
    }
];