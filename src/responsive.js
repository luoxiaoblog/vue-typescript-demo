var docEle = document.documentElement,
  evt = 'onorientationchange' in window ? 'orientationchange' : '',
  fn = function() {
    var width = docEle.clientWidth;
    width && (docEle.style.fontSize = width / 7.5 + 'px');
  };
fn();
if (window.addEventListener) {
  if (evt) {
    window.addEventListener(evt, fn, false);
  }
  window.addEventListener('resize', fn, false);
  document.addEventListener('DOMContentLoaded', fn, false);
}
