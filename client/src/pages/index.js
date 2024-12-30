import Shapka from "../assets/Shapka.js";
import IndexForm from "../assets/IndexForm.js";

export default function Index(props) {
  return (
    <div>
      <Shapka />
      <div className="row justify-content-center" style={{ marginTop: "50px" }}>
        <IndexForm logup={props.logup} login={props.login} emailChange={props.emailChange} passwordChange={props.passwordChange}/>
      </div>
    </div>
  );
}