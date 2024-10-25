import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be 3 characters long." }),
  email: z
    .string({ message: "Email is required." })
    .email({ message: "Please type valid email." }),
  password: z
    .string({ message: "Password is required." })
    .min(6, { message: "passwrod must be 6 charcters long." }),
  phoneNo: z
    .string({ message: "Phone number is required." })
    .max(10, { message: "Please provide valid number" })
    .min(10, { message: "Please provide valid number" }),
});

export const serviceManRegisterSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be 3 characters long." }),
  email: z
    .string({ message: "Email is required." })
    .email({ message: "Please type valid email." }),
  password: z
    .string({ message: "Password is required." })
    .min(6, { message: "passwrod must be 6 charcters long." }),
  phoneNo: z
    .string({ message: "Phone number is required." })
    .max(10, { message: "Please provide valid number" })
    .min(10, { message: "Please provide valid number" }),
  workingPhoneNo: z
    .string({ message: "Phone number is required." })
    .max(10, { message: "Please provide valid number" })
    .min(10, { message: "Please provide valid number" }),
  profileUrl: z.string({ message: "Profile is required." }),
  services: z
    .array(z.string().min(1, { message: "At least one service is required." }))
    .nonempty({ message: "At least one service is required." }),
});
