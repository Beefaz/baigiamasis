import "../styles/auth.scss";
import {useState} from "react";
import Form from "../components/form/Form.jsx";
import _axios from "../helpers/_axios.js";
import useAuth from "../hooks/useAuth.jsx";


const registrationForm = {
  id: 'register',
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
    },
    {
      element: 'input',
      type: 'text',
      id: 'name',
      label: 'Vardas',
    },
    {
      element: 'input',
      type: 'text',
      id: 'surname',
      label: 'Pavardė',
    },
    {
      element: 'input',
      type: 'text',
      label: 'Partijos pavadinimas',
      id: 'politicalParty',
    }
  ],
  button: {
    text: 'Registruoti',
  },
  errors: {},
  error: '',
  message: '',
};

const Login = () => {
  const [form, setForm] = useState({...registrationForm});
  const {login} = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    _axios.post('/register', Object.fromEntries(formData.entries()))
      .then(resp => {
        const {message, token} = resp.data;
        if (message) return setForm({...registrationForm, message: message});
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
      <Form props={form} onSubmit={handleSubmit}/>
    </div>
  </div>
}

export default Login;
