import Joi from "joi";
import { inviteFriend, acceptFriendInvitation, declineFriendInvitation } from "../controllers/friendInvitation/friendInvitationController.js";
import { verifyToken } from "../middleware/auth.js";
import { createValidator } from "express-joi-validation"; 
import express from "express";

const router  = express.Router();
const validator = createValidator({});

const inviteFriendSchema = Joi.object({
    targetMailAddress: Joi.string().email(),
});

const decisionSchema = Joi.object({
    id: Joi.string().required(),
});


router.post("/invite", verifyToken, validator.body(inviteFriendSchema), inviteFriend);
router.post("/accept", verifyToken, validator.body(decisionSchema), acceptFriendInvitation);
router.post("/decline", verifyToken, validator.body(decisionSchema), declineFriendInvitation);

export default router;