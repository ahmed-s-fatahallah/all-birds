import { z } from "zod";

const formSchema = z
  .object({
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
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "The password and confirm password fields must match",
  });

export type State =
  | z.typeToFlattenedError<
      {
        email: string;
        password: string | number;
        confirm_password: string | number;
        first_name?: string | undefined;
        last_name?: string | undefined;
      },
      string
    >
  | undefined;

export async function loginHandler(prevState: State, formData: FormData) {
  const parsedForm = formSchema.safeParse({
    email: formData.get("login__email"),
    password: formData.get("login__password"),
  });

  if (!parsedForm.success) {
    return parsedForm.error.flatten();
  }
  console.log(parsedForm.data);
}
export async function registerHandler(prevState: State, formData: FormData) {
  const parsedForm = formSchema.safeParse({
    first_name: formData.get("register__first-name"),
    last_name: formData.get("register__last-name"),
    email: formData.get("register__email"),
    password: formData.get("register__password"),
    confirm_password: formData.get("register__confirm-password"),
  });
  if (!parsedForm.success) {
    return parsedForm.error.flatten();
  }

  console.log(parsedForm.data);
}
