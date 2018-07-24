(function () {
    // click handle
    function onMenuClickToggleHandler(event) {
        document.querySelector('.nav-list').classList.toggle('visible');
    }
    document.getElementById("collapse-toggle").onclick = onMenuClickToggleHandler;

    // onScroll
    function onScrollMenuCollapseHandler(event) {
        const isTop = document.documentElement.scrollTop === 0;
        document.querySelector('.navigation').style.height = isTop ? '60px' : '50px';
    }
    document.body.onscroll = onScrollMenuCollapseHandler;
})();