import React, { useEffect, useState } from 'react';
import formHandler from "../../utils/FormHandler";
import { validateTaskPasswordSettings } from "../../utils/validation";
import axios from "axios";
// import { getUserId } from "../../utils/Authentication";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUserDetail, toggleLoader } from "../../redux/actions";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import SettingImage from "../../assets/settings.svg";

function PasswordSetting(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({});
    const [submit, setSubmit] = useState(0);
    const [error, setError] = useState(null);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        const finalInput = inputs
        event.preventDefault();
        if (validateTaskPasswordSettings(finalInput)) {
            passwordChange(finalInput)
            setInputs({})
        } else {
            setError("not match")
            setInputs({})
        }
    }

    function passwordChange(inputs) {
        dispatch(toggleLoader(true));
        //const token = '079b662f7b61bbba9a013d040c0e7a8245fb3512320ea5c6b7f578e22f90c80c'
        const token = Cookies.get('tokenCookie');
        const config = {
            headers: {
                'Authorization': `Token ${token}`
            }
        };
        axios.put('http://127.0.0.1:8000/user/', inputs, config)
            .then((res) => {
                console.log(res)
                if (res.status == 200) {
                    toast.success("New Password Updated")
                }

            }).catch((err) => {
                if (err.response.status == 400) {
                    toast.error("Incorrect Old Password")
                } else if (err.response.status == 401) {
                    toast.error("Unauthorized")
                    //logout
                    navigate("/login")

                } else {
                    toast.error("Incorrect")
                }
            }).finally(() => {
                dispatch(toggleLoader(false));
            })
    }

    useEffect(() => {
        setTimeout(() => {
            setError(null)
        }, 1500);
    }, [error])

    return (
        <div className="row">
            <div className={'col-md-6 pt-3'}>
                <div className="d-flex align-items-center justify-content-center">
                    <img
                        className={
                            "login-image img-responsive d-block align-items-center"
                        }
                        src={SettingImage}
                        alt=""
                    />
                </div>
            </div>
            <div className={'col-md-6'}>
                <div className={"form-container pt-3 mt-5"}>
                    <form className={"row p-3"} onSubmit={handleSubmit}>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <h6><label htmlFor="password" className="settings-form-text">Old Password</label></h6>
                                <input
                                    type="password"
                                    name="oldpassword"
                                    id="password"
                                    placeholder="Enter Old Password"
                                    className={`form-control`}
                                    value={inputs.oldpassword || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <h6><label htmlFor="newPassword" className="settings-form-text">New Password</label></h6>
                                <input
                                    type="password"
                                    name="password"
                                    id="newPassword"
                                    placeholder="Enter New Password"
                                    className={`form-control`}
                                    value={inputs.password || ''}
                                    onChange={handleChange}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <h6><label htmlFor="confirmPassword" className="settings-form-text">Confirm Password</label></h6>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm New Password"
                                    className={`form-control`}
                                    value={inputs.confirmPassword || ''}
                                    onChange={handleChange}
                                    required={true}
                                />
                                {<p className="text-red">{error}</p>}
                            </div>
                        </div>
                        <div className={"d-flex justify-content-end"}>
                            <button type="submit" className={"btn btn-secondary tasks-dropdown-btn"}>
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PasswordSetting;