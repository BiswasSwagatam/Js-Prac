import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import z from "zod";
import {Router} from "express"; 
import { courseModel, purchaseModel, userModel } from "../db.js";
import userAuth from "../middleware/user.auth.js";

const userRouter = Router();



userRouter.post("/signup", async (req, res) => {
    const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const result = schema.safeParse(req.body);

    if(!result.success) {
        res.status(400).json({message:"Incorrect format", error: result.error});
        return 
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        await userModel.create({
            name,
            email,
            password: hashedPassword
        });
    } catch (error) {
        throw error
    }

    res.json({message: "Signup suceeded"})
})

userRouter.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({email});

    if(!user) {
        return res.status(404).json({message: "User not found"});
    } 

    const isPasswordCorrect = bcrypt.compare(password, user.password);

    if(isPasswordCorrect) {
        const token = jwt.sign({id: user._id}, process.env.JWT_USER_SECRET);
        return res.json({token});
    } else {
        return res.status(400).json({message: "Invalid credentials"});
    }
})

userRouter.get("/purchases", userAuth, async (req, res) => {
    const userId = req.userId;
    const courses = await purchaseModel.find({userId});

    const courseData = await courseModel.find({
        _id : { $in : courses.map(x => x.courseId) }
    })

    res.json({courses, courseData})
})


export default userRouter