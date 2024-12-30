import $ from 'jquery';
import Swal from 'sweetalert2';

export class AjaxManager {
    static points = [];

    static updatePoints(){
        let thisClass = this;
        $.ajax({
            url: "http://localhost:8081/points?timezone=" + Intl.DateTimeFormat().resolvedOptions().timeZone,
            method: "GET",
            success: function(data) {
                thisClass.points = data;
            },
            error: function(response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                    text: response,
                })
            }
        });
    }

    static addPoint(props){
        $.ajax({
            url: "http://localhost:8081/add",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(props),
            success: function(response) {
                console.log(response);
                AjaxManager.updatePoints();
            },
            error: function(response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                    text: response,
                })
            }
        });
    }
    
}