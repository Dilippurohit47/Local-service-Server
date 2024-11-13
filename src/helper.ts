import { ZodError } from "zod";

export const formatError = (error: ZodError): any => {
  const errors: any = [];

  error.errors.map((item) => {
    console.log(item);
    errors.push(item.message);
  });

  return errors;
};
