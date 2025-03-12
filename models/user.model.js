import { Schema, model, models } from "mongoose";

const UserShcamas = new Schema({
    email:{
        type: String,
        unique: [true, "This email is already in use"],
        required: [true, "Email is required"]
    },
    username:{
        type: String,
        require: [true, "Username is required"],
    },
    image:{
        type: String,
    }
}, {timestamps:true});

const User = models.User || model("User", UserShcamas);
export default User;
