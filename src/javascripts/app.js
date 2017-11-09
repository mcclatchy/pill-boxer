import cropper from './modules/cropper'

navigator.sayswho = (function () {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M[0];
})();


if (navigator.sayswho == "Chrome" || navigator.sayswho == "Firefox") {
    window.onload = cropper;
}
else {
    document.querySelector('.upload-wrapper').remove()
    const browserCatch = document.createElement('div')
    browserCatch.className = "alert alert-danger text-center w-50 center"
    browserCatch.style.margin = "auto"
    browserCatch.innerHTML = `
    <h4 class="alert-heading"><i class="fa fa-frown-o fa-lg" aria-hidden="true"></i></h4>
    <p>Looks like your using a non-supported browser.</p>
    <p>Please switch to Chrome or Firefox to use this tool.</p>`
    document.querySelector('.container').insertBefore(browserCatch, document.querySelector('.container').firstChild)
    console.log(navigator.sayswho);
}