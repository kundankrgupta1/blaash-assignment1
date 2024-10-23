import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import userModel from "../model/user.model.js";
dotenv.config();

const userRegistration = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		if (!name || !email || !password) {
			return res.status(400).json({
				message: `All fields are required!!!`,
				success: false
			});
		}

		const user = await userModel.findOne({ email });
		if (user) {
			return res.status(409).json({
				message: `User already exists!!!`,
				success: false
			});
		}
		
		const hashPass = bcrypt.hashSync(password, 10);
		const newUser = new userModel({
			name, email, password: hashPass
		});

		await newUser.save();
		
		return res.status(201).json({
			message: `Registration Successful!!!`,
			success: true
		});
	} catch (error) {
		return res.status(500).json({
			message: `Error during registration: ${error.message}`,
			success: false
		});
	}
};

const userLogin = async (req, res) => {
	const { email, password } = req.body;
	try {

		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(401).json({
				message: `User not found!!!`,
				success: false
			});
		}

		const checkPass = bcrypt.compareSync(password, user.password);
		if (!checkPass) {
			return res.status(401).json({
				message: `Wrong credentials`,
				success: false
			});
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
		return res.status(200).json({
			message: `Login successful!!!`,
			success: true,
			token,
			data: {
				_id: user._id,
				name: user.name,
				email: user.email,
				profilePic: user.profilePic
			}
		});
	} catch (error) {
		return res.status(500).json({
			message: `Error during login: ${error.message}`,
			success: false
		});
	}
};

export { userRegistration, userLogin };
