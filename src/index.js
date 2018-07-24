import './styles/main.scss';
import './js/navigation.js';
import './js/service-worker.js';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = ['11---11', '----'].join(' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = function() {
        console.log('%%---> click')
    };

    element.appendChild(btn);
    return element;
}

let element = component();
// document.body.appendChild(element);
