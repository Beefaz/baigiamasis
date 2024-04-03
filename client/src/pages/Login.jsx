import "../styles/auth.scss";
import logo from '../assets/images/png/lrs-logo.png'
import {useState} from "react";
import Form from "../components/form/Form.jsx";
import _axios from "../helpers/_axios.js";
import useAuth from "../hooks/useAuth.jsx";

const loginForm = {
  id: 'login',
  url: '/login',
  formFields: [
    {
      element: 'input',
      type: 'email',
      id: 'email',
      label: 'El. paštas',
    },
    {
      element: 'input',
      type: 'password',
      id: 'password',
      label: 'Slaptažodis',
    }
  ],
  button: {
    text: 'Prisijungti'
  },
  errors: {},
  error: '',
  message: '',
};

const Login = () => {
  const [form, setForm] = useState(loginForm);
  const {login} = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    _axios.post('/login', Object.fromEntries(formData.entries()))
      .then(resp => {
        const {message, token} = resp.data;
        if (message) return setForm({...loginForm, message: message});
        if (token) {
          login(token);
        }
      })
      .catch((e) => {
        const {error, errors} = e.response.data;
        if (errors) setForm({...form, errors: {...errors}});
        if (error) setForm({...form, error: error});
      });
  };

  return <div className="form-wrapper">
    <div className="form-container">
      <img className="logo" src={logo} alt="seimas-logo"/>
      <Form props={form} onSubmit={(e) => handleSubmit(e)}/>
    </div>
  </div>
}

export default Login;
