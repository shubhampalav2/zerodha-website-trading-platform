import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RegexStore from "../../utils/RegexStore";
import { signUp } from "../../services/AuthService";
import toast from 'react-hot-toast';
const SignupForm = ({ setAuthMode, mainRef }) => {

    //creating a singup schema
    const signupSchema = yup.object({
        fullName: yup.string().required("This field is mandatory").matches(RegexStore.fullNameRegex, "Please enter valid full name as (Ajay Raj)"),
        email: yup.string().required("This field is mandatory").matches(RegexStore.emailRegex, "Enter a valid email address (e.g. name@example.com)."),
        password: yup.string().required("This field is mandatory").matches(RegexStore.passwordRegex, "Enter a strong password with at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character."),
        conformPassword: yup.string().required("This field is mandatory").oneOf([yup.ref("password")], "Password and Confirm Password must match"),
        mobileNumber: yup.string().required("This field is mandatory").matches(RegexStore.mobileRegex, "Please enter valid mobile number")
    });

    const [loading, setLoading] = useState(false);

    const { register, reset, handleSubmit, formState: {
        errors
    } } = useForm({
        defaultValues: {
            fullName: "",
            mobileNumber: "",
            password: "",
            conformPassword: "",
            email: ""
        },
        mode: "onChange",
        resolver: yupResolver(signupSchema)
    })

    async function submit(data) {
        setLoading(true);
        try {
            const res = await signUp(data);
            toast.success(res?.message ?? "User successfully logged");
            reset();
            const searchParams = new URLSearchParams();
            searchParams.append('authToken', res.authToken);
            const redirectUrl = `http://localhost:3001?${searchParams.toString()}`;
            //redirecting the user to the dashboard website
            window.open(redirectUrl, '_self');
        }
        catch (error) {
            console.dir(error);
            toast.error(error?.response?.data?.message ?? "Something Went Wrong");
        }
        finally {
            setLoading(false);
        }
    }

    return <div className="auth-container">
        <div className="auth-card">
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">
                Start your investment journey with Zerodha
            </p>

            <form onSubmit={handleSubmit(submit)}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your full name"
                        id="name"
                        autoComplete="off"
                        {...register("fullName")}
                    />
                    <span className="err-msg">{errors?.fullName?.message}</span>
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        id="email"
                        autoComplete="off"
                        {...register("email")}
                    />
                    <span className="err-msg">{errors?.email?.message}</span>
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="number">Mobile Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter your mobile number"
                        id="number"
                        autoComplete="off"
                        {...register("mobileNumber")}
                        maxLength={10}
                    />
                    <span className="err-msg">{errors?.mobileNumber?.message}</span>
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Create a password"
                        id="password"
                        autoComplete="off"
                        {...register("password")}
                    />
                    <span className="err-msg">{errors?.password?.message}</span>
                </div>

                <div className="mb-4">
                    <label className="form-label" htmlFor="conformPassword">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm your password"
                        id="conformPassword"
                        autoComplete="off"
                        {...register("conformPassword")}
                    />
                    <span className="err-msg">{errors?.conformPassword?.message}</span>
                </div>

                <button type="submit" className="btn auth-btn" disabled={loading}>
                    Create Account
                </button>
            </form>

            <div className="text-center mt-4">
                <p className="mb-2 text-muted">
                    Already have an account?
                </p>

                <button
                    type="button"
                    className="btn btn-link text-decoration-none p-0"
                    onClick={() => {
                        setAuthMode("login");
                        mainRef?.current?.scrollIntoView({
                            behaviour: "smooth"
                        })
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    </div>
}
export default SignupForm;