import { useState } from "react";
import useAuth from "@/hooks/useAuth.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { Spinner } from "../ui/spinner.jsx";

export default function SignUp({ setTab, errors, setErrors }) {
  const [upEmail, setUpEmail] = useState("");
  const [upPswrd, setUpPswrd] = useState("");
  const [conPswrd, setConPswrd] = useState("");
  const [username, setUsername] = useState("");

  const { handleSignUp, loading } = useAuth({
    upEmail,
    upPswrd,
    conPswrd,
    username,
    setErrors,
  });
  return (
    <>
      {" "}
      <form
        noValidate
        onSubmit={handleSignUp}
        className="flex flex-col flex-1 gap-4"
      >
        {errors.backend && (
          <p className="text-red-700 text-sm">{errors.backend}</p>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Input
            required
            className="rounded-sm focus-visible:border-atlas-indigo focus-visible:ring-1 focus-visible:ring-offset-0 bg-white border-[#d0d0d0]"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="alex_wanderer42 or globetrotter"
          />
          {errors.username && (
            <p className="text-red-700 text-sm">{errors.username}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="up-email" className="text-sm font-medium">
            Email
          </label>
          <Input
            required
            className="rounded-sm focus-visible:border-atlas-indigo focus-visible:ring-1 focus-visible:ring-offset-0 bg-white border-[#d0d0d0]"
            id="up-email"
            type="email"
            value={upEmail}
            onChange={(e) => setUpEmail(e.target.value)}
            placeholder="alex@example.com"
          />
          {errors.upEmail && (
            <p className="text-red-700 text-sm">{errors.upEmail}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="up-pswd" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="up-pswd"
            required
            className="rounded-sm focus-visible:border-atlas-indigo focus-visible:ring-1 focus-visible:ring-offset-0 bg-white border-[#d0d0d0]"
            type="password"
            value={upPswrd}
            onChange={(e) => setUpPswrd(e.target.value)}
            placeholder="Create password"
          />
          {errors.upPswrd && (
            <p className="text-red-700 text-sm">{errors.upPswrd}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirm-pswd" className="text-sm font-medium">
            Confirm Password
          </label>
          <Input
            id="confirm-pswd"
            required
            className="rounded-sm focus-visible:border-atlas-indigo focus-visible:ring-1 focus-visible:ring-offset-0 bg-white border-[#d0d0d0]"
            type="password"
            value={conPswrd}
            onChange={(e) => setConPswrd(e.target.value)}
            placeholder="Confirm password"
          />
          {errors.conPswrd && (
            <p className="text-red-700 text-sm">{errors.conPswrd}</p>
          )}
        </div>

        <div className="flex-1" />

        <Button
          type="submit"
          disabled={loading}
          className="rounded-sm bg-atlas-indigo self-center w-full my-4 hover:bg-[#3730a3] cursor-pointer"
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
        Already have an account?{" "}
        <span
          onClick={() => setTab("sign-in")}
          className="text-atlas-amber text-center cursor-pointer hover:text-[#be9538]"
        >
          {" "}
          Sign in
        </span>
      </p>
    </>
  );
}
