import mongoose from "mongoose";



const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
});

const adminSchema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
});

const courseSchema = new Schema({
    title: String,
    price: Number,
    image: String,
    description: String,
    creatorId: ObjectId
});

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})


const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);


export { userModel, adminModel, courseModel, purchaseModel }