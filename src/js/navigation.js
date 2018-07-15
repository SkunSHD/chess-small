// click handle
function onMenuClickToggle(event) {
    document.querySelector('.nav-list').classList.toggle('visible');
}

document.getElementById("collapse-toggle").onclick = onMenuClickToggle;