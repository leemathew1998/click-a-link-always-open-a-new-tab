// ==UserScript==
// @name         click a link always open a new tab
// @description  click a link always open a new tab
// @icon         https://img1.baidu.com/it/u=1412332306,99938487&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500
// @license	     MIT
// @version      0.0.1
// @author       lee mathew
// @run-at       document-end
// @include      http*://*
// ==/UserScript==


(function () {
    const onClick = function (event, href) {
        // event.preventDefault();
        console.log(event, href)
    }
    let elements = document.querySelectorAll("a")
    elements.forEach(el => {
        //如果是a标签的href只有javascript:;之类的，需要跳过
        if (el.href.indexOf('javascript:') === -1) {
            el.target = '_blank'
            el.href += `${el.href.indexOf('?') === -1 ? '?' : '&'}new_tab_return_path=${window.location.href}`
            el.addEventListener('click', (event) => { onClick(event, el.href) })
        }
    })
    if (window.location.href.indexOf('new_tab_return_path')) {
        console.log('pushState')
        // window.history.pushState({}, null, `${window.location.href}&alpha=${Math.random()}`);
    }
    window.addEventListener("popstate", e => {
        alert("监听到了浏览器的返回按钮事件");
    }, false);
})();
