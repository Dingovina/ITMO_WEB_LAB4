export default function Table(props) {
    return (
        <div className="col-7" id="result-table">
            <table key="table" className="table" id="history-table">
                <thead key="thead">
                    <tr key="header">
                        <th key="headerId">Id</th>
                        <th key="headerX">X</th>
                        <th key="headerY">Y</th>
                        <th key="headerR">R</th>
                        <th key="headerHit">Hit</th>
                        <th key="headerCreationTime">Creation Time</th>
                    </tr>
                </thead>
                <tbody key="tbody">
                    {props.points.map(point => (
                        (point.r == props.r) &&
                            <tr key={point.id}>
                                <td key={point.id + "id"}>{point.id}</td>
                                <td key={point.id + "x"}>{point.x}</td>
                                <td key={point.id + "y"}>{point.y}</td>
                                <td key={point.id + "r"}>{point.r}</td>
                                <td key={point.id + "hit"} style={{ color: point.hit ? "green" : "red" }}>{point.hit ? "Hit" : "Miss"}</td>
                                <td key={point.id + "creationTime"}>{point.creationTime}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}