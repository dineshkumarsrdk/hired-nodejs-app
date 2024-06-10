import UserModel from "../model/user.model.js";

export default class HomeController {
    // to get the home page
    getHomePage = (req, res) => {
        res.status(200).render('home.ejs', {
            title: 'Hired | Home',
            locals: { userEmail: req.session.userEmail, userName: req.session.userName }
        });
    }
    // to get the register page
    getRegisterPage = (req, res) => {
        if (req.session.userEmail) {
            res.redirect('/jobs');
        } else {
            res.status(200).render('register.ejs', {
                title: 'Hired | Register', success: true,
                locals: { userEmail: req.session.userEmail, userName: req.session.userName }
            });
        }
    }
    // to get the login page
    getLoginPage = (req, res) => {
        if (req.session.userEmail) {
            res.redirect('/jobs');
        } else {
            res.status(200).render('login.ejs', {
                title: 'Hired | Login', success: true,
                locals: { userEmail: req.session.userEmail, userName: req.session.userName }
            });
        }
    }
    // to register the user
    postRegister = (req, res) => {
        const registrationStatus = UserModel.registerUser(req.body);
        if (registrationStatus) {
            res.redirect('/login');
            // res.status(201).render('login.ejs', {title: 'Hired | Login', success: true,
            //     locals: {userEmail:req.session.userEmail, userName:req.session.userName}
            // });
        } else {
            res.status(401).render('register.ejs', {
                title: 'Hired | Register', success: false,
                locals: { userEmail: req.session.userEmail, userName: req.session.userName }
            });
        }
    }
    // to login the user and registering the email and name to session
    postLogin = (req, res) => {
        const user = UserModel.loginUser(req.body);
        req.session.userEmail = req.body.email;
        if (user) {
            req.session.userName = user.name;
            res.redirect('/jobs');
            // res.status(200).render('joblist.ejs', {title: 'Hired | Jobs', success: true});
        } else {
            res.status(401).render('login.ejs', {
                title: 'Hired | Jobs', success: false,
                locals: { userEmail: req.session.userEmail, userName: req.session.userName }
            });
        }
    }
    // logout
    logoutUser = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    }
}