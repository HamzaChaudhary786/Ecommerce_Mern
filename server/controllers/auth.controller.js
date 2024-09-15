import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {

    try {
        const { username, email, password, avatar } = req.body;
        const user = await User.findOne({ email: email })

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        const hashPassword = await bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashPassword, avatar, role: 'User' })
        await newUser.save();
        res.status(201).json({
            data: newUser,
            success: true,
            message: 'User registered successfully'
        });
    } catch (err) {
        res.status(404).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(403).json(
            {
                success: false,
                message: 'User not found'
            }
        );

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) return res.status(404).json(
            {
                success: false,
                message: 'Invalid User Password'
            }
        );

        console.log(process.env.JWT_SECRET_KEY);

        const token = jwt.sign({
            _id: user._id, email: user.email
        }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); // Ensure you're using JWT_SECRET_KEY


        const { password: pass, ...rest } = user._doc;

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        })
            .status(200)
            .json(
                {
                    data: { ...rest, token },
                    success: true,
                    message: 'User successfully login'
                });
    } catch (err) {
        res.status(404).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
};

export const signout = async (req, res, next) => {
    try {
        // Clear the cookie with the default path
        res.clearCookie('access_token');
        res.status(200).json({
            data: {},
            message: "User has been logged out"
        });
    } catch (err) {
        res.status(404).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
};




