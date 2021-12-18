// 对象方法扩展拦截（该分享方法存在兼容性）
const shareMessage = navigator.share;
Object.defineProperty(navigator, 'share', {
    writable: true
})

navigator.share = function (data) {
    console.log('before intercept actions');
    shareMessage(data);
    console.log('after intercept actions');
}

navigator.share({
    title: document.title,
    text: 'Hello World',
    url: 'https://developer.mozilla.org',
})