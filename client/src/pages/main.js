import Shapka from "../assets/Shapka";
import Canvas from "../assets/Canvas";
import Table from "../assets/Table";
import PointForm from "../assets/PointForm";  
import { config } from "../config";
import { AjaxManager } from "../ajaxManager";
import { useState } from "react";

export default function Main(props) {
  const [points, setPoints] = useState([]);
  const [isInit, setInit] = useState(false);
  const [r, setR] = useState(1);
  AjaxManager.updatePoints();
  if (!isInit) {
    setTimeout(() => {
      setPoints(AjaxManager.points);
    }, 200);
    setInit(true);
  }


  return (
    <div>
      <Shapka />
      <div className="row justify-content-between">
        <div className="col-4">
          <div>
            <Canvas onClick={clicked} points={points} r={r} />
          </div>
          <div>
            <PointForm onClick={addPoint} setR={setR} />
          </div>
        </div>
        <div className="col-7">
          <Table points={points} r={r} />
        </div>
      </div>
    </div>
  );

  function addPoint(x, y) {
    AjaxManager.addPoint({x: x, y: y, r: r, drawn: false, token: props.token});

    setTimeout(() => {
      setPoints(AjaxManager.points);
    }, 200);
  }

  function clicked(event) {
    const rect = event.target.getBoundingClientRect();
    let x = event.clientX - rect.left - config.W / 2;
    let y = -(event.clientY - rect.top - config.H / 2);   
    x = x / config.R;
    y = y / config.R;
    AjaxManager.addPoint({x: x, y: y, r: r, drawn: true, token: props.token});

    setTimeout(() => {
      setPoints(AjaxManager.points);
      console.log(AjaxManager.points);
    }, 200);
  }
}