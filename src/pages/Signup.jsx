import { useForm } from "react-hook-form";
import { loginWithGoogle, logout, signup } from "../firebase/authService";
import { useContext, useEffect } from "react";
import { ToastContexts } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/auth";
import { LogIn } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { AlreadyAddedNotify, AddedNotify } = useContext(ToastContexts);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/", { replace: true }); // already logged in → go home
      }
    });

    return () => unsubscribe(); // cleanup when component unmounts
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const res = await signup(data.email, data.password);

      await res.user.reload();

      if (!res.user.emailVerified) {
        await logout();
        AlreadyAddedNotify(
          "Check your inbox and spam folder to verify your email.",
        );
        return;
      }

      navigate("/");
    } catch (err) {
      AddedNotify(err.message || "Something went wrong", "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      AddedNotify("Login Successful");
    } catch (error) {
      AlreadyAddedNotify(error.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2">
          Join our store and start shopping
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin} // your Google login function
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
        >
          <LogIn className="w-5 h-5" /> {/* Lucide icon */}
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
