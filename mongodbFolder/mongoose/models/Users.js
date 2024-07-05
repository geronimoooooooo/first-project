import mongoose from "mongoose";

const {Schema, model} = mongoose;

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
})

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100
    }, 
    email: {
        type: String,
        required: true,
        lowercase: true
      },
    createdAt: {
        type: Date,
        imutable: true, //cant be edited
        default: () => new Date()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: addressSchema
})

const User = mongoose.model("User", userSchema)
export {User}