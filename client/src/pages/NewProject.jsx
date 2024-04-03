import "../styles/auth.scss";
import {useState} from "react";
import _axios from "../helpers/_axios.js";
import Form from "../components/form/Form.jsx";


const defaultForm = {
  id: 'newProject',
  formFields: [
    {
      type: 'text',
      id: 'title',
      label: 'Projekto pavadinimas',
    },
    {
      type: 'file',
      id: 'photo',
      label: 'Projekto nuotrauka',
      accept: "image/png, image/jpeg",
    },
    {
      element: 'textarea',
      id: 'description',
      label: 'Projekto aprašymas',
    },
    {
      type: 'date',
      id: 'debateDate',
      label: 'Svarstymo data',
      defaultValue: new Date().toISOString().split('T')[0],
      min: new Date().toISOString().split('T')[0],
    }
  ],
  button: {
    text: 'Pateikti projektą'
  },
  errors: {},
  error: '',
  message: '',
};

const UpdateProject = () => {
  const [form, setForm] = useState(defaultForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    _axios.post('/projects/new', formData)
      .then(resp => {
        setForm({...defaultForm, message: resp.data.message});
      })
      .catch((e) => {
        const {error, errors} = e.response.data;
        if (errors) setForm({...defaultForm, errors: {...errors}});
        if (error) setForm({...defaultForm, error: error});
      })
  };

  return <div className="form-wrapper">
    <div className="form-container">
      <Form props={form} onSubmit={handleSubmit}/>
    </div>
  </div>
}

export default UpdateProject;
