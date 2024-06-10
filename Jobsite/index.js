// importing the required modules
import express, { urlencoded } from "express";
import ejslayouts from 'express-ejs-layouts';
import path from 'path';
import session from 'express-session';

// importing routers
import homeRouter from './src/routes/home.route.js'; 
import jobRouter from './src/routes/job.route.js';

const port = 3000;
// initializing express
const app = express();
// setting-up ejs view engines
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(),'src','views'));
// app.set('views', './src/views'); //both works fine
// body-parsing middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(ejslayouts);
app.use(express.static(path.join(path.resolve(),'public')));
// configuring app for express session
app.use(session({
    secret: 'a1b2c3',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));
// configuring the routes
// home routes
app.use('/', homeRouter);
// job routes
app.use('/jobs', jobRouter);
// wild card route
app.use('*', (req, res)=>{
    res.status(404).render('404error.ejs', { title: 'Hired | 404 error',
        locals: {userEmail:req.session.userEmail, userName:req.session.userName}
    });
});

app.listen(port, (err)=>{
    if(err){
        console.log(err);
    } else {
        console.log(`Server is listening on port ${port}`);
    }
})
