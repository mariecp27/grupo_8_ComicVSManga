const marvel = document.querySelector('.main__slider-container-marvel');
const dc = document.querySelector('.main__slider-container-DC');
const manga = document.querySelector('.main__slider-container-manga');
const independent = document.querySelector('.main__slider-container-independent');

const marvelB = document.querySelector('.main__categories-title2-marvel');
const dcB = document.querySelector('.main__categories-title2-DC');
const mangaB = document.querySelector('.main__categories-title2-manga');
const independentB = document.querySelector('.main__categories-title2-independent');

const sliders = [
    document.querySelector('.main__slider-container-marvel'),
    document.querySelector('.main__slider-container-DC'),
    document.querySelector('.main__slider-container-manga'),
    document.querySelector('.main__slider-container-independent'),
]

// Agregar clase

let funcionMarvelAdd = () => {
    sliders.forEach(slider => {
        if(slider != document.querySelector('.main__slider-container-marvel')){
            slider.classList.toggle('no-active');
        }
    });
}

marvel.addEventListener('mouseenter', funcionMarvelAdd);
marvelB.addEventListener('mouseenter', funcionMarvelAdd);

let funcionDCAdd = () => {
    sliders.forEach(slider => {
        if(slider != document.querySelector('.main__slider-container-DC')){
            slider.classList.toggle('no-active');
        }
    });
}

dc.addEventListener('mouseenter', funcionDCAdd);
dcB.addEventListener('mouseenter', funcionDCAdd);

let funcionMangaAdd = () => {
    sliders.forEach(slider => {
        if(slider != document.querySelector('.main__slider-container-manga')){
            slider.classList.toggle('no-active');
        }
    });
}

manga.addEventListener('mouseenter', funcionMangaAdd);
mangaB.addEventListener('mouseenter', funcionMangaAdd);

let funcionIndependentAdd = () => {
    sliders.forEach(slider => {
        if(slider != document.querySelector('.main__slider-container-independent')){
            slider.classList.toggle('no-active');
        }
    });
}

independent.addEventListener('mouseenter', funcionIndependentAdd);
independentB.addEventListener('mouseenter', funcionIndependentAdd);


// Eliminar clase

let funcionMarvelRemove = () => {
    sliders.forEach(slider => {
        if(slider != document.querySelector('.main__slider-container-marvel')){
            slider.classList.remove('no-active');
        }
    });
}

marvel.addEventListener('mouseleave', funcionMarvelRemove);
marvelB.addEventListener('mouseleave', funcionMarvelRemove);

let funcionDcRemove = () => {
    sliders.forEach(slider => {
        if(slider != document.querySelector('.main__slider-container-DC')){
            slider.classList.remove('no-active');
        }
    });
}

dc.addEventListener('mouseleave', funcionDcRemove);
dcB.addEventListener('mouseleave', funcionDcRemove);

let funcionMangaRemove = () => {
    sliders.forEach(slider => {
        if(slider != document.querySelector('.main__slider-container-manga')){
            slider.classList.remove('no-active');
        }
    });
}

manga.addEventListener('mouseleave', funcionMangaRemove);
mangaB.addEventListener('mouseleave', funcionMangaRemove);

let funcionIndependentRemove = () => {
    sliders.forEach(slider => {
        if(slider != document.querySelector('.main__slider-container-independent')){
            slider.classList.remove('no-active');
        }
    });
}

independent.addEventListener('mouseleave', funcionIndependentRemove);
independentB.addEventListener('mouseleave', funcionIndependentRemove);