import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email(),
  password: z
    .union([z.string(), z.number().transform((n) => n.toString())])
    .refine((input) => input.length >= 6 && input.length <= 12, {
      message:
        "Password should have a minimum length of 6 and a maximum length of 12",
    }),
  confirm_password: z
    .union([z.string(), z.number().transform((n) => n.toString())])
    .refine((input) => input.length >= 6 && input.length <= 12, {
      message:
        "Password should have a minimum length of 6 and a maximum length of 12",
    }),

  first_name: z.coerce
    .string()
    .regex(/^[a-zA-Z]*$/g, {
      message: "Names should contain alphabets only or left blank",
    })
    .optional(),
  last_name: z
    .string()
    .regex(/^[a-zA-Z]*$/g, {
      message: "Names should contain alphabets only or left blank",
    })
    .optional(),
});
