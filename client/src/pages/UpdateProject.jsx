import "../styles/auth.scss";
import {useEffect, useState} from "react";
import _axios from "../helpers/_axios.js";
import {useLocation} from "react-router-dom";
import Form from "../components/form/Form.jsx";


const defaultForm = {
  id: 'updateProject',
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
    text: 'Atnaujinti projektą'
  },
  errors: {},
  error: '',
  message: '',
};


const UpdateProject = () => {
  const [form, setForm] = useState(defaultForm);
  const location = useLocation();
  const projectId = location.state.projectId;

  useEffect(() => {
    if (projectId) {
      _axios.get(`/projects/${projectId}`)
        .then(resp => {
          const newFormRows = remapResponseData(resp.data, form);
          setForm({...form, formFields: newFormRows});
        })
        .catch(e => {
          const {error, errors} = e.response.data;
          if (errors) setForm({...form, errors: {...errors}});
          if (error) setForm({...form, error: error});
        })
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    _axios.put(`/projects/${projectId}`, formData)
      .then(resp => {
        setForm({...form, message: resp.data.message});
      })
      .catch((e) => {
        const {error, errors} = e.response.data;
        if (errors) setForm({...form, errors: {...errors}});
        if (error) setForm({...form, error: error});
      })
  };

  const remapResponseData = (data, form) => form.formFields.map(item => {
    if (item.type === 'date') return {...item, defaultValue: new Date(data[item.id]).toLocaleDateString('lt-LT')};
    if (item.type === 'file') return {...item, fileName: data[item.id]};
    return {...item, defaultValue: data[item.id]}
  });

  return <div className="form-wrapper">
    <div className="form-container">
      <Form props={form} onSubmit={handleSubmit}/>
    </div>
  </div>
}

export default UpdateProject;
