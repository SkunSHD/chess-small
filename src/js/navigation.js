// menu click handle
function onMenuClickToggleHandler(event) {
    document.querySelector('.nav-list').classList.toggle('visible');
}
document.getElementById("collapse-toggle").onclick = onMenuClickToggleHandler;

// onScroll handle
function onScrollMenuCollapseHandler(event) {
    const isTop = document.documentElement.scrollTop === 0;
    const isMobile = document.documentElement.clientWidth < 768;

    const normalHeight = isMobile ? '60px' : '70px';
    const collapsedHeight = isMobile ? '50px' : '50px';

    document.querySelector('.navigation').style.height = isTop ? normalHeight : collapsedHeight;
}
document.body.onscroll = onScrollMenuCollapseHandler;

// navigation click handle
const links = document.querySelectorAll('.nav-list ul > li a');

window.addEventListener("hashchange", ()=> {
    links.forEach(link => {
        // clear old active class
        if(link.classList.contains('active')) {
            link.classList.remove('active');
        }
        // add new active class
        if(link.getAttribute("href") === location.hash) {
            link.classList.add('active');
        }
    });
}, false);

links.forEach(link => {
    if(link.getAttribute("href") === location.hash) {
        link.classList.add('active');
    }
});

links.forEach(link => link.onclick = (e)=> location.href = link.getAttribute("href"));

// anchor smooth jumps
const destinationElsMap = (()=>{
    const destEls = document.getElementsByTagName('section');
    const destElsArr = Array.prototype.slice.call(destEls);
    const destElsArrMapped = destElsArr.map(el => [el.getAttribute('class'), el]);
    return new Map(destElsArrMapped);
})();


// https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
document.querySelectorAll("a[href^=\"#\"]").forEach((anchor) => {
    anchor.addEventListener("click", function (ev) {
        ev.preventDefault();

        const destClass = this.getAttribute("href").replace('#', 'section-');
        const targetElement = destinationElsMap.get(destClass);

        targetElement.scrollIntoView({
            behavior: "smooth"
        });
    });
});
