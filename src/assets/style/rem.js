/**
 * 
 * 移动端rem适配，根据屏幕的width动态调整根元素的font-size
 */
let screenWidth = document.documentElement.clientWidth || document.body.clientWidth
let html = document.getElementsByTagName('html')[0]
if (screenWidth > 750) {
  screenWidth = 750
}
// 基准是iphone5, 宽度和字体的比例为20=320/16px
html.style.fontSize = screenWidth/20 + 'px'