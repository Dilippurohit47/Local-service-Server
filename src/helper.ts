import { ZodError } from "zod";

export const formatError = (error: ZodError): any => {
  const errors: any = {};

  error.errors.map((item) => {
    errors[item.path?.[0]] = item.message;
  });

  return errors;
};
