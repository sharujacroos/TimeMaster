import {Navigate, Outlet} from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";

export default function AnonymousRoute () {
    const token = Cookies.get('token', { path: '/login' });

    axios.post("http://127.0.0.1:8000/check/", "", {
        headers: {
            'authorization': `Token ${token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.status !== 200) {
                Cookies.remove('token', { path: '/login' });
            }
        })
        .catch((error) => {
            Cookies.remove('token', { path: '/login' });
        });

    return token ? <Navigate to="/home" replace /> : <Outlet />;
}