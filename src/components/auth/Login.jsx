import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./client";
import { useContext } from "react";
import { GlobalContext } from "../../context/context";

export default function Login() {
  const { setToken } = useContext(GlobalContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function checkUser(user) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });
      if (error) throw error;
      console.log(data);
      setToken(data);
      reset({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (e) {
      alert("login", e);
    }
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[400px] space-y-6 flex flex-col justify-center bg-white shadow-lg p-5">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 ">
            Enter your information to login to your account
          </p>
        </div>
        <div>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit((data, e) => {
              e.preventDefault();
              checkUser(data);
              //   console.log(data);
            })}
          >
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <input
                placeholder="m@example.com"
                type="email"
                id="email"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "email not valid",
                  },
                })}
                required
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              {/* <div className="flex justify-between">
                <label htmlFor="password">Password</label>
                <Link
                  to="/forgotPassword"
                  className="text-sm text-blue-500 underline hover:text-blue-700"
                >
                  Forgot Password?
                </Link>
              </div> */}
              <input
                id="password"
                required
                type="password"
                placeholder="Password"
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
              {/* {error && <p className="text-red-500">{error}</p>} */}
            </div>
            <button
              className="w-full mt-2 bg-[#4BC34B] hover:bg-[#66c266] text-white py-2 rounded-md"
              type="submit"
            >
              Login
            </button>
          </form>
          <div />
          <div className="my-5 text-center">
            <p className="text-gray-500">
              New User?{" "}
              <Link
                className="text-blue-500 underline hover:text-blue-700"
                to="/signup"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
