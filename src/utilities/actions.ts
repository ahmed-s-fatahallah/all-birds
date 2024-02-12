import { z } from "zod";
import { FirebaseError, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAB9hCAKjHXD29TB2RZAuHwjYIq6eywSIY",
  authDomain: "react-http-47f95.firebaseapp.com",
  databaseURL: "https://react-http-47f95-default-rtdb.firebaseio.com",
  projectId: "react-http-47f95",
  storageBucket: "react-http-47f95.appspot.com",
  messagingSenderId: "1036937471448",
  appId: "1:1036937471448:web:d989eaa767582c80c53ead",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const formSchema = z.object({
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
  const loginFormSchema = formSchema.omit({
    first_name: true,
    last_name: true,
    confirm_password: true,
  });
  const parsedForm = loginFormSchema.safeParse({
    email: formData.get("login__email"),
    password: formData.get("login__password"),
  });
  if (!parsedForm.success) {
    console.log(parsedForm.error.flatten());
    return parsedForm.error.flatten();
  }

  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      parsedForm.data.email,
      parsedForm.data.password
    );
    console.log(userCredentials);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      console.log(error.message);
    }
  }
}

export async function registerHandler(prevState: State, formData: FormData) {
  const refinedRegisterSchema = formSchema.refine(
    (data) => data.password === data.confirm_password,
    {
      message: "The password and confirm password fields must match",
    }
  );
  const parsedForm = refinedRegisterSchema.safeParse({
    first_name: formData.get("register__first-name"),
    last_name: formData.get("register__last-name"),
    email: formData.get("register__email"),
    password: formData.get("register__password"),
    confirm_password: formData.get("register__confirm-password"),
  });
  if (!parsedForm.success) {
    return parsedForm.error.flatten();
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      parsedForm.data.email,
      parsedForm.data.password
    );
    console.log(userCredential);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      console.log(error.message);
    }
  }
}
