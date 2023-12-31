import Layout from '../../layout/layout'
import React from 'react'
import SignUpImage from "../../assets/signup.svg"
import Logo from "../../assets/logo.png"
import { validateSignUp } from "../../utils/validation"
import formHandler from "../../utils/FormHandler"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const SignUp = () => {

    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(isLogin, validateSignUp);

    function isLogin() {

    }

    return (
        <div className={"vh-100 d-flex align-items-center justify-content-center login"}>
            <div className="row m-0">
                <div className={"col-md-6 d-flex align-items-center justify-content-center"}>
                    <div className={"container-widget"}>
                        <div className="login-form-inner">
                            <form action="#">
                                <div className="d-flex align-items-center">
                                    <img className={"login-logo d-block mx-auto img-fluid"} src={Logo} alt="" />
                                </div>
                                <h1 className="brand-text text-center">Time Master</h1>
                                <div className="login-field">
                                    <input className={`form-control ${errors.username ? "border-red" : ""}`} type="text"
                                        name={"username"} onChange={handleChange} placeholder="Username" />
                                </div>
                                {errors.username && <p className={"text-red"}>{errors.username}</p>}
                                <div className="login-field">
                                    <input className={`form-control ${errors.userEmail ? "border-red" : ""}`} type="mail"
                                        name={"userEmail"} onChange={handleChange} placeholder="User Email" />
                                </div>
                                {errors.userEmail && <p className={"text-red"}>{errors.userEmail}</p>}
                                <div className="login-field">
                                    <input className={`form-control ${errors.password ? "border-red" : ""}`} type="password"
                                        name={"password"} onChange={handleChange} placeholder="Password" />
                                </div>
                                {errors.password && <p className={"text-red"}>{errors.password}</p>}
                                {/* <div className="py-3 text-start">
                                    <a href="" className="login-forgot">Forgot Password?</a>
                                </div> */}
                                <div className="login-btn d-grid pt-3">
                                    <button
                                        type="button"
                                        className={"btn btn-secondary tasks-dropdown-btn flex-end"}
                                        onClick={handleSubmit}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                <div className="py-3 text-center">
                                    <a href="" className="login-forgot text-decoration-underline">Already have an account</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={"col-md-6 mx-auto"}>
                    <div className="d-flex align-items-center justify-content-center">
                        <img className={"login-image img-responsive d-block align-items-center"} src={SignUpImage} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
