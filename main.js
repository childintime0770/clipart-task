import "./src/index.css";
import data from "./src/data";
import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// slider

const sliderWrapper = document.querySelector(".swiper-wrapper");

function createSliderItems(slider, index) {
    return `
        <div class="swiper-slide bg-white md:relative md:rounded-lg overflow-hidden">
            <div class="h-72 sm:h-96 md:h-140 xl:h-[760px] bg-cover bg-center" style="background-image: url('${slider.src}')"></div>
            <div class="p-4 md:absolute md:left-3 md:bottom-3 xl:h-36 z-10 bg-white w-el-without-padding md:rounded-lg">
                <div class="slider-discrabe flex items-center gap-2">
                    <span class="text-primary text-13">${slider.title}</span>
                    <span class="inline-block w-1 h-1 bg-black rounded-full"></span>
                    <span class="text-13">${slider.date}</span>
                </div>
                <div class="pt-2">
                    <p class="font-semibold text-16 leading-6">${slider.discribe}</p>
                </div>
            </div>
            <div class="w-32 mt-8 rounded-lg bg-light-gray text-center hidden lg:block md:absolute top-0 left-8 xl:bottom-8 xl:top-auto md:z-20">
                <span class="inline-block p-2">${index+1}/${data.sliderData.length}</span>
            </div>
        </div>
    `
}

sliderWrapper.innerHTML = `
    ${data.sliderData.map((slider, index) => createSliderItems(slider, index)).join("")}
`

const swiper = new Swiper('.swiper', {
    modules: [Navigation],
    direction: "horizontal",
    loop: true,
    speed: 300,
    spaceBetween: 0,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// cards

const cardsContainer = document.querySelector(".cards-container");

function createCard(data, index) {
    return (
        data.isHeader ?
            ` 
                <div class="
                    swiper-slide 
                    shadow-xl 
                    rounded-2xl 
                    bg-white 
                    col-span-4
                    md:col-span-8
                    xl:col-span-6
                    xl:col-start-4  
                    xl:row-span-2
                    overflow-hidden
                ">
                    <div>
                        <img src="${data.src}" alt="${data.imageName}" class="w-full">
                    </div>
                    <div class="p-4">
                        <div class="pt-2">
                            <p class="font-semibold text-16 leading-6">${data.discribe}</p>
                        </div>
                        <hr class="mt-4">
                        <div class="slider-discrabe flex items-center justify-between mt-4">
                            <span class="text-primary text-13">${data.title}</span>
                            <span class="text-13">${data.date}</span>
                        </div>
                    </div>
                </div>
            ` :
            `
                <div 
                    class="
                        card-${index}
                        swiper-slide 
                        shadow-xl 
                        rounded-2xl 
                        bg-white 
                        col-span-4
                        row-span-1
                        xl:col-span-3
                        overflow-hidden
                    "
                >
                    <div>
                        <img src="${data.src}" alt="${data.imageName}" class="w-full">
                    </div>
                    <div class="p-4">
                        <div class="slider-discrabe flex items-center gap-2">
                            <span class="text-13">${data.title}</span>
                            <span class="inline-block w-1 h-1 bg-black rounded-full"></span>
                            <span class="text-13">${data.date}</span>
                        </div>
                        <div class="pt-2">
                            <p class="font-semibold text-16 leading-6">${data.discribe}</p>
                        </div>
                    </div>
                </div>
            `
    )
}

cardsContainer.innerHTML = `
    ${data.cardsData.map((data, index) => createCard(data, index)).join("")}
`

// navigation

function navigationAdjustment() {
    const list = document.querySelector(".navigation ul");
    const dropdownList = document.querySelector(".dropdown ul");
    if (list.offsetWidth === 0) return;

    const additionalMargin = 30;
    const innerWidth = [...list.children].reduce((p, c) => p + Number(c.dataset.originalWidth), 0);

    if(innerWidth + additionalMargin > list.offsetWidth) {
        let w = innerWidth;
        while(w + additionalMargin > list.offsetWidth) {
            w -= Number(list.lastElementChild.dataset.originalWidth);
            dropdownList.appendChild(list.lastElementChild);
        }
    } else {
        if(dropdownList.children.length) {
            function frame() {
                if(dropdownList.children.length) {
                    const width = Number(dropdownList.lastElementChild.dataset.originalWidth);
                    if (innerWidth + width + additionalMargin < list.offsetWidth) {
                        list.appendChild(dropdownList.lastElementChild);
                        dropdownList.children.length && requestAnimationFrame(frame);
                    }
                }
            }
            frame();
        }
    }
}

window.addEventListener('load', function() {
    [...document.querySelector(".navigation ul").children].forEach(el => {
        el.dataset.originalWidth = el.offsetWidth + 16;
    });

    window.addEventListener("resize", navigationAdjustment);
    navigationAdjustment();
});

