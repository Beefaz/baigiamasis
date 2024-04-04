import "../styles/project.scss";
import {useEffect, useState} from "react";
import _axios from "../helpers/_axios.js";
import {useLocation} from "react-router-dom";
import {translations} from "../translations/lt.js";

const ViewProject = () => {
  const {state} = useLocation();
  const {projectId, user} = state;
  const [data, setData] = useState({});

  useEffect(() => {
    _axios.get(`/projects/${projectId}`)
      .then(resp => {
        setData({...resp.data});
      });
  }, [projectId]);

  const handleSelect = (e) => {
    const formData = new FormData();
    const status = e.target.value;
    formData.append('status', status);

    _axios.put(`/projects/${projectId}`, formData)
      .then(resp => {
        if(resp.status === 200) {
          setData({...data, status})
        }
      })
  };

  return <div className="project">
    <div className="project__top">
      <div className="col">
        <strong>Pavadinimas</strong>
        <div>{data.title}</div>
      </div>
      <div className="col">
        <strong>Pateikė</strong>
        <div>
          {data?.author?.name} {data?.author?.surname}
        </div>
      </div>
      <div className="col">
        <strong>Svarstymo data</strong>
        <div>{new Date(data.debateDate).toLocaleDateString('lt-LT')}</div>
      </div>
      <div className="col">
        <strong>Būsena</strong>
        {user?.role === 'admin'
          ?
          <select name="status" value={data.status} onInput={handleSelect} className="status">
            <option value="pending">{translations.status.pending}</option>
            <option value="rejected">{translations.status.rejected}</option>
            <option value="accepted">{translations.status.accepted}</option>
            <option value="noData">{translations.status.noData}ų</option>
          </select>
          :
          <div className={`pill-${data.status}`}>{translations.status[data.status]}</div>
        }
      </div>
    </div>
    <div className="project__bottom">
      <div className="image-col">
        <strong>Nuotrauka</strong>
        <img className="project-image" src={`${import.meta.env.VITE_FILE_URL}/${data.photo}`} alt="img"/>
      </div>
      <strong>Aprašymas</strong>
      <div className="project-description">{data.description}</div>
    </div>
  </div>
}

export default ViewProject;
