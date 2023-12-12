import Layout from '../../layout/layout'
import React from 'react'
import LoginImage from "../../assets/login.svg"
import { validateLogin } from "../../utils/validation"
import formHandler from "../../utils/FormHandler"

export const Login = () => {

    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(isLogin, validateLogin);

    function isLogin() {

    }

    return (
        <div>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <div className="row">
                        <div className={"col-md-6 mx-auto"}>
                            <div className="login-image mt-5">
                                <img className={" img-fluid img-responsive"} src={LoginImage} alt="" />
                            </div>
                        </div>
                        <div className={"col-md-6 mx-auto py-5 px-3"}>
                            <div className={"container-widget"}>
                                <div className="login-form-inner p-2">
                                    <form action="#" className="full-container form-login">
                                        <h1 className="brand-text text-center">Time Master</h1>
                                        <div className="login-field">
                                            <input className={`form-control ${errors.username ? "border-red" : ""}`} type="text"
                                                name={"username"} onChange={handleChange} placeholder="Username" />
                                        </div>
                                        {errors.username && <p className={"text-red"}>{errors.username}</p>}
                                        <div className="login-field">
                                            <input className={`form-control ${errors.password ? "border-red" : ""}`} type="password"
                                                name={"password"} onChange={handleChange} placeholder="Password" />
                                        </div>
                                        {errors.password && <p className={"text-red"}>{errors.password}</p>}
                                        <br />
                                        <div className="login-forgot py-3 gap-3">
                                            <a href="">Forgot Password?</a>
                                        </div>
                                        <button
                                            type="button"
                                            className={"btn btn-secondary tasks-dropdown-btn"}
                                            onClick={handleSubmit}
                                        >
                                            Login
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
