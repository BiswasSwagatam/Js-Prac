import express from "express";
import userRouter from "./routes/user.routes.js";
import courseRouter from "./routes/course.routes.js";
import adminRouter from "./routes/admin.routes.js";
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use('/user', userRouter)

app.use('/course', courseRouter)

app.use('/admin', adminRouter)


async function main(){
    console.log("Connected to MongoDB")

    mongoose.connect(process.env.MONGO_URI)
    app.listen(3000, () => {
        console.log("Server started on port 3000");
    })
}

main()