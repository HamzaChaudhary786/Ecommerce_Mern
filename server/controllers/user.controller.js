import User from "../models/user.model.js";


export const AllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const allUsers = await User.find();

        // Remove the password field from each user object
        const usersWithoutPasswords = allUsers.map(user => {
            const { password, ...rest } = user._doc;
            return rest;
        });

        res.status(200).json({
            data: usersWithoutPasswords,
            success: true,
            error: false,
            message: 'All users fetched successfully',
        });
    } catch (err) {
        res.status(404).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};




export const UpdateUser = async (req, res) => {
    try {

        const { id } = req.params;

        const {username, email, role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { username, email, role }, { new: true });

        res.status(200).json({
            data: updatedUser,
            success: true,
            message: 'User updated successfully',
        });

    } catch (err) {
        res.status(404).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};