export const errorHandler = (error, req, res, next) => {
  console.log('-------------------------------------')
  const { message, statusCode } = error;
  res.status(statusCode || 500).json({message})
}