/**
 * toast提示
 * @param {提示内容} str String 
 */
function showToast(str){
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
export {showToast ,getHerfInfo}