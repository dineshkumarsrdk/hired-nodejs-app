// importing express 
import express from "express";
import HomeController from "../controller/home.controller.js";

// initializing express router
const router = express.Router();
// initializing job controller
const homeController = new HomeController();
// routes
router.get('/', homeController.getHomePage);
router.get('/register', homeController.getRegisterPage);
router.post('/register', homeController.postRegister);
router.get('/login', homeController.getLoginPage);
router.post('/login', homeController.postLogin);
router.get('/logout', homeController.logoutUser);

// exporting the router
export default router;