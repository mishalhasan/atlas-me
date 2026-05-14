import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs.jsx";
import { Input } from "../components/ui/input";
import { useState, useDebugValue } from "react";
import { validateEmail } from "@/utils/helper.js";
import api from "../api/api.js";
import { ForgotPswrd } from "@/components/home/ForgotPswrd.jsx";

function Home() {
  const [tab, setTab] = useState("sign-in");
  const [internalView, setInternalView] = useState("sign-in"); //Value can be " or forgot-pswrd"

  const [errors, setErrors] = useState({});
  const [inEmail, setInEmail] = useState("");
  const [upEmail, setUpEmail] = useState("");
  const [inPswrd, setInPswrd] = useState("");
  const [upPswrd, setUpPswrd] = useState("");
  const [conPswrd, setConPswrd] = useState("");
  const [username, setUsername] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    const newErrors = {};

    //Email validation
    const emailErr = validateEmail(inEmail);
    if (emailErr) newErrors.inEmail = emailErr;

    //Validate user input
    if (!inEmail) newErrors.inEmail = "Email is required";
    if (!inPswrd) newErrors.inPswrd = "Password is required";

    console.log("newErrors", newErrors);

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      //API Call
      console.log("Success");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newErrors = {};

    //Email validation
    const emailErr = validateEmail(upEmail);
    if (emailErr) newErrors.upEmail = emailErr;

    //Validate user input

    if (!upEmail) newErrors.upEmail = "Email is required";
    if (!upPswrd) newErrors.upPswrd = "Password is required";
    if (!conPswrd) newErrors.conPswrd = "Please confirm your password";
    if (!username) newErrors.username = "Username is required";

    //Passwords match validation
    if (upPswrd !== conPswrd) {
      newErrors.upPswrd = "Passwords do not match";
      newErrors.conPswrd = "Passwords do not match";
    }

    //Username validation
    if (username.length < 3 || username.length > 20) {
      newErrors.username = "Username must be 3–20 characters long.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      //API Call
      console.log("Success");

      const newUser = await api.post("/api/auth/register", {
        username,
        email: upEmail,
        password: conPswrd,
      });
    }
  };

  return (
    <>
      <div
        className="bg-atlas-map-bg w-screen h-screen flex items-center justify-center"
        style={{
          backgroundImage: `
      linear-gradient(to right, rgba(212,168,67,0.15) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(212,168,67,0.15) 1px, transparent 1px)

      `,
          // backgroundSize: "150px 150px",
          backgroundSize: "150px 170px",
        }}
      >
        <Card className="w-[350px] flex flex-col ">
          <CardHeader>
            <CardTitle className="text-center font-playfair text-2xl">
              AtlasMe
            </CardTitle>

            <CardDescription className="text-center">
              {tab === "sign-in"
                ? "Your map is waiting."
                : "Your atlas begins here."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs
              value={tab}
              onValueChange={setTab}
              className="min-h-[460px] w-[290px] flex flex-col"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4 ">
                <TabsTrigger
                  className="data-[state=active]:bg-atlas-map-bg data-[state=active]:text-white"
                  value="sign-in"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-atlas-map-bg data-[state=active]:text-white"
                  value="sign-up"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="sign-in" className="flex flex-col flex-1">
                {internalView === "sign-in" && (
                  <>
                    <form
                      noValidate
                      onSubmit={handleSignIn}
                      className="flex flex-col flex-1 gap-4"
                    >
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="in-email"
                          className="text-sm font-medium"
                        >
                          Email
                        </label>
                        <Input
                          required
                          className="rounded-sm focus-visible:border-atlas-indigo focus-visible:ring-1 focus-visible:ring-offset-0 bg-white border-[#d0d0d0]"
                          id="in-email"
                          type="email"
                          value={inEmail}
                          onChange={(e) => setInEmail(e.target.value.trim())}
                          placeholder="Enter your email"
                        />
                        {errors.inEmail && (
                          <p className="text-red-700 text-sm">
                            {errors.inEmail}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="in-pswd"
                          className="text-sm font-medium"
                        >
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
                          <p className="text-red-700 text-sm">
                            {errors.inPswrd}
                          </p>
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
                        className="rounded-sm bg-atlas-indigo self-center w-full my-5 hover:bg-[#3730a3] cursor-pointer"
                      >
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
              </TabsContent>

              <TabsContent value="sign-up" className="flex flex-col flex-1">
                {errors.backend && (
                  <p className="text-red-700 text-sm">{errors.backend}</p>
                )}

                <form
                  noValidate
                  onSubmit={handleSignUp}
                  className="flex flex-col flex-1 gap-4"
                >
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
                      onChange={(e) => setUsername(e.target.value.trim())}
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
                      onChange={(e) => setUpEmail(e.target.value.trim())}
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
                    <label
                      htmlFor="confirm-pswd"
                      className="text-sm font-medium"
                    >
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
                    className="rounded-sm bg-atlas-indigo self-center w-full my-4 hover:bg-[#3730a3] cursor-pointer"
                  >
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Home;
