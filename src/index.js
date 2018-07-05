import printMe from './js/print.js';
import './styles/main.scss'


function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = ['He1d  llo', 'w 22 2ebpack 11  '].join(' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

let element = component(); // Store the element to re-render on print.js changes
document.body.appendChild(element);

if (module.hot) {
    module.hot.accept('./js/print.js', function () {
        console.log('Accepting the updated printMe module!');
        document.body.removeChild(element);
        element = component(); // Re-render the "component" to update the click handler
        document.body.appendChild(element);
    })
}