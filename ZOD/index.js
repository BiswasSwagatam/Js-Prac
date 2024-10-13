import express from "express";
import {UserModel, TodoModel} from "./db.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import z from "zod";

mongoose.connect("mongodb+srv://swagatam04biswas:Oaw7xnTMj6uVFpj1@cluster0.s6vjn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const app = express();
const JWT_SECRET = "secret"

app.use(express.json());

app.post("/signup", async (req, res) => {

    const requiredBody = z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string().min(6)
    })

    const parsedData = requiredBody.safeParse(req.body)

    if(!parsedData.success) {
        res.json({message: "incorrect format", error: parsedData.error})
        return
    }


    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        console.log(hashedPassword)

        await UserModel.create({email, password: hashedPassword, name});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"});
    }

    res.json({message: "Your are signed up"})
});

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({email});

    if(!user) {
        res.status(403).json({message: "User doesn't exist"});
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(passwordMatch){
        const token = jwt.sign({id: user._id}, JWT_SECRET);
        res.json({token}); 
    } else {
        res.status(403).json({message: "Invalid credentials"});
    }
});

app.post("/todo", auth, async (req, res) => {
    const userId = req.userId;
    const title = req.body.title;

    await TodoModel.create({title, userId});

    res.json({userId: userId})
});

app.get("/todos", auth, async (req, res) => {
    const userId = req.userId;

    const todos = await TodoModel.find({userId});

    res.json({todos})
});


function auth(req, res, next) {
    const token = req.headers.token

    const decodedData = jwt.verify(token, JWT_SECRET)

    if(decodedData) {
        req.userId = decodedData.id
        next()
    } else {
        res.sendStatus(403).json({message: "Not authorized"})
    }
} 

app.listen(3000, () => {
    console.log("Server started on port 3000");
});