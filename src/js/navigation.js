// click handle
function onMenuClickToggleHandler(event) {
    document.querySelector('.nav-list').classList.toggle('visible');
}
document.getElementById("collapse-toggle").onclick = onMenuClickToggleHandler;

// onScroll
function onScrollMenuCollapseHandler(event) {
    const isTop = document.documentElement.scrollTop === 0;
    const isMobile = document.documentElement.clientWidth < 768;

    const normalHeight = isMobile ? '60px' : '70px';
    const collapsedHeight = isMobile ? '50px' : '50px';

    document.querySelector('.navigation').style.height = isTop ? normalHeight : collapsedHeight;
}
document.body.onscroll = onScrollMenuCollapseHandler;


function onNavClick(e) {
    const links = document.querySelectorAll('.nav-list ul > li a');
    links.forEach(link => {
        if(link.classList.contains('active')) {
            link.classList.remove('active');
        }
    });
    e.target.classList.add('active');
}
document.querySelectorAll('.nav-list ul > li').forEach(link => link.onclick = onNavClick);