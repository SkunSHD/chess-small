window.onload = function() {
    const wrapper = document.querySelector('.image-placeholder-wrapper'),
        placeholder = wrapper.querySelector('.image-placeholder'),
        responsiveImgName = document.documentElement.clientWidth < 768 ? 'small' : 'medium';

    const imgPlaceholder = new Image();
    imgPlaceholder.src = placeholder.src;
    imgPlaceholder.onload = function () {
        placeholder.classList.add('loaded');
    };

    const imgResponsive = new Image();
    imgResponsive.classList.add('image-responsive');
    imgResponsive.src = wrapper.dataset[responsiveImgName];
    imgResponsive.onload = function () {
        imgResponsive.classList.add('loaded')
    };

    wrapper.appendChild(imgResponsive);
};