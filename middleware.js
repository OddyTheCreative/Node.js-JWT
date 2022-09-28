import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authenticate(req, res, next) {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export default authenticate;
