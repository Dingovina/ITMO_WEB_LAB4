import XRadioButton from "./PointForm/XRadioButton";
import SubmitButton from "./PointForm/SubmitButton";
import YInput from "./PointForm/YInput";
import RRadioButton from "./PointForm/RRadioButton";
import { useState } from "react";

export default function PointForm(props) {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    return (
        <div id="point-form">
            <div className="row">
                <XRadioButton onChange={xChange} />
            </div>
            <div className="row">
                <YInput onChange={yChange} />
            </div>
            <div className="row">
                <RRadioButton onChange={rChange} />
            </div>
            <div className="row justify-content-center">
                <SubmitButton onClick={submit} />
            </div>
        </div>
    );

    function xChange(e) {
        setX(e.target.value);
    }

    function yChange(e){
        setY(e.target.value);
    }

    function rChange(e){
        props.setR(e.target.value);
    }

    function submit() {
        console.log("Submit", x, y, props.r);
        props.onClick(x, y, props.r);
    }
}