import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId

const User = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const Todo = new Schema({
    title: { type: String, required: true },
    completed: Boolean,
    userId: ObjectId,
});

const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

// module.exports = { 
//     UserModel: UserModel, 
//     TodoModel: TodoModel
// };

export { UserModel, TodoModel }