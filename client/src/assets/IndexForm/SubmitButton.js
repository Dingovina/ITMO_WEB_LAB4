export default function SubmitButton(props) {
    return (
        <button className="btn btn-success" id={props.label + "-button"} onClick={props.onClick}>{props.label}</button>
    );
}