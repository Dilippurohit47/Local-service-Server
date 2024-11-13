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
  city: z
    .string({ message: "Please enter your city" })
    .max(15, { message: "Please provide valid city name" })
    .min(3, { message: "Please provide valid  city name" }),
  country: z
    .string({ message: "Please enter your country" })
    .max(15, { message: "Please provide valid country name" })
    .min(3, { message: "Please provide valid  country name" }),
  state: z
    .string({ message: "Please enter your state" })
    .max(15, { message: "Please provide valid state name" })
    .min(3, { message: "Please provide valid  state name" }),
  pincode: z
    .string({ message: "Please enter your pincode number " })
    .max(6, { message: "Please provide valid pincode number" })
    .min(6, { message: "Please provide valid  pincode number" }),
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
