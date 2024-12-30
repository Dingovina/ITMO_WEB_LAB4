export default function PasswordInput(props) {
    return (
        <div className="row justify-content-start" style={{ fontSize: "20px", paddingBottom:"5px" }}>
            <label htmlFor="password-input" className="col-6">
                Password:
            </label>
            <div className="col-6">
                <input type="password" id="password-input" name="password-input" style={{ textAlign: "center", borderRadius: "5px" }} onChange={props.onChange} placeholder="Password" />
            </div>
        </div>
    );
}