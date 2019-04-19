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
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

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
