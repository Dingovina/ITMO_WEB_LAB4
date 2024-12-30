import SubmitButton from "./IndexForm/SubmitButton";
import EmailInput from "./IndexForm/EmailInput";
import PasswordInput from "./IndexForm/PasswordInput";

export default function IndexForm(props) {
    return (
        <div id="index-form" className="col-2">
            <EmailInput onChange={props.emailChange} />
            <PasswordInput onChange={props.passwordChange} />
            <div className="row justify-content-center">
                <div className="col-4">
                    <SubmitButton label="LogUp" onClick={props.logup} />
                </div>
                <div className="col-4">
                    <SubmitButton label="LogIn" onClick={props.login} />
                </div>
            </div>
        </div>
    );
}