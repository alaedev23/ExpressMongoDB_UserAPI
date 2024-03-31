import jwt from 'jsonwebtoken';

const privateRoute = (req, res, next) => {
    try {
        // El token se envía en el header de la peticio com Authorization
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // el token es verifica amb la clau secreta, en cas de que no sigui vàlid es llança un error
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // el user_id es guarda en el req en cas de que sigui correcte per a que sigui accessible en els controladors
        req.user_id = decoded.user_id;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default privateRoute;
