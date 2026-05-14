import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.jsx";
import { useState } from "react";

export function ForgotPswrd({ setInternalView, errors, setErrors }) {
  const handleForgotPsswrd = () => {};
  const [forEmail, setForEmail] = useState("");
  const [conEmail, setConEmail] = useState("");

  return (
    <>
      <form
        noValidate
        onSubmit={handleForgotPsswrd}
        className="flex flex-col flex-1 gap-4"
      >
        <p>Please confirm your identity before updating your password.</p>
        <div className="flex flex-col gap-1">
          <label htmlFor="for-email" className="text-sm font-medium">
            Email
          </label>
          <Input
            required
            className="rounded-sm focus-visible:border-atlas-indigo focus-visible:ring-1 focus-visible:ring-offset-0 bg-white border-[#d0d0d0]"
            id="for-email"
            type="email"
            value={forEmail}
            onChange={(e) => setForEmail(e.target.value.trim())}
            placeholder="Enter your email"
          />
          {errors.forEmail && (
            <p className="text-red-700 text-sm">{errors.forEmail}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="con-email" className="text-sm font-medium">
            Confirm Email
          </label>
          <Input
            required
            className="rounded-sm focus-visible:border-atlas-indigo focus-visible:ring-1 focus-visible:ring-offset-0 bg-white border-[#d0d0d0]"
            id="for-email"
            type="email"
            value={conEmail}
            onChange={(e) => setConEmail(e.target.value.trim())}
            placeholder="Re-enter your email"
          />
          {errors.conEmail && (
            <p className="text-red-700 text-sm">{errors.conEmail}</p>
          )}
        </div>
        <div className="flex-1 " />
        <div className="flex gap-2 justify-between">
          <Button
            onClick={() => setInternalView("sign-in")}
            className="rounded-sm text-atlas-indigo border border-atlas-indigo w-[30%] bg-white text-left cursor-pointer hover:bg-indigo-100"
          >
            Back
          </Button>
          <Button onClick={() => alert("Coming Soon") }className="rounded-sm bg-atlas-indigo self-center w-[30%] hover:bg-[#3730a3] cursor-pointer">
            Confirm
          </Button>
        </div>
      </form>

      {/* <Button
        onClick={() => setInternalView("sign-in")}
        className="rounded-sm bg-atlas-indigo self-center w-full my-5 hover:bg-[#3730a3] cursor-pointer"
      >
        Return Back
      </Button> */}
    </>
  );
}
