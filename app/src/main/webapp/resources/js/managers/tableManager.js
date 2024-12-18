export class TableManager{
    static getTableLenght(){
        let table = document.querySelectorAll('#history-table tbody tr');
        let cnt = table.length;
        if (cnt == 1 && table[0].lastChild.nodeName == 'TD'){
            cnt = 0;
        }
        return cnt;
    }
    static setTimeZone(){
        const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        document.getElementById("timeZone-form:storage-timeZone").value = currentTimezone;
    }
    static updateTable(){
        this.setTimeZone();
        document.getElementById("timeZone-form:submit").click();
    }
}