// resize handle
function onResizeHandler(event) {
    const isNarrowEnough = document.body.clientWidth <= 768;

    const menuClassList = document.querySelector('.nav-menu').classList;
    const isClassCollapsed = menuClassList.contains('collapsed');

    if(isNarrowEnough && !isClassCollapsed) {
        menuClassList.add('collapsed');
    }
}

document.body.onresize = onResizeHandler;

// click handle
function onMenuClickToggle(event) {
    document.querySelector('.nav-menu').classList.toggle('collapsed');
}

document.getElementById("collapse-toggle").onclick = onMenuClickToggle;