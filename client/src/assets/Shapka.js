import { useNavigate } from "react-router-dom";

export default function Shapka() {
    const navigate = useNavigate();
    return (
        <div>
            <nav id="shapka" className="navbar">
                <div className="container-fluid">
                    <b className="nav justify-content-start">Вариант 8943</b>
                    <button className="btn btn-outline-dark" id="goMain" onClick={goMain}>
                        GO TO MAIN
                    </button>
                    <b className="nav justify-content-center">Кортыш Константин Олегович</b>
                    <button className="btn btn-outline-dark" id="goIndex" onClick={goIndex}>
                        GO TO INDEX
                    </button>
                    <b className="nav justify-content-end">Группа P3218</b>
                </div>
            </nav>
        </div>
    );

    function goMain(){
        navigate("../main");
    }
    
    function goIndex(){
        navigate("../index");
    }
}