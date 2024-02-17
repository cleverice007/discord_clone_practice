import express from "express";
import { register, login } from "../controllers/auth/authController.js";
import Joi from "joi";
import { createValidator } from "express-joi-validation"; 

const router = express.Router();
const validator = createValidator({}); 

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

router.post("/register", validator.body(registerSchema), register);
router.post("/login", validator.body(loginSchema), login);

export default router;
