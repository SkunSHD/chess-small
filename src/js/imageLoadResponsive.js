window.onload = function() {
    document.querySelectorAll('.image-placeholder-wrapper').forEach(wrapperEl => loadResponsiveImage(wrapperEl));
};

function loadResponsiveImage(wrapper) {
    const placeholder = wrapper.querySelector('.image-placeholder');
    const responsiveImgName = document.documentElement.clientWidth < 768 ? 'mobile' : 'desktop';

    const imgPlaceholder = new Image();
    imgPlaceholder.src = placeholder.src;
    imgPlaceholder.onload = function () {
        placeholder.classList.add('loaded');
    };

    const imgResponsive = new Image();
    imgResponsive.classList.add('image-responsive');
    imgResponsive.src = wrapper.dataset[responsiveImgName];
    imgResponsive.onload = function () {
        // dynamic img size set
        const imgRatio = this.height/this.width * 100;
        wrapper.style.paddingBottom = imgRatio + '%';
        // unblur the image
        imgResponsive.classList.add('loaded')
    };

    wrapper.appendChild(imgResponsive);
}