
import {Router} from "express"; 
import { courseModel, purchaseModel } from "../db.js";
import userAuth from "../middleware/user.auth.js";

const courseRouter = Router();


courseRouter.post("/purchase", userAuth, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({userId, courseId})

    res.json({message: "Purchase done"})
})

courseRouter.get("/all", async (req, res) => {
    const courses = await courseModel.find({});

    res.json({message:"Courses", courses})
})

export default courseRouter