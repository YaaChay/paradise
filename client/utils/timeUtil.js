function format1(dateTime) {
    var year = dateTime.substr(0, 4);
    var month = dateTime.substr(5, 2);
    var day = dateTime.substr(8, 2);
    var hour = dateTime.substr(11, 2);
    var minute = dateTime.substr(14, 2);

    return year + month + day + hour + minute;
    //202208230346
};

function format2(dateTime) {
    var year = dateTime.substr(0, 4);
    var month = dateTime.substr(4, 2);
    var day = dateTime.substr(6, 2);
    var hour = dateTime.substr(8, 2);
    var minute = dateTime.substr(10, 2);

    return year + ", " + month + ", " + day + ", " + hour + ", " + minute + ", " + "00";
    //2022, 08, 23, 15, 52
};

function format3(dateTime) {
    var year = dateTime.substr(0, 4);
    var month = dateTime.substr(4, 2);
    var day = dateTime.substr(6, 2);
    var hour = dateTime.substr(8, 2);
    var minute = dateTime.substr(10, 2);
    var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthIndex = month - 1;
    var monthName = monthArr[monthIndex];
    var apm = "AM";

    if (hour > 12) {
        var h = hour - 12;
        hour = "0" + h;
        apm = "PM";
    }

    return monthName + " " + day + ", " + year + " " + hour + ":" + minute + " " + apm;
    //Aug 23, 2022 03:52 PM
}

function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();

    if (month < 10) {
        month = "0" + (month + 1);
    } else {
        month = month + 1;
    }
    if (day < 10) {
        day = "0" + day;
    } else {
        day = day;
    }
    if (minute < 10) {
        minute = "0" + minute;
    } else {
        minute = minute;
    }
    return year + '' + month + '' + day + '' + hour + '' + minute;
    //202208230346
}

function getTime(dateTime) {
    var hour = dateTime.substr(8, 2);
    var minute = dateTime.substr(10, 2);
    var apm = "AM";

    if (hour > 12) {
        var h = hour - 12;
        hour = "0" + h;
        apm = "PM";
    }
    return hour + ":" + minute + " " + apm;
    //03:52 PM
}

export { format1, format2, format3, getCurrentDate, getTime };