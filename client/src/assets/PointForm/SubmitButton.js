export default function SubmitButton(props) {
    return (
        <button className="btn btn-success" id="add-point" onClick={props.onClick}>Добавить</button>
    );
}