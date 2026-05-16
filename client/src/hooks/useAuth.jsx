import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "@/utils/helper.js";

import api from "../api/api";

export default function useAuth({
  inEmail,
  upEmail,
  inPswrd,
  upPswrd,
  conPswrd,
  username,
  setErrors,
} = {}) {
  /** State Variables **/
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const ctx = useContext(AuthContext);
  const { login, logout, user } = ctx;

  const navigate = useNavigate();

  /** Handle Functions **/
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (loading) return; // guard

    const newErrors = {};

    //Sanitize
    const cleanInEmail = inEmail.trim().toLowerCase();

    //Email validation
    const emailErr = validateEmail(cleanInEmail);
    if (emailErr) newErrors.inEmail = emailErr;

    //Validate user input
    if (!cleanInEmail) newErrors.inEmail = "Email is required";
    if (!inPswrd) newErrors.inPswrd = "Password is required";

    console.log("newErrors", newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Success");

      try {
        setLoading(true);

        //Call to backend to authenticate
        const res = await api.post("/api/auth/login", {
          email: inEmail,
          password: inPswrd,
        });

        if (res.data.user) {
          //Add to local storage:
          const user = {
            username: res.data.user.username,
            userId: res.data.user.userId,
          };

          login(user);
          navigate("/map", {
            state: { username: res.data.user.username },
          });
        }

        console.log(res); //working
      } catch (error) {
        console.log(error?.response?.data.error);
        newErrors.backend =
          error?.response?.data.error ||
          error.message ||
          "Something went wrong";
      } finally {
        setLoading(false);
      }
    }
    setErrors(newErrors);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (loading) return; // guard

    const newErrors = {};

    //Sanitize
    const cleanUpEmail = upEmail.trim().toLowerCase();
    const cleanUpUsername = username.trim().toLowerCase();

    //Email validation
    const emailErr = validateEmail(cleanUpEmail);
    if (emailErr) newErrors.upEmail = emailErr;

    //Validate user input

    if (!cleanUpEmail) newErrors.upEmail = "Email is required";
    if (!upPswrd) newErrors.upPswrd = "Password is required";
    if (!conPswrd) newErrors.conPswrd = "Please confirm your password";
    if (!cleanUpUsername) newErrors.username = "Username is required";

    //Passwords match validation
    if (upPswrd !== conPswrd) {
      newErrors.upPswrd = "Passwords do not match";
      newErrors.conPswrd = "Passwords do not match";
    }

    //Username validation
    if (cleanUpUsername.length < 3 || cleanUpUsername.length > 20) {
      newErrors.username = "Username must be 3–20 characters long.";
    }

    if (Object.keys(newErrors).length === 0) {
      //API Call
      console.log("Success");

      try {
        const res = await api.post("/api/auth/register", {
          username: cleanUpUsername,
          email: cleanUpEmail,
          password: conPswrd,
        });

        if (res.data.user) {
          const user = {
            username: res.data.user.username,
            userId: res.data.user.userId,
          };

          //Add to local storage:
          login(user);

          //Navigate Onboarding
          navigate("/onboarding", {
            state: { username: res.data.user.username },
          });
        }

        console.log(res); //working
      } catch (error) {
        newErrors.backend =
          error?.response?.data.error ||
          error.message ||
          "Something went wrong";
      } finally {
        setLoading(false);
      }
    }
    setErrors(newErrors);
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(false); //Reset
      const res = await api.post("/api/auth/logout");
      logout();
    } catch (error) {
      backendError =
        error?.response?.data.error || error.message || "Something went wrong";
      setError(backendError);
    } finally {
      setLoading(false);
    }
  };

  return { handleSignUp, handleSignIn, handleSignOut, loading, user };
}
