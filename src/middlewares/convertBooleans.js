export const convertBooleans = (req, res, next) => {
  if (req.body && typeof req.body.isFavorite === 'string') {
    req.body.isFavorite = req.body.isFavorite.toLowerCase() === 'true';
  }
  next();
};
