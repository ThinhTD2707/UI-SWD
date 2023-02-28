import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db, provider } from "../../config/firebase";
import {signInWithPopup} from "firebase/auth";
import { doc } from "firebase/firestore";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export function SignIn() {
  const [value, setDoc] = useState("");
  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const { user } = userCredential;
      // const name = user.displayName;
      const { email } = user;
      const usersCollectionRef = doc(db, "users", user.uid);
      await setDoc(usersCollectionRef, { email, googleAuth: true });
      localStorage.setItem("user", JSON.stringify(user));
      // rtn.setGlobal({ user: JSON.parse(JSON.stringify(user)) });
      rtn.user = JSON.parse(JSON.stringify(user));
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const nav = useNavigate();
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
      {value ? (
        nav("/dashboard/home")
      ) : (
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input type="email" label="Email" size="lg" />
            <Input type="password" label="Password" size="lg" />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
          <Button variant="gradient" className="mb-4" fullWidth onClick={signInWithGoogle}>
              Sign In with google
            </Button>
            <Button variant="gradient" fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
        )}
      </div>
    </>
  );
}

export default SignIn;
