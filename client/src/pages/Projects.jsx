import {useEffect, useState} from 'react';
import _axios from "../helpers/_axios.js";
import '../styles/projects.scss'
import {useNavigate} from "react-router-dom";
import viewSvg from '../assets/images/svg/view.svg'
import editSvg from '../assets/images/svg/edit.svg'
import trashSvg from '../assets/images/svg/trash.svg'
import useAuth from "../hooks/useAuth.jsx";
import {translations} from "../translations/lt.js";

const Projects = () => {
  const [projects, setProjectsData] = useState([]);
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const {getUser} = useAuth();
  const user = getUser();

  useEffect(() => {
    _axios.get('/projects')
      .then(resp => {
        setProjectsData(resp.data);
      });
  }, []);

  const viewProject = (projectId) => {
    navigate(`/projects/${projectId}`, {state: {user: user, projectId: projectId}})
  }

  const editProject = (projectId) => {
    navigate(`/projects/${projectId}/edit`, {state: {projectId: projectId}})
  }

  const deleteProject = (projectId) => {
    _axios.delete(`/projects/${projectId}`)
      .then(resp => {
        if (resp.status === 200) setProjectsData(projects.filter(project => project._id !== projectId));
        setMessage(resp.data.message);
      });
  }

  const renderProjects = (projects) => projects.map(((project, index) => {
    const {_id: projectId, title, description, status, photo, debateDate, author, createdAt} = project || {};
    const {_id: authorId, name, surname} = author || {};

    return <tr key={projectId}>
      <td className="index">{index + 1}</td>
      <td className="author">{author && `${name} ${surname}`}</td>
      <td className="title">{title} </td>
      <td className="photo"><div>
        <img src={`http://localhost:3000/uploads/${photo}`} alt="project_photo"/>
      </div>
      </td>
      <td className="description"><div>{description}</div></td>
      <td className="created_at">
        {new Date(createdAt).toLocaleDateString('lt-LT')}
        <br/>
        {new Date(createdAt).toLocaleTimeString('lt-LT')}
      </td>
      <td className="debate_date">{new Date(debateDate).toLocaleDateString('lt-LT')}</td>
      <td className="status"><div className={`pill-${status}`}>{translations.status[status]}</div></td>
      <td className="actions">
        <div className="actions__content">
          <button onClick={() => viewProject(projectId)}><img src={viewSvg} alt="view"/></button>
          {user.id === authorId && <>
            <button onClick={() => editProject(projectId)}><img src={editSvg} alt="edit"/></button>
            <button onClick={() => deleteProject(projectId)}><img src={trashSvg} alt="delete"/></button>
          </>}
        </div>
      </td>
    </tr>
  }));


  return (
    <>
      {message}
      <div className="projects">
        {projects.length !== 0 &&
          <div className="table-wrapper">
            <table>
              <thead>
              <tr>
                <th>Eilės nr.</th>
                <th>Autorius</th>
                <th>Pavadinimas</th>
                <th>Nuotrauka</th>
                <th>Aprašymas</th>
                <th>Pateikimo data</th>
                <th>Svarstymo data</th>
                <th>Statusas</th>
                <th>Veiksmai</th>
              </tr>
              </thead>
              <tbody>{renderProjects(projects)}</tbody>
            </table>
          </div>}
      </div>
    </>
  );
}

export default Projects;
