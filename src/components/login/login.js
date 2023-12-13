import Layout from '../../layout/layout'
import React from 'react'
import LoginImage from "../../assets/login.svg"
import Logo from "../../assets/logo.png"
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
        <div className={"container vh-100"}>
            <div className="row py-5 px-3">
                <div className={"col-md-6 mx-auto"}>
                    <div className="mt-5 text-center">
                        <img className={" img-fluid img-responsive mx-auto d-block"} src={LoginImage} alt="" />
                    </div>
                </div>
                <div className={"col-md-6 mx-auto d-flex align-items-center justify-content-center"}>
                    <div className={"container-widget"}>
                        <div className="login-form-inner">
                            <form action="#">
                                <div className="login-image d-flex align-items-center">
                                    <img className={"login-logo img-fluid img-responsive"} src={Logo} alt="" />
                                </div>
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
                                <div className="login-forgot py-3 text-start">
                                    <a href="">Forgot Password?</a>
                                </div>
                                <div className="login-btn d-grid">
                                    <button
                                        type="button"
                                        className={"btn btn-secondary tasks-dropdown-btn flex-end"}
                                        onClick={handleSubmit}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
