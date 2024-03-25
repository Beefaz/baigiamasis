import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  console.log(req);
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    req.userId  = jwt.verify(token.split('Bearer ').pop(), process.env.JWT_KEY);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export default verifyToken;
