document.documentElement.style.fontSize = document.documentElement.getBoundingClientRect().width/3.75 + 'px';
window.addEventListener('resize', function() {
    document.documentElement.style.fontSize = document.documentElement.getBoundingClientRect().width/3.75 + 'px';
    //clearTimeout(tid);
    //tid = setTimeout(refreshRem, 300);
}, false);
window.addEventListener('pageshow', function(e) {
    document.documentElement.style.fontSize = document.documentElement.getBoundingClientRect().width/3.75 + 'px';
    //if (e.persisted) {
    //    clearTimeout(tid);
    //    tid = setTimeout(refreshRem, 300);
    //}
}, false);