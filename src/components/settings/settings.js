import Layout from '../../layout/layout'
import React, { useEffect, useState } from 'react';
import { getUserId } from "../../utils/Authentication";
import formHandler from "../../utils/FormHandler";
import { validateTaskSetting } from "../../utils/validation";
import { setUserDetail, toggleLoader } from "../../redux/actions";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import PasswordSetting from "../password-setting/password-setting";
// import { getUserId } from "../../utils/Authentication";

export const Settings = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = formHandler(taskSetting, validateTaskSetting);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({})

    function taskSetting() {
        setFormSubmitted(true)
    }

    useEffect(() => {
        dispatch(toggleLoader(true))
        axios.get('http://127.0.0.1:8000/task/user')
            .then((res) => {
                // setUserData(res.data.filter((item) => item._id === getUserId())[0])
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                dispatch(toggleLoader(false))
            })
    }, [])

    useEffect(() => {
        initForm(userData);
    }, [userData]);


    useEffect(() => {
        if (!formSubmitted) {
            return
        }
        dispatch(toggleLoader(true))
        axios.put('http://127.0.0.1:8000/task/user', values)
            .then((res) => {
                localStorage.setItem("NAME", res.data.name)
                dispatch(setUserDetail(res.data))
                toast.success("Profile Updated Successfully")
            }).catch((err) => {
                toast.error("Something went wrong")
                console.log(err)
            }).finally(() => {
                dispatch(toggleLoader(false))
                setFormSubmitted(false)
            })

    }, [formSubmitted])

    return (
        <Layout>
            <div className={"container"}>
                <div className={"container-widget"}>
                    <h1 className={"p-3 heading"}>Settings</h1>
                    <div className={"form-container"}>
                        <form onSubmit={handleSubmit} className={"row task-settings-form"}>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Name</label></h6>
                                    <input name={"name"} placeholder={"Enter Last Name"}
                                        className={`form-control ${errors.name ? "border-red" : ""}`}
                                        id="exampleInputEmail1"
                                        onChange={handleChange}
                                        value={values.name || ""}
                                    />
                                    {errors.name && <p className={"text-red"}>{errors.name}</p>}

                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Contact
                                        No</label></h6>
                                    <input name={"phoneNumber"} placeholder={"Enter  Contact No"}
                                        className={`form-control ${errors.phoneNumber ? "border-red" : ""}`}
                                        id="exampleInputEmail1"
                                        onChange={handleChange}
                                        value={values.phoneNumber || ""}
                                    />
                                    {errors.phoneNumber && <p className={"text-red"}>{errors.phoneNumber}</p>}

                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Address
                                    </label></h6>
                                    <input name={"address"} placeholder={"Enter Address"}
                                        className={`form-control ${errors.address ? "border-red" : ""}`}
                                        id="exampleInputEmail1"
                                        onChange={handleChange}
                                        value={values.address || ""}
                                    />
                                    {errors.address && <p className={"text-red"}>{errors.address}</p>}

                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className={"mb-3"}>
                                    <h6><label htmlFor="exampleInputEmail1" className="settings-form-text">Email
                                    </label></h6>
                                    <input name={"email"} placeholder={"Enter Email"}
                                        className={`form-control ${errors.email ? "border-red" : ""}`}
                                        id="exampleInputEmail1"
                                        onChange={handleChange}
                                        value={values.email || ""}
                                    />
                                    {errors.email && <p className={"text-red"}>{errors.email}</p>}

                                </div>
                            </div>
                            {<div className="d-flex justify-content-end">
                                <button
                                    type="button"
                                    className={"btn btn-secondary tasks-dropdown-btn"}
                                    onClick={handleSubmit}
                                >
                                    Update
                                </button>
                            </div>}

                        </form>
                    </div>
                    <PasswordSetting />
                </div>
            </div>
        </Layout>
    )
}
