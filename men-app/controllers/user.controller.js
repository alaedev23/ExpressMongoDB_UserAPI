import '../db/connection.js';
import Nota from '../db/models/nota.schema.js';
import User from '../db/models/user.schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userManagement = {};

userManagement.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                error: 'Invalid email or password'
            });
        }

        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET_KEY);
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({
            message: 'Login successful! Welcome to the app!',
            user: {
                id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                token
            }
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// login JSON

// {
//     "email": "random@gmail.com",
//     "password": "P@ssw0rd_1234"
// }

userManagement.registerUser = async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;

        // Password Strength

        if (password.length < 8) {
            return res.status(400).json({
                value: "password",
                error: 'Password must be at least 8 characters long'
            });
        }

        if (!/[a-zA-Z]/.test(password)) {
            return res.status(400).json({
                value: "password",
                error: 'Password must contain at least one letter'
            });
        }

        if (!/\d/.test(password)) {
            return res.status(400).json({
                value: "password",
                error: 'Password must contain at least one number'
            });
        }

        const nameRegex = /^[^\d]+$/;
        if (!nameRegex.test(name)) {
            return res.status(400).json({
                value: "name",
                error: 'Name cannot contain numbers'
            });
        }

        const surnameRegex = /^[^\d]+$/;
        if (!surnameRegex.test(surname)) {
            return res.status(400).json({
                value: "surname",
                error: 'Surname cannot contain numbers'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            surname,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({
            message: 'User registered successfully'
        });

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

userManagement.logoutUser = (req, res) => {
    try {
        // res.clearCookie('token');

        res.status(200).json({
            message: 'Logout successful! Goodbye!'
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

userManagement.deleteUser = async (req, res) => {
    try {

        if (req.user_id != req.body.id) {
            res.status(400).json({message: 'Author error'});
        }

        const userId = req.user_id;

        await Nota.deleteMany({ author: userId });

        await User.findByIdAndDelete(userId);
        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

userManagement.updateUser = async (req, res) => {
    try {

        if (req.user_id != req.body.id) {
            res.status(400).json({message: 'Author error'});
        }

        const userId = req.user_id;
        const { name, surname, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = {
            name,
            surname,
            email,
            password: hashedPassword
        };
        await User.findByIdAndUpdate(userId, updatedUser);
        res.status(200).json({
            message: 'User updated successfully'
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

export default userManagement;

// register JSON

// {
//     "name": "Mr",
//     "surname": "Random",
//     "email": "random@gmail.com",
//     "password": "P@ssw0rd_1234"
// }
