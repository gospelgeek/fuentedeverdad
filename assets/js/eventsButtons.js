//Function to replace # -> %23 to share the link
const doClick = (page, lang) => {
    var url = ''
    if (lang == 'es') {
        url = 'https://heraldo2022.vercel.app/#pagina/' + page;
    } else {
        url = 'https://heraldo2022.vercel.app/#page/' + page;
    }

    url = url.replace('#', '%23')
    return url
}


//Functions to show audio
const showAudio = (audio) => {
    $('#button-' + audio.id).parent().parent().css({ display: 'none' })
    $('#button-' + audio.id).css({ display: 'none' })
    $('#' + audio.id).css({ display: 'flex' })
    $('#' + audio.id)[0].play();
}

const click_autor = (e) => {

    if (e !== '') {
        //poner visible la caja de texto
        $('.read-more-box').removeClass('display-none')
        $('.read-more-content').addClass('aux-video-author')
        $('.read-more-close').addClass('change-color-text')
        $('.read-more-text').addClass('aux-video-author-text')
        $('.read-more-text').html(`<iframe width='100%' height='100%' src="${e}" title='' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>`)
    }

}



//variables auxiliares para el audio
var band_audio = true;
var audio_array = [];
const hideAudio = () => {

    try {
        $('.button-audio').parent().parent().css({ display: 'flex' })
        $('.button-audio').css({ display: 'flex' })
        $('.audioPage').css({ display: 'none' })
        //$('.audioPage ')[0].pause();
        audio_array.map((audio) => {
            audio.pause();
        })
        band_audio = true;
        audio_array = [];
        $('.audio-img-content').removeClass('opacity-audio')
    }
    catch (error) {
        console.log(error)
    }

}

//event click of read more
const clickReadMore = async (e) => {

    //poner visible la caja de texto
    $('.read-more-box').removeClass('display-none')

    //scroll 0
    $('.read-more-text').scrollTop(0)

    let id_page = (e.replace("+", "").replace("+", "")).split('-')[2]
    let lang = (e.replace("+", "").replace("+", "")).split('-')[1]

    console.log(id_page, (e.replace("+", "").replace("+", "")).split('-')[1])

    if (id_page !== undefined && id_page !== '') {

        json = await getPagesJson(id_page, (lang !== 'espana') ? 1 : 0);

        if (lang !== 'espana') {
            text_insert = ((json[id_page])[lang]).find(x => x._id == 'text-read-more').text
        } else {
            text_insert = json.find(x => x._id == 'text-read-more').text
        }

        //insertar el texto en la caja de texto
        $('.read-more-text').html(text_insert)

    }

}


//evento click para quitar el read more
$('.read-more-close').on('click', function (event) {
    //prevent the default action for the click event
    event.preventDefault();

    $(this).parent().parent().addClass('display-none')
    //quitar reproductor de audio e video de un iframe
    $('.read-more-text').html('')
    $('.read-more-content').removeClass('aux-video-author')
    $('.read-more-close').removeClass('change-color-text')
    $('.read-more-text').removeClass('aux-video-author-text')
    $('.read-more-content').removeClass('height-auto')
});




//capturar el json de la pagina actual
async function getPagesJson(page, type) {

    try {
        const array = {
            "0": {
                fetch: `./assets/pages-es/${page}-page.json`
            },
            "1": {
                fetch: `./assets/json_Languages/languages.json`
            }
        }
        const response = await fetch((array[type]).fetch);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error)
    }

}


/**
 * @dec Simular el proceso de creacion de los componentes
*/
function change_info_page_lengauage(page, lang) {

    //crear el div padre
    if (checkMobile()) {
        element = $(`<div style='width: 100%; height: 100%;' id="content-inter-${page}" />`, { class: 'hard' });
    } else {
        element = $(`<div  style='width: 100%; height: 100%;' id="content-inter-${page}" />`, {});
    }

    if (page % 2 == 0) {
        element.addClass('even')
    } else {
        element.addClass('odd')
    }

    //Insertar html para saber en pagina se encuentra
    element.html('<div class="gradient"></div><div id=' + "pie-pagina-" + (page-1) + ' class="number-page" onclick=goPage(2)>' + (page-1) + '</div>');

    insert_img_background(page, element)

    if (lang !== 'es') { add_components_page(element, page, lang) } else { loadRegions(page, element, 'es') }

    return element

}



/**
 * @dec insertar imagen de fondo
*/
function insert_img_background(page, pageElement) {

    var img = $(`<img id="background-page-${page}" />`, { class: 'backPage' + page });

    img.mousedown(function (e) {
        e.preventDefault();
    });

    img.load(function () {

        // Set the size
        $(this).css({ width: '100%', height: '100%' });

        // Add the image to the page after loaded

        $(this).appendTo(pageElement);

        // Remove the loader indicator

        pageElement.find('.loader').remove();
    });

    // Load the page
    checkImage('../assets/pics/backgrounds/' + page + '.jpg', img, pageElement, page)

}

async function add_components_page(element, page, lang) {

    try {

        //sacar la informacion de la pagina
        json = await getPagesJson(5, 1);
        let data = (json[page])[lang]

        console.log(data)

        data.map((region) => {
            addRegion(region, element, 'es', page);
        })

    } catch (error) {
        console.log(error)
    }

}

const playAudio = (e) => {

    if (audio_array.length > 0) {

        audio_array.map((audio) => {
            audio.pause();
        })
        //eventos para quitar el audio
        audio_array = [];
        band_audio = true;
        $('.audio-img-content').removeClass('opacity-audio')

    }
    else if (band_audio) {

        var audio = new Audio(e);
        audio_actual = audio;
        $(audio).attr('id', 'audio-page')
        audio.play();
        band_audio = false;

        audio_array.push(audio)
        $('.audio-img-content').addClass('opacity-audio')

        //saber si el audio no ha terminado
        audio.addEventListener('ended', function () {
            $('.audio-img-content').removeClass('opacity-audio')
            band_audio = true;
            audio_array = [];
        }, false);

    }



}

function click_ul_li(e) {

    $('.read-more-box').removeClass('display-none')
    let array_data_class = ['1','2','3','4','5']
    if (array_data_class.includes(e)) {
    $('.read-more-content').addClass('height-auto')
    }
    //scroll 0
    $('.read-more-text').scrollTop(0)

    const array = { 
        
    }

    $('.read-more-text').html(array[e])

}

function event_click_accordion(e) {

    const array = {
       
    }
    
    if (!$(`#accordion-${e}`).hasClass('active-accordion')) {
        $(`#accordion-${e}`).addClass('active-accordion')
        $(`#accordion-${e}`).parent().append(array[e])
    } else {
        $(`#accordion-${e}`).removeClass('active-accordion')
        $(`#accordion-${e}`).parent().find('p').remove()
        $(`#accordion-${e}`).parent().find('ul').remove()
    }


}

function indice_event(e) {
    $('.magazine').turn('page', e);
}


function click_boton_a_spanish() {
    var URLhash = window.location.hash;
    window.location.href = "./index.html"+URLhash;

}

function click_boton_a_english() {
    var URLhash = window.location.hash;
    window.location.href = "./index-en.html"+URLhash;

}

/*CARUSEL*/
  
    function evento(e){

        var div1 = document.createElement("div");
        div1.className += 'content-modal modal-lg';

        var div2 = document.createElement("div");
        div2.className += "modal";

        var div3 = document.createElement("div");
        div3.className += "carousel-container";

        var button1= document.createElement("button");
        var button2= document.createElement("button");

        button1.className += "prev-btn-modal";
        button2.className += "next-btn-modal";

        const mostrar = $(e).data("id");
        const div = document.querySelector('#'+mostrar);
        const carousel = div.querySelector(".carousel-slide");
        const images = carousel.querySelectorAll('img');
        const prevBtn = document.querySelector('.prev-btn-modal');
        const nextBtn = document.querySelector('.next-btn-modal');

        const close = document.querySelector('.close-modal');

        div1.appendChild(div2);
        div1.appendChild(button1);
        div1.appendChild(button2);

        document.body.appendChild(div1);

        console.log(images);
        
        
        let index = 0;
        
        $("#"+mostrar).modal('show');
        
        function changeImage(n) {
            console.log(n);
            images[index].classList.remove('active');
            index = (n + images.length) % images.length;
            images[index].classList.add('active');
        } 

        prevBtn.addEventListener('click', () => {
            if(index>0){
                changeImage(index - 1);
            }
            
        });

        nextBtn.addEventListener('click', () => {

            if(index<images.length-1){
                changeImage(index + 1);
            }
            
        });

        /*close.addEventListener('click', () => {

            $('.content-modal').html("");
        });*/

    }

    
    




