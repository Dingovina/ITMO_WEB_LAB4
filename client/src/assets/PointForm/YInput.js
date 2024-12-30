export default function YInput(props) {
    return (
        <div className="row" style={{ fontSize: "20px" }}>
            <label htmlFor="y-input" className="col-1">
                Y:
            </label>
            <div className="col-9">
                <input type="text" id="y-input" name="y-input" style={{ textAlign: "center", borderRadius: "5px" }} onChange={props.onChange} placeholder="-3 <= y <= 3" />
            </div>
        </div>
    );
}