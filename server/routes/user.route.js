import express from 'express';
import { authToken } from "../middlewear/authToken.js";
import { AllUsers , UpdateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/all-users', authToken, AllUsers);
router.post('/update-user/:id', authToken, UpdateUser);





export default router;