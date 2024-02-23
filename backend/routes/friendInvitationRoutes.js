import Joi from "joi";
import { inviteFriend, acceptFriendInvitation, declineFriendInvitation } from "../controllers/friendInvitation/friendInvitationController";
import auth from "../middleware/auth.js";
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


router.post("/invite", auth, validator.body(inviteFriendSchema), inviteFriend);
router.post("/accept", auth, validator.body(decisionSchema), acceptFriendInvitation);
router.post("/decline", auth, validator.body(decisionSchema), declineFriendInvitation);

export default router;