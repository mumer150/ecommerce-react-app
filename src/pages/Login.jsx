import { useForm } from "react-hook-form";
import { login, loginWithGoogle, logout } from "../firebase/authService";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ToastContexts } from "../context/ToastContext";
import { auth } from "../firebase/auth";
import { LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const { AlreadyAddedNotify, AddedNotify } = useContext(ToastContexts);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/", { replace: true }); // redirect if already logged in
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const res = await login(data.email, data.password);

      await res.user.reload();

      if (!res.user.emailVerified) {
        await logout();
        AlreadyAddedNotify("Please verify your email first");
        return;
      }

      AddedNotify("Login Successful");
      navigate("/");
    } catch (err) {
      AlreadyAddedNotify(err.message || "Login Failed");
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
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2">
          Login to continue shopping
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
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <span
              onClick={() => {
                navigate("/forgotpassword");
              }}
              className="text-sm text-gray-500 hover:underline cursor-pointer"
            >
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
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
          Don’t have an account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
            }}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
