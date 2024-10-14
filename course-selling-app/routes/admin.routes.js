import {Router} from "express";
import { adminModel, courseModel } from "../db.js";
import {z} from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import adminAuth from "../middleware/admin.auth.js";

dotenv.config();

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {

    const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const result = schema.safeParse(req.body);

    if(!result.success) {
        return res.status(400).json(result.error);
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        await adminModel.create({
            name,
            email,
            password: hashedPassword
        });
    } catch (error) {
        throw error
    }

    res.json({message: "Signup suceeded"})
})

adminRouter.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await adminModel.findOne({email});

    if(!admin) {
        return res.status(404).json({message: "Admin not found"});
    } 

    const isPasswordCorrect = bcrypt.compareSync(password, admin.password);

    if(isPasswordCorrect) {
        const token = jwt.sign({id: admin._id}, process.env.JWT_ADMIN_SECRET);
        return res.json({token});
    } else {
        return res.status(400).json({message: "Invalid credentials"});
    }
})

adminRouter.post("/course", adminAuth, async (req, res) => {
    const adminId = req.adminId;

    const {title, price, image, description} = req.body;

    try {
        const course = await courseModel.create({title, price, image, description, creatorId: adminId});
        res.json({message: "Course created", courseId: course._id})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
})

adminRouter.put("/course/:courseId", adminAuth, async (req, res) => {
    const adminId = req.adminId;
    const courseId = req.params.courseId;
    const {title, price, image, description} = req.body;

    const foundCourse = await courseModel.findOne({_id: courseId, creatorId: adminId});

    if(!foundCourse) {
        res.status(404).json({message: "Course not found"})
        return 
    }

    try {
        const course = await courseModel.findOneAndUpdate({_id: courseId, creatorId: adminId}, {title, price, image, description});
        res.json({message: "Course updated"})
    } catch (error) {
        res.json({message: "Cannot update course"})
    }
})

adminRouter.get("/course/bulk", adminAuth, async (req, res) => {
    const adminId = req.adminId;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
})


export default adminRouter

// {
//     "title": "edited by jason course",
//     "price": "100.99",
//     "image": "imgurl.com",
//     "description": "randomm edited course"
// }
