import jwt from 'jsonwebtoken';

function verifyJWT(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    req.tokenData  = jwt.verify(token.split('Bearer ').pop(), process.env.JWT_KEY);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export default verifyJWT;
