import '../db/connection.js';
import User from'../db/models/user.schema.js';
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

        const token = jwt.sign({ user_id : user._id }, process.env.JWT_SECRET_KEY);
        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({
            message: 'Login successful! Welcome to the app!',
            user: {
                name: user.name,
                surname: user.surname,
                email: user.email
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

        // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        // if (!passwordRegex.test(password)) {
        //     return res.status(400).json({
        //     error: 'Password must contain at least 8 characters and include both letters and numbers'
        //     });
        // }

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
        res.clearCookie('token');
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
        const { userId } = req.params;
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
        const { userId } = req.params;
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
