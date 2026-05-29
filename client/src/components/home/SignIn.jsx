import { useState } from "react";
import useAuth from "@/hooks/useAuth.jsx";
import { ForgotPswrd } from "./ForgotPswrd.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { Spinner } from "../ui/spinner.jsx";

export default function SignIn({ setTab, errors, setErrors }) {
  const [internalView, setInternalView] = useState("sign-in"); //Value can be " or forgot-pswrd"
  const [inEmail, setInEmail] = useState("");
  const [inPswrd, setInPswrd] = useState("");

  const { handleSignIn, loading } = useAuth({
    inEmail,
    inPswrd,
    setErrors,
  });
  return (
    <>
      {internalView === "sign-in" && (
        <>
          <form
            noValidate
            onSubmit={handleSignIn}
            className="flex flex-col flex-1 gap-4"
          >
            {errors.backend && (
              <p className="text-red-700 text-sm">{errors.backend}</p>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="in-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                required
                className="rounded-sm focus-visible:border-atlas-indigo focus-visible:ring-1 focus-visible:ring-offset-0 bg-white border-[#d0d0d0]"
                id="in-email"
                type="email"
                value={inEmail}
                onChange={(e) => setInEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {errors.inEmail && (
                <p className="text-red-700 text-sm">{errors.inEmail}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="in-pswd" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="in-pswd"
                required
                className="rounded-sm focus-visible:border-atlas-indigo focus-visible:ring-1 focus-visible:ring-offset-0 bg-white border-[#d0d0d0]"
                type="password"
                value={inPswrd}
                onChange={(e) => setInPswrd(e.target.value)}
                placeholder="Enter your password"
              />
              {errors.inPswrd && (
                <p className="text-red-700 text-sm">{errors.inPswrd}</p>
              )}
              <p
                onClick={() => setInternalView("forgot-pswrd")}
                className="text-atlas-amber text-right cursor-pointer hover:text-[#be9538]"
              >
                {" "}
                Forgot password?
              </p>
            </div>
            <div className="flex-1" />

            <Button
              type="submit"
              disabled={loading}
              className="rounded-sm bg-atlas-indigo self-center w-full my-5 hover:bg-[#3730a3] cursor-pointer"
            >
              {/* {loading ? (
                <span className="flex items-center gap-2">
                  Continue
                  <Spinner />
                </span>
              ) : (
                "Continue"
              )} */}
              Continue
            </Button>
          </form>
          <p className="text-center text-[#6b7280]">
            No account?{" "}
            <span
              onClick={() => setTab("sign-up")}
              className="text-atlas-amber text-center cursor-pointer hover:text-[#be9538]"
            >
              {" "}
              Sign up
            </span>
          </p>{" "}
        </>
      )}

      {internalView === "forgot-pswrd" && (
        <ForgotPswrd
          setInternalView={setInternalView}
          errors={errors}
          setErrors={setErrors}
        />
      )}
    </>
  );
}
