import { z } from "zod";

//Password validator regex pattern & error message
const PasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;
const PasswordError =
  "Password must be at least 8 character, include uppercase, lowercase, digit and special character.";

//Signup validator
const registerValidator = z
  .object({
    name: z.string().min(3).max(50),
    email: z.string().email({ message: "Enter valid email" }),
    password: z.string().regex(PasswordRegex, { message: PasswordError }),
    acc_type: z.string().default("savings"),
  })
  .strict();

//Sign in Validator
const signInValidator = z
  .object({
    email: z.string().email({ message: "Enter valid email" }),
    password: z.string(),
  })
  .strict();

const transactionValidator = z.object({
  receiver: z.string(),
  description: z.string(),
  amount: z.number().min(1000, "You can't transfer less than 1000"),
});

export { registerValidator, signInValidator, transactionValidator };
