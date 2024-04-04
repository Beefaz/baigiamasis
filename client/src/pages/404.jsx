import '../styles/page404.scss';
import {Link} from "react-router-dom";

const Page404 = () => {
  return (
    <div className="page-404">
      <Link to="/">Grįžti į pagrindinį</Link>
      <div className="message">
        <strong>OOPS! TOKS PUSLAPIS NEEGZISTUOJA</strong>
      </div>
    </div>
  )
}

export default Page404;
