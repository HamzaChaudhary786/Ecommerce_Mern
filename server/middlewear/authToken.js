import jwt from 'jsonwebtoken';

export const authToken = (req, res, next) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies?.access_token;


    console.log("hello world!");
    

    // If token is missing, throw error
    if (!token) {
      return res.status(401).json({
        message: 'Access token not found. Not authorized',
        success: false,
      });
    }

   
    // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token. Not authorized',
      success: false,
    });
  }
};
