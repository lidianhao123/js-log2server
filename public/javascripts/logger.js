/*global location */
var logger = (function (w) {
    var loghost = location.href + 'log.gif?',
        defaultInfo = '&uname=&ID=&organ=&organID=',
        setInfo = function (param) {
            var _url = [];
            if (param.uname) {
                _url.push('uname=' + encodeURIComponent(param.uname));
            }
            if (param.ID) {
                _url.push('ID=' + encodeURIComponent(param.ID));
            }
            if (param.organ) {
                _url.push('organ=' + encodeURIComponent(param.organ));
            }
            if (param.organID) {
                _url.push('organID=' + encodeURIComponent(param.organID));
            }

            if (_url.length) {
                defaultInfo = "&" + _url.join('&');
            }
        },
        log = function (err) {
            var img = new Image(0, 0),
                _url = [];

            _url.push('name' + '=' + encodeURIComponent(err.name));
            _url.push('message' + '=' + encodeURIComponent(err.message));
            _url.push('location' + '=' + encodeURIComponent(err.location));
            if (err.line) {
                _url.push('line' + '=' + encodeURIComponent(err.line));
            }
            if (err.func) {
                _url.push('func' + '=' + encodeURIComponent(err.func));
            }

            _url = _url.join('&');
            img.src = loghost + _url + defaultInfo;
        };

    w.onerror = function (msg, URI, ln, colno) {
        // wrap our unknown error condition in an object
        var error = new Error(msg);
        error.location = URI; // add custom property
        error.position = "line = " + ln + " colno = " + colno;
        logger.log(error);
        return true; // stop the yellow triangle
    };

    return {
        log: log,
        set: setInfo
    };

}(window));