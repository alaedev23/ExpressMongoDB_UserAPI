import jwt from 'jsonwebtoken';

const privateRoute = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user_id = decoded.user_id;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default privateRoute;
