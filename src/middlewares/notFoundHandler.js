import createHttpError from 'http-errors';
// eslint-disable-next-line no-unused-vars
export const notFoundHandler = (req, res, next) => {
  throw createHttpError(
    res.status(404).json({
      status: 404,
      message: 'Route not found',
    }),
  );
};
