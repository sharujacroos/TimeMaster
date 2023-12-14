import logo from './logo.svg';
import './App.css';
import Layout from './layout/layout';
import { Route, Routes } from 'react-router-dom';
import { Home } from "./components/home/home";
import { Tasks } from './components/tasks/tasks';
import { Calender } from './components/calender/calender';
import { Analysis } from './components/analysis/analysis';
import { Settings } from './components/settings/settings';
import { Login } from './components/login/login';
import { SignUp } from './components/login/signup';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/calendar" element={<Calender />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
