// importing uuid for generating unique id for applicants
import {v4 as uuidv4} from 'uuid';

export default class ApplicantModel {
    constructor(id, name, email, contact, resume) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.resume = resume;
    }
    // adding new applicant
    static createApplicant(applicant, filename) {
        const {name, email, contact} = applicant;
        const resume = '/uploads/'+filename;
        const newApplicant = new ApplicantModel(uuidv4(), name, email, contact, resume);
        return newApplicant;
    }
}