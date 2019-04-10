const switcher = document.querySelector('#cbx'), //выбор по id
    more = document.querySelector('.more'), //выбор по классу, первый и единственный элемент который попался в верстке
    modal = document.querySelector('.modal'),
    videos = document.querySelectorAll('.videos__item');
const videosWrapper = document.querySelector('.videos__wrapper');
let player;

function bindSlideToggle(trigger, boxBody, content, openClass) {
    let button = {
        'element': document.querySelector(trigger),
        'active': false
    };
    const box = document.querySelector(boxBody),
        boxContent = document.querySelector(content);
    //menu слушатель события: следи за элементом и при нажатии на него делай следующее
    button.element.addEventListener('click', () => {
        if (button.active === false) { // проверка меню на неактивность
            button.active = true; //если не активна - включить
            //позволяет получить высоту
            box.style.height = boxContent.clientHeight + 'px';
            //достучатсья до всех классов элемента
            box.classList.add(openClass); // активный класс для меню
        } else {
            button.active = false;
            box.style.height = 0 + 'px';
            box.classList.remove(openClass);
        }
    });
}
//дата атрибуты в [], классы селектора .head
bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

function switchMode() {
    if (night === false) {
        night = true;
        //document.body.style.backgroundColor = '#000';
        document.body.classList.add('night'); //класс night уже закоготвлен
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#fff'; // присутствует атрибут stroke в теге
        });
        //возьмет все теги line внутри гамбургера. форич - для каждой
        // конструкция из е6 стандарта item => { которая будет запускаться и что-то делать

        document.querySelectorAll('.videos__item-descr').forEach(item => { //красим подпись видео
            item.style.color = '#fff';
        });

        document.querySelectorAll('.videos__item-views').forEach(item => { // красим колич-во просмотров
            item.style.color = '#fff';
        });

        document.querySelector('.header__item-descr').style.color = '#fff';

        document.querySelector('.logo > img').src = 'logo/youtube_night.svg'; // замена логотипа

    } else {
        night = false;
        document.body.classList.remove('night');
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#000';
        });

        // videos__item-descr класс который есть у каждого заголовка видео
        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = '#000';
        });

        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = '#000';
        });

        document.querySelector('.header__item-descr').style.color = '#000';
        document.querySelector('.logo > img').src = 'logo/youtube.svg';
    }
}

let night = false;
switcher.addEventListener('change', () => { // так там прописан чекбокс, то ставим change вместо клик
    switchMode();
});

// const data = [
//     ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
//     ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов', '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки Урок 2', '#1 Верстка реального заказа landing Page | Марафон вёрстки | Артём Исламов'],
//     ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
//     ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
// ];

// more.addEventListener('click', () => {
//     //враппер - это обертка
//     const videosWrapper = document.querySelector('.videos__wrapper');
//     more.remove();

//     for (let i = 0; i < data[0].length; i++) {
//         let card = document.createElement('a');
//         card.classList.add('videos__item', 'videos__item-active');
//         card.setAttribute('data-url', data[3][i]);
//         // интерполяция косые кавычки `` для вставки кода
//         card.innerHTML = `
//         <img src="${data[0][i]}" alt="thumb">
//         <div class="videos__item-descr">
//             ${data[1][i]}
//         </div>
//         <div class="videos__item-views">
//             ${data[2][i]}
//         </div>
//         `;
//         //команда appendChild помещает элемент в конец другого элемента
//         videosWrapper.appendChild(card);
//         setTimeout(() => {
//             card.classList.remove('videos__item-active');
//         }, 10); // тайммаут на 10 милисекунд
//         bindNewModal(card);
//         if (night === true) {
//             card.querySelector('videos__item-descr').style.color = '#fff';
//             card.querySelector('videos__item-views').style.color = '#fff';
//         }
//     }

//     sliceTitle('.videos__item-descr', 100);
// });


function start() {
    gapi.client.init({
        'apiKey': 'AIzaSyAmVf73FT5iql5kBVhLHkksgqLWqZZ4ow8',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }).then(function () {
        return gapi.client.youtube.playlistItems.list({
            "part": "snippet,contentDetails",
            "maxResults": '6',
            "playlistId": "PL3LQJkGQtzc4gsrFkm4MjWhTXhopsMgpv"
        });
    }).then(function (response) {
        console.log(response.result);
        const videosWrapper = document.querySelector('.videos__wrapper');
        response.result.items.forEach(item => {
            let card = document.createElement('a');

            card.classList.add('videos__item', 'videos__item-active');
            card.setAttribute('data-url', item.contentDetails.videoId);
            // интерполяция косые кавычки `` для вставки кода
            card.innerHTML = `
                    <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
                    <div class="videos__item-descr">
                     ${item.snippet.title}
                    </div>
        <div class="videos__item-views">
            27 тыс просмотров
        </div>
        `;
            //команда appendChild помещает элемент в конец другого элемента
            videosWrapper.appendChild(card);
            setTimeout(() => {
                card.classList.remove('videos__item-active');
            }, 10); // тайммаут на 10 милисекунд

            if (night === true) {
                card.querySelector('videos__item-descr').style.color = '#fff';
                card.querySelector('videos__item-views').style.color = '#fff';
            }


        });

        sliceTitle('.videos__item-descr', 100);
        bindModal(document.querySelectorAll('.videos__item'));

    }).catch(e => {
        console.log(e);
    });
}

more.addEventListener('click', () => {
    more.remove();
    gapi.load('client', start);

});


function search(target) {
    gapi.client.init({
        'apiKey': 'AIzaSyAmVf73FT5iql5kBVhLHkksgqLWqZZ4ow8',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }).then(function () {
        return gapi.client.youtube.search.list({
            'maxResults': '10',
            'part': 'snippet',
            'q': `${target}`,
            'type': ''
        });
    }).then(function (response) {
        console.log(response.result);
        //  videosWrapper.innerHTML = '';
        while (videosWrapper.firstChild) {
            videosWrapper.removeChild(videosWrapper.firstChild);
        }

        response.result.items.forEach(item => {
            let card = document.createElement('a');

            card.classList.add('videos__item', 'videos__item-active');
            card.setAttribute('data-url', item.id.videoId);

            card.innerHTML = `
                    <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
                    <div class="videos__item-descr">
                     ${item.snippet.title}
                    </div>
                    <div class="videos__item-views">
                    27 тыс просмотров
                     </div>
                      `;
            videosWrapper.appendChild(card);

            setTimeout(() => {
                card.classList.remove('videos__item-active');
            }, 10);

            if (night === true) {
                card.querySelector('videos__item-descr').style.color = '#fff';
                card.querySelector('videos__item-views').style.color = '#fff';
            }
        });

        sliceTitle('.videos__item-descr', 100);
        bindModal(document.querySelectorAll('.videos__item'));
    });

}

document.querySelector('.search').addEventListener('submit', (e) => {
    e.preventDefault();
    gapi.load('client', () => {
        search(document.querySelector('.search > input').value);
    });
    document.querySelector('.search > input').value = '';
});


//подрезаем тайтл
function sliceTitle(selector, count) {
    document.querySelectorAll(selector).forEach(item => {
        //обрезаем пробелы. item каждый элемент перебираемый foreach
        //получаем контент
        item.textContent.trim(); //метод трим обрезает лишние пробелы в начале, в конце

        if (item.textContent.length < count) {
            return; //просто выйти из функции
        } else {
            const str = item.textContent.slice(0, count + 1) + "..."; //вырезать с 0 до 101 не включительно строки
            item.textContent = str;
        }
    });
}
sliceTitle('.videos__item-descr', 100);

//модальное окно
function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    player.stopVideo();
}

function bindModal(cards) {
    cards.forEach(item => { //переберем массив карточек видео на странице и обернем ихх ссылками
        item.addEventListener('click', (e) => { // e - объект событий хранящий параметры события event
            e.preventDefault(); //отменим стандартное поведение браузера
            const id = item.getAttribute('data-url');
            loadVideo(id);
            openModal();
        });
    });

}
// bindModal(videos);

function bindNewModal(cards) { //получает ОДНУ карточку и следит за ней (при нажатии на нее открыть модальное) 
    cards.addEventListener('click', (e) => {
        e.preventDefault();
        const id = cards.getAttribute('data-url');
        loadVideo(id);
        openModal();
    });
}

modal.addEventListener('click', (e) => {
    if (!e.target.classList.contains('modal__body')) { //если таргет нажатия не содержит класс ...
        closeModal();
    }
    // if (e.keyCode === 27) { // если пользователь нажал клавишу 27 ESC
    //     closeModal();
    // }
});
document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
        closeModal();
    }
});

function createVideo() { //https://developers.google.com/youtube/iframe_api_reference пример №2
    var tag = document.createElement('script'); //создаем тег скрипт

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0]; //получаем первый скрипт из массивов элементов
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // вставить перед найденным тегом скрипт

    setTimeout(() => { //необходима задержка (некрасивый способ, для новичков) т.к. предыддущие строчки кода еще не исполнились
        player = new YT.Player('frame', { //создадим новый экземпляр плеера
            height: '100%',
            width: '100%',
            videoId: 'M7lc1UVf-VE'
            // events: { //события которые могут происходить с этим плеером (ищи в документации)
            //   'onReady': onPlayerReady,
            //   'onStateChange': onPlayerStateChange
            // }
        });
    }, 300);
}

createVideo();

function loadVideo(id) {
    player.loadVideoById({
        'videoId': `${id}`
    });
}