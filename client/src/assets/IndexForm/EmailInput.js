export default function EmailInput(props) {
    return (
        <div className="row justify-content-center" style={{ fontSize: "20px", paddingBottom:"5px"}}>
            <label htmlFor="email-input" className="col-6">
                Email:
            </label>
            <div className="col-6">
                <input type="text" id="email-input" name="email-input" style={{ textAlign: "center", borderRadius: "5px" }} onChange={props.onChange} placeholder="Email" />
            </div>
        </div>
    );
}