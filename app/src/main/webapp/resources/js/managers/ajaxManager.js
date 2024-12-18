function handleAjax(event){
    console.log(event.status);
    if (event.status == "begin"){
        console.log("setTimezone");
        setTimezone();
    }
}

function setTimezone(){
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById("timezone-form:timezone-input").value = currentTimezone;
    document.getElementById("timezone-form:submit").click();
}
