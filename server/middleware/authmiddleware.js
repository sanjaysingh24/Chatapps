import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  
 
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // { id: userId }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

export default authMiddleware;
