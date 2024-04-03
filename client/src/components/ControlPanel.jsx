import {Link, useNavigate} from "react-router-dom";
import Admin from "./wrappers/Admin.jsx";
import "../styles/control_panel.scss";

const ControlPanel = () => {
  const navigate = useNavigate();
  return (
    <div className="control-panel">
      <div className="control-panel__side-left">
        <button onClick={() => navigate(-1)}>Grįžti</button>
      </div>
      <div className="control-panel__side-right">
        <Link to={'/projects/new'}>Sukurti naują projektą</Link>
        <Admin>
          <Link to={'/register'}>Registruoti naudotoją</Link>
        </Admin>
      </div>
    </div>
  )
};
export default ControlPanel;
