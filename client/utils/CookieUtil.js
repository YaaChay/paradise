var CookieUtil = {
    setCookie: function (key, value, expDay) {
        var date = new Date();
        date.setTime(date.getTime() + (expDay * 24 * 60 * 60 * 1000));
        document.cookie = key + "=" + value + "; expires=" + date.toUTCString() + "; path=/;";
    },
    getCookie: function (key) {
        var ckey = key + "=";
        var decode = decodeURIComponent(document.cookie);
        var cArr = decode.split("; ");
        var value;
        cArr.forEach(val => {
            if (val.indexOf(ckey) === 0) {
                value = val.substring(ckey.length);
            }
        })
        return value;
    },
    removeCookie: function (key) {
        var date = new Date(0);
        document.cookie = key + "=; expires=" + date + "; path=/;";
    }
}

export { CookieUtil };