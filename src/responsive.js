// fnResize()
// window.onresize = function () {
//     fnResize()
// }
// function fnResize() {
//     var deviceWidth = document.documentElement.clientWidth || window.innerWidth
//     if (deviceWidth >= 750) {
//         deviceWidth = 750
//     }
//     if (deviceWidth <= 320) {
//         deviceWidth = 320
//     }
//     document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
// }

var docEle = document.documentElement,
evt = "onorientationchange" in window ? "orientationchange" : "",
fn = function() {
    var width = docEle.clientWidth;
    width && (docEle.style.fontSize = width / 7.5 + "px");
};
fn();
if(window.addEventListener) {
if(evt) {
    window.addEventListener(evt, fn, false);
}
window.addEventListener("resize", fn, false);
document.addEventListener("DOMContentLoaded", fn, false);
}