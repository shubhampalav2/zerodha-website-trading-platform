import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RegexStore from "../../utils/RegexStore";
const LoginForm = ({ setAuthMode, mainRef }) => {

    //creating a yup schema
    const loginSchema = yup.object({
        email: yup.string().required("Email is required").matches(RegexStore.emailRegex, "Enter a valid email address (e.g. name@example.com)."),
        password: yup.string().required("Password is required").matches(RegexStore.passwordRegex, "Enter a strong password with at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.")
    })
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        mode: "onChange", defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(loginSchema)
    });


    function submit(data) {
        console.log("Data is ", data);
    }

    return <div className="auth-container">
        <div className="auth-card">
            <h2 className="auth-title">Login</h2>
            <p className="auth-subtitle">
                Access your Zerodha trading account
            </p>

            <form onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                    <label htmlFor="emailField">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        autoComplete="off"
                        id="emailField"
                        {...register("email")}
                    />
                    <span className="err-msg">{errors?.email?.message}</span>
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        id="password"
                        {...register("password")}
                    />
                    <span className="err-msg">{errors?.password?.message}</span>
                </div>

                <button className="btn auth-btn mt-4">
                    Login
                </button>
            </form>

            <div className="text-center mt-4">
                <p className="mb-2">
                    New to Zerodha?
                </p>

                <button
                    className="btn btn-link text-decoration-none"
                    onClick={() => {
                        setAuthMode("signup");
                        mainRef?.current?.scrollIntoView({ behaviour: "smooth" })
                    }}
                >
                    Create Account
                </button>
            </div>
        </div>
    </div>
}
export default LoginForm;