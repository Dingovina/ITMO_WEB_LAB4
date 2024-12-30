export default function RRadioButton(props) {
    return (
        <div className="row justify-content-start" style={{ fontSize: "20px" }}>
            <label htmlFor="r-input" className="col-1">
                R:
            </label>
            <div className="col-9 d-flex">
                <div className="col-1" key="r-input1">
                    <input type="radio" id="r-input" name="r-input" value={1} defaultChecked onChange={props.onChange} />
                    <label htmlFor={1}>{1}</label>
                </div>
                {[...Array(4).keys()].map(i => (
                    <div className="col-1" key={"r-input" + (i + 2)}>
                        <input type="radio" id="r-input" name="r-input" value={i + 2} onChange={props.onChange} />
                        <label htmlFor={i + 2}>{i + 2}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}