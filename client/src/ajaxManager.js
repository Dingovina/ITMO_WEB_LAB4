import $ from 'jquery';
import Swal from 'sweetalert2';

export class AjaxManager {
    static points = [];

    static updatePoints(props){
        let thisClass = this;
        $.ajax({
            url: "http://localhost:8081/points?timezone=" + Intl.DateTimeFormat().resolvedOptions().timeZone,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + props.token
            },
            success: function(data) {
                thisClass.points = data;
            },
            error: function(response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                    text: response.responseText,
                })
            }
        });
    }

    static addPoint(props){
        let TOKEN = props.token;
        $.ajax({
            url: "http://localhost:8081/add",
            method: "POST",
            contentType: "application/json",
            headers: {
                "Authorization": "Bearer " + props.token
            },
            data: JSON.stringify({x: props.x, y: props.y, r: props.r, drawn: props.drawn}),
            success: function(response) {
                console.log(response);
                AjaxManager.updatePoints({token: TOKEN});
            },
            error: function(response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                    text: response.responseText,
                })
            }
        });
    }

    static signup(props){
        $.ajax({
            url: "http://localhost:8081/signup",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({email: props.email, password: props.password}),
            success: function(response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Успешно',
                    text: 'Вы зарегистрированы',
                })
            },
            error: function(response) {
                console.log(response);
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка',
                    text: response.responseText,
                })
            }
        });
    }

    static login(props){
        $.ajax({
            url: "http://localhost:8081/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({email: props.email, password: props.password}),
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Успешно',
                    text: 'Вы авторизованы',
                })
                props.setToken(response.token);
            },
            error: function(response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка!',
                    text: response.responseText,
                })
            }
        });
    }
    
}