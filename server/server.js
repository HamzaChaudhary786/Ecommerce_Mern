import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
dotenv.config()



const app = express();
app.use(express.json())
app.use(cookieParser())
// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST", "DELETE", "PUT"],
//         allowedHeaders: [
//             "Content-Type",
//             "Authorization",
//             "Cache-Control",
//             "Expires",
//             "Pragma",
//         ],
//         credentials: true,
//     })
// );

const allowedOrigins = ['http://localhost:5173', 'https://marketplace-bf8u.onrender.com'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies to be sent with requests
}));


app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 5000;

mongoose
    .connect("mongodb+srv://ecommerce:admin@cluster0.st46p.mongodb.net/")
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));



