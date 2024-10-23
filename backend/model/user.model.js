import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	name: {
		type: String,
		trim: true
	},
	profilePic: {
		type: String,
		trim: true
	}
})


const userModel = mongoose.model("User", userSchema);

export default userModel;
