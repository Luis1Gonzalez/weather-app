import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../header/index.jsx";
import Here from "../here/index.jsx";

export default function Container() {
  return (
    <div className="wrap_container row">
      <div className="col p-0">
      <Header />
      <Here />
      </div>
    </div>
  );
}
