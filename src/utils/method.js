/**
 * toast提示
 * @param {提示内容} str String 
 */
function showToast(str) {
    window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showToast', [{ 'content': str }]);
}
/**
 * 获取地址栏参数
 * @param {要截取地址栏的参数} str String 
 */
function getHerfInfo(str) {
    if (window.location.href.split('?').length == 2) {
        return (window.location.href.split('?')[1].split('&').find(item => item.indexOf(str) != -1) || '=').split('=')[1];
    } else {
        return '';
    }
}

function isOnLine() {
    function onLine(callback) {
        var img = new Image();
        img.src = 'https://www.baidu.com/favicon.ico?_t=' + Date.now();
        img.onload = function () {
            if (callback) callback(true)
        };
        img.onerror = function () {
            if (callback) callback(false)
        };
    }
    onLine(function (flag) {
        if (flag) {
            // console.log('网络畅通')
        } else {
            window.cordova.exec(function () { }, function () { }, "LeTalkCorePlugin", "showToast", [{ "content": "网络断开" }])
            // console.log('网络故障')
        }
    })
}
export { showToast, getHerfInfo, isOnLine }