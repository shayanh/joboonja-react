function getRemainingTimeVerbose(duration) {
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    let res = "";
    if (days > 0) {
        res = res + days;
        res = `${res} روز`;
    }
    if (hours > 0) {
        if (res.length > 0) {
            res = res + ' و ';
        }
        res = res + hours;
        res = `${res} ساعت`;
    }
    if (minutes > 0) {
        if (res.length > 0) {
            res = res + ' و ';
        }
        res = res + minutes;
        res = `${res} دقیقه`;
    }
    if (seconds > 0) {
        if (res.length > 0) {
            res = res + ' و ';
        }
        res = res + seconds;
        res = `${res} ثانیه`;
    }
    return res;
}

function getRemainingTime(duration) {
    let days = Math.floor(duration / (1000 * 60 * 60 * 24));
    let hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((duration % (1000 * 60)) / 1000);

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    let res = "";
    if (days > 0) {
        res = res + days;
        res = `${res} روز`;
        res = res + ' و ';
    }
    res = res + hours + ':' + minutes + ':' + seconds;
    return res;
}

export {getRemainingTimeVerbose, getRemainingTime};
