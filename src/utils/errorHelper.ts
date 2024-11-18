export const handleError = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string
) => {
  return res.status(statusCode).json({
    success: success,
    message: message,
  });
};
