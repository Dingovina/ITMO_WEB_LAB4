export default function XRadioButton(props) {
    return (
        <div className="row" style={{ fontSize: "20px" }}>
            <label htmlFor="x-input" className="col-1">
                X:
            </label>
            <div className="col d-flex">
                <div className="col-1" key={"x-input"-3}>
                    <input type="radio" id="x-input" name="x-input" value={-3} defaultChecked onChange={props.onChange} />
                    <label htmlFor="-3">-3</label>
                </div>
                {[...Array(8).keys()].map(i => (
                    <div className="col-1" key={"x-input" + (i - 2)}>
                        <input type="radio" id="x-input" name="x-input" value={i - 2} onChange={props.onChange} />
                        <label htmlFor={i - 2}>{i - 2}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}