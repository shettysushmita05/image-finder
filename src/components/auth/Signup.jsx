import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./client";

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function saveUser(user) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            full_name: user.full_name,
          },
        },
      });
      if (error) throw error;
      alert("Check your email for verification link");
      reset({
        full_name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      alert(error);
      console.log("register", error);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[400px] space-y-6 flex flex-col justify-center shadow-lg p-5 bg-white">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500 ">
            Enter your information to create an account
          </p>
        </div>
        <div>
          <form
            className="space-y-4 "
            noValidate
            onSubmit={handleSubmit((data, e) => {
              e.preventDefault();
              saveUser(data);
            })}
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="full_name">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                id="full_name"
                {...register("full_name", {
                  required: "Full Name is required",
                })}
              />
              {errors.full_name && (
                <p className="text-red-500">{errors.full_name.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "email not valid",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                {...register("password", {
                  required: "password is required",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "confirm password is required",
                  validate: (value, formValues) =>
                    value === formValues.password || "password not matching",
                })}
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-2 bg-[#4BC34B] hover:bg-[#66c266] text-white py-2 rounded-md"
            >
              Sign Up
            </button>
          </form>
          <div className="my-5 text-center">
            <p className="text-gray-500">
              Already a user?{" "}
              <Link
                to="/login"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
