const addComponents = (region, lang) => {

    var element;

    switch (region.tag) {
        case 'p':
            element = addSVG('<p style="font-size:' + region.fontSize + '" xmlns="http://www.w3.org/1999/xhtml">' + region.data.content + '</p>', region)
            break;

        case 'h1':
            element = addSVG('<h1 style="font-size:' + region.fontSize + '" xmlns="http://www.w3.org/1999/xhtml">' + region.data.content + '</h1>', region)
            break;

        case 'img':
            element = '<img src=' + region.data.src + '>'
            break;
        case 'div':
            element = addSVG('<div class="' + region.class + '">' + region.data.content + '</div>', region)
            break;
    
        case 'a':
            element = addSVG('<a class="' + region.class + '" href="' + region.data.href + '" target="blank_">' + region.data.content + '</div>', region)
            break;
    
        case 'inputs':
            element = addSVG('<div class="">' + region.data.content + '</div>', region)
            break;
    
        case 'section':
            element = addSVG('<div><img src=' + region.data.src + '><p style="font-size:' + region.fontSize + '" xmlns="http://www.w3.org/1999/xhtml">' + region.data.content + '</p></div>', region)
            break;

        case 'modal':
            element = $('<div/>', { class: 'content-modal modal-lg' }).append(
                $('<div/>', { id: region.id, class: 'modal texto modal-grande' }).append(
                    $('<div/>', { class: 'print-modal' }).html(region.data.print),
                    $('<div/>', { class: 'header-modal' }).append($('<h1/>', {}).html(region.data.title)),
                    $('<img>', { src: region.data.src, class: 'title-modal' }),
                    $('<div/>', { class: 'body-modal' }).append($('<p/>', { class: region.class }).html(region.data.content))),
                addSVG('<a ' + region.id + '" id="a-'+region.id+'" data-modal="'+region.id+'" onclick="abrirmodal(this)" class="button-magazine" xmlns="http://www.w3.org/1999/xhtml">'+region.text, region))
    
            break;

        case 'modal-pequeno':
            element = $('<div/>', { class: 'content-modal modal-lg' }).append(
                $('<div/>', { id: region.id, class: 'modal texto modal-pequeno' }).append(
                    $('<div/>', { class: 'print-modal' }).html(region.data.print),
                    $('<div/>', { class: 'header-modal' }).append($('<h1/>', {}).html(region.data.title)),
                    $('<img>', { src: region.data.src, class: 'title-modal' }),
                    $('<div/>', { class: 'body-modal' }).append($('<p/>', { class: region.class }).html(region.data.content))),
                addSVG('<a ' + region.id + '" id="a-'+region.id+'" data-modal="'+region.id+'" onclick="abrirmodal(this)" class="button-magazine" xmlns="http://www.w3.org/1999/xhtml">'+region.text, region))
    
            break;
        case 'modal-2':
            element = $('<div/>', { class: 'content-modal modal-lg' }).append(
                    $('<div/>', { id: region.id, class: 'modal imagenes' }).append(
                        $('<div/>', {class:'carousel-container'}),
                        $('<button/>', { id:region.id+'1', class: 'prev-btn-modal' }),
                        $('<button/>', { id:region.id+'2', class: 'next-btn-modal' }),
                        ))
        
            break;    
        case 'audio':
            element = $('<div/>', { class: 'content-audio' }).append(
                    addSVG('<a style="position:absolute;"class="button-magazine button-audio" id="button-' + region.id + '" xmlns="http://www.w3.org/1999/xhtml" onclick="showAudio(' + region.id + ')"><p style="font-size:' + region.fontSize + '">' + region.text + '</p><img src="' + region.icon + '"><a/>', region),
                    '<audio id="' + region.id + '" class="audioPage" controls = true src="' + region.data.src + '"></audio>')
            break;    
        case 'content-text':
            var recorrer = "";        
            for (x of region.data){
                    recorrer += x.titulo + x.autor + x.cargo + x.pagina 
            }
            
            element = '<div class="div-center-ubication-responsive">'+
                            '<div class="aux-class-content" style="width: 80%; height: 100%;' + region.styleBox +'">'+ 
                                '<span class="responsive-font-content" style="' + region.style + '">'+ recorrer +
                                '</span>'+
                            '</div>'+ 
                        '</div>'
            break;
        case 'contenido':
            element = (`<div class="div-center-ubication-responsive">
                            <div class='aux-class-content' style="width: 80%; height: 100%; ${region.styleBox}"> 
                                <span class="responsive-font-content" style="${region.style}" >
                                    ${(region.data).text}
                                </span> 
                            </div> 
                        </div>`)
            break;                 
        case 'share':
            element = '<a href="' + region.data.url + "" + doClick(region.data.page, lang) + '" target="blank" class="button-magazine" id="' + region.id + '" xmlns="http://www.w3.org/1999/xhtml"><div id="' + region.id + '"><img src="' + region.icon + '"></div></a>'
            break;
        case 'btn-normal':
            element = (`<div class="div-center-ubication-responsive"> <div class="div-center-two-icons-responsive" > ${`<a id="pause-video" style="cursor: pointer;" onClick="playvideo()">${region.icono}</a>`} </div> </div>`)
            break;
        case 'btn-normal-2':
            element = (`<div class="div-center-ubication-responsive"> <div class="div-center-two-icons-responsive" > ${`<a  style="cursor: pointer;" onClick="playAudio('${(region.data)[0].url},${(region.data[0].id)}')"><img id="${(region.data[0].id)}" class='audio-img-content' src="${(region.data)[0].icon}" ></a> <a class='img-tag-imprimir' href="${(region.data)[1].url}" target='_blank' ><img src="${(region.data)[1].icon}" ></a>`} </div> </div>`)
            break;
        case 'title-content':
            element = (`<div class="div-center-ubication-responsive"><span class="responsive-font" style="${region.style}" >${(region.data).text}</span></div>`)
            break;
        
        case 'botones-idomas':
            element = (`<div class="div-center-ubication-responsive"> <div style="gap: 0.5em;grid-template-columns: 33.3% 33.3% 33.3%;" class="div-center-two-icons-responsive" > ${`<a id="${(region.data)[0].id}" style="cursor: pointer;" onClick="clickLenguage('${(region.data)[0].id}')"><img src="${(region.data)[0].icon}" ></a> <a id="${(region.data)[1].id}" style="cursor: pointer;" onClick="clickLenguage('${(region.data)[1].id}')"><img src="${(region.data)[1].icon}" ></a> <a id="${(region.data)[2].id}" style="cursor: pointer;" onClick="clickLenguage('${(region.data)[2].id}')"><img src="${(region.data)[2].icon}" ></a>`} </div> </div>`)
            break;
        case 'img-content':
            element = (`<div class="div-center-ubication-responsive"> <img src="${region.data.src}" class='aux-img-class' style="width: 70%; height: 100%; object-fit: cover; ${region.style}"> </div>`)
            break;
        
        case 'img-content-2':
            element = (`<div class="div-center-ubication-responsive"> 
                            <div class="img-aux-page-12" style='display: grid; grid-template-rows: 5% 90% 5%; grid-template-columns: 100%;'> 
                                <div style='grid-row: 1; grid-column: 1; background-color: #9a211f;'></div>
                                <img src="${region.data.src}" class='aux-img-class' style="width: 70%; height: 100%; object-fit: cover; ${region.style}">
                                <div style='grid-row: 3; grid-column: 1; background-color: #9a211f; '></div>
                            </div>

                        </div>`)
            break;
        case 'btn-presidente':
            element = (`<div class="div-center-ubication-responsive">
                            <div style='${region.styleBox}'>
                              <a id='btn-presidente' style='width: 8em; border-radius: 0.7em; background-color: #9a211f;  font-size: 1em;'  onclick="click_autor('${''+region.iframe+''}')" >
                                 Ver Video
                              </a>
                            </div>
                        </div>`)
            break;
        case 'img-content-aux':
            element = (`<div class="div-center-ubication-responsive">
                           <div id='${region.id_aux}' style='width: 100%; display: grid; grid-template-rows: auto; grid-template-columns: 100%; align-items: center; justify-items: center;'> 
                              <img id="${region.data[0].id}" src="${region.data[0].src}" class='aux-img-class' style="width: 70%; height: 100%; object-fit: cover; ${region.style}">
                              <img id="${region.data[1].id}" src="${region.data[1].src}" class='aux-img-class' style="width: 70%; height: 100%; object-fit: cover; ${region.style}">
                            </div>
                        </div>`)
            break;
        case 'social-media':
            element = (`<div class="div-center-ubication-responsive"> <div style="gap: 0.5em;grid-template-columns: 33.3% 33.3% 33.3%;" class="div-center-two-icons-responsive" > ${`<a id="${(region.data)[0].id}" href="${(region.data)[0].url}${doClick((region.data)[0].page, lang)}" target='_blank' style="cursor: pointer;" ><img src="${(region.data)[0].icon}" ></a> <a id="${(region.data)[1].id}"   href="${(region.data)[1].url}${doClick((region.data)[1].page, lang)}" target='_blank' style="cursor: pointer;" ><img src="${(region.data)[1].icon}" ></a> <a id="${(region.data)[2].id}"  href="${(region.data)[2].url}${doClick((region.data)[2].page, lang)}" target='_blank' style="cursor: pointer;" ><img src="${(region.data)[2].icon}" ></a>`} </div> </div>`)
            break;
        case 'print':
            element = addSVG('<a href="' + region.data.url + '" class="button-magazine" target=1 xmlns="http://www.w3.org/1999/xhtml"><p style="font-size:' + region.fontSize + '">' + region.text + '</p><img src="' + region.icon + '"><a/>', region)
            break;
        case 'boton-author':
            element = (`<div class="div-center-ubication-responsive">
                            <a id="${region.id_1}" class='box-content-img-text' onclick="click_autor('${''+region.iframe+''}')" >
                                <div id="${region.id_2}" class='box-content-text-autor' style="${region.styleBoxText}" >
                                    <p class='author-class' id="${region.id_3}" style="${region.styleTextAutor}">${region.autor}</p>
                                </div>
                                <div id="${region.id_4}" style="${region.styleBoxImg}" class='circle-autor-img author-class'>
                                    <img id="${region.id_5}" src="${region.data.src}" style="width: 99% !important; height: 100%; object-fit: cover; ${region.styleImg}"> 
                                </div>
                            </a>
                        </div>`)
            break;
        case 'all-component':
            element = `${region.components}`;
            break;
        case 'formulario':
            element = (`
            <img class="form-icon" src="assets/pics/icons/preguntas_icono.webp">
            <form action="https://formsubmit.co/d65870144b043385d9cf46c3cb060e33" method="post">
            <ul>
             <li>
               <label for="name">Nombre:</label>
               <input type="text" id="name" name="user_name">
             </li>
             <li>
               <label for="city">Ciudad:</label>
               <input type="text" id="city" name="user_city">
             </li>
             <li>
               <label for="pais">Pais:</label>
               <input type="text" id="pais" name="user_pais">
             </li>
             <li>
               <label for="msg">Mensaje:</label>
               <textarea id="msg" name="user_message"></textarea>
             </li>
             <div id="html_element"></div>
             <input type="hidden" name="_captcha" value="false">         
             </ul>
             <button  type="submit">Enviar</button>
           </form>
           <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer>`)
            break;

        case 'wordsGame':
            element = ($('<div />', { 'class': 'div-words div-center-ubication-responsive' }).html("<div id='puzzle'> </div>" +
                "<div id='words'></div>" +
                "<div id='wordsButton'><button class='buttonsGame' id='solve'>Resolver</button><button class='buttonsGame' id='clean'>Reiniciar</button></div>"
                +"<div id='wordsButtonImprimir'><a href='#' target='_blank'><img src='./assets/pics/icons/iconImprimir.png'></a></div>"))
            break;  
        case 'select-juego':

            element = (`<div class="divGameDrop">
                            <div class="divPistas">
                                <div class="columnA">
                                    <h1>${region.data[0].titulo}</h1>
                                </div>
                                <div class="pista">
                                    <p style="text-align: center;">${region.data[0].pista1}</p>
                                </div>
                                <div class="pista">
                                    <p style="text-align: center;">${region.data[0].pista2}</p>
                                </div>
                                <div class="pista">
                                    <p style="text-align: center;">${region.data[0].pista3}</p>
                                </div>
                                <div class="pista">
                                    <p style="text-align: center;">${region.data[0].pista4}</p>
                                </div>
                                <div class="pista">
                                    <p style="text-align: center;">${region.data[0].pista5}</p>
                                </div>
                                <div class="pista">
                                    <p style="text-align: center;">${region.data[0].pista6}</p>
                                </div>
                            </div>
                            <div class="divWords">
                                <div class="columnB">
                                    <h1>${region.data[1].titulo}</h1>
                                </div>
                                <select id="word1" class="selectGame" onchange="conectar_mexico()">
                                    <option value="0" selected="">${region.data[1].text}</option>
                                    <option value="1">${region.data[1].respuesta1}</option>
                                    <option value="2">${region.data[1].respuesta2}</option>
                                    <option value="3">${region.data[1].respuesta3}</option>
                                    <option value="4">${region.data[1].respuesta4}</option>
                                    <option value="5">${region.data[1].respuesta5}</option>
                                    <option value="6">${region.data[1].respuesta6}</option>
                                </select>
                                <select id="word2" class="selectGame" onchange="conectar_colombia()">
                                    <option value="0" selected="">${region.data[1].text}</option>
                                    <option value="1">${region.data[1].respuesta1}</option>
                                    <option value="2">${region.data[1].respuesta2}</option>
                                    <option value="3">${region.data[1].respuesta3}</option>
                                    <option value="4">${region.data[1].respuesta4}</option>
                                    <option value="5">${region.data[1].respuesta5}</option>
                                    <option value="6">${region.data[1].respuesta6}</option>
                                </select>
                                <select id="word3" class="selectGame" onchange="conectar_japon()">
                                    <option value="0" selected="">${region.data[1].text}</option>
                                    <option value="1">${region.data[1].respuesta1}</option>
                                    <option value="2">${region.data[1].respuesta2}</option>
                                    <option value="3">${region.data[1].respuesta3}</option>
                                    <option value="4">${region.data[1].respuesta4}</option>
                                    <option value="5">${region.data[1].respuesta5}</option>
                                    <option value="6">${region.data[1].respuesta6}</option>
                                </select>
                                <select id="word4" class="selectGame" onchange="conectar_cambodia()">
                                    <option value="0" selected="">${region.data[1].text}</option>
                                    <option value="1">${region.data[1].respuesta1}</option>
                                    <option value="2">${region.data[1].respuesta2}</option>
                                    <option value="3">${region.data[1].respuesta3}</option>
                                    <option value="4">${region.data[1].respuesta4}</option>
                                    <option value="5">${region.data[1].respuesta5}</option>
                                    <option value="6">${region.data[1].respuesta6}</option>
                                </select>
                                <select id="word5" class="selectGame" onchange="conectar_costa_rica()">
                                    <option value="0" selected="">${region.data[1].text}</option>
                                    <option value="1">${region.data[1].respuesta1}</option>
                                    <option value="2">${region.data[1].respuesta2}</option>
                                    <option value="3">${region.data[1].respuesta3}</option>
                                    <option value="4">${region.data[1].respuesta4}</option>
                                    <option value="5">${region.data[1].respuesta5}</option>
                                    <option value="6">${region.data[1].respuesta6}</option>
                                </select>
                                <select id="word6" class="selectGame" onchange="conectar_chile()">
                                    <option value="0" selected="">${region.data[1].text}</option>
                                    <option value="1">${region.data[1].respuesta1}</option>
                                    <option value="2">${region.data[1].respuesta2}</option>
                                    <option value="3">${region.data[1].respuesta3}</option>
                                    <option value="4">${region.data[1].respuesta4}</option>
                                    <option value="5">${region.data[1].respuesta5}</option>
                                    <option value="6">${region.data[1].respuesta6}</option>
                                </select>
                            </div>
                        </div>
                        `)
            break;
        case 'botones-conectar':
                element = (`<div id='select-game'>
                            <button class='select-Game' onclick="conectar_resolver()">RESOLVER</button>
                            <button class='select-Game' onclick="conectar_reiniciar()">REINICIAR</button>
                        </div>`);
            break;    
        case 'tooltip':
            element = $('<a/>', {}).append(
                    addSVG('<p class="main-text" style="font-size:' + region.fontSize + '" xmlns="http://www.w3.org/1999/xhtml"><img class="main-img" src=' + region.data.src + '></p>', region),
                    addSVG('<div class="content-tooltip"><span id=' + region.id + ' class="span-content"><div class="content-img"><img src=' + region.data.src + ' class="img-content"></div><p style="font-size:' + region.fontSize + '" class="text-content">' + region.data.author + '<br>' + region.data.position + '<br>' + region.data.year + '</p></span></div>', region))
            break;     
            
        case 'portada':
            element = (`<div class="page">
                <div id="animatedBackground"></div>
                <img src="assets/pics/portada/portada_fondo.png" alt="">
                <img src="${region.url}" alt="">
            </div>`);
            break; 
        case 'imageIdex':
            element = `<div class="index-image">
                <img src="assets/pics/general-images/top-index.jpg" alt="">
            </div>`;
            break; 
        case 'page-4-title':
            element = `<div class="page-4-title">
                <h2>Carta del <br>Obispo presidente</h2>
                <h1>SAMUEL VALVERDE</h1>
            </div>`;
            break; 
        case 'author-pic':
            element = (`<div class="page-3-title">
                    ${region.image}
            </div>`);
            break;
        case 'author-pic-2':
            let imagens = region.imagenes_evento
                if(imagens != undefined){
                    imagens = JSON.stringify(region.imagenes_evento)
                }
            element = (`<div class="page-3-title">
                <button  class="evento_abrir" data-id="${region.id}" data-imagenes='${imagens}' onclick="evento(this)">${region.image}</button>
            </div>`);
            break;
        case 'video-emb':
            element = (`${region.url}`);
            break;

        case 'img-2':
            if(region.lang == "esp"){
                element = '<a href="./index.html#pagina/'+region.data.pagina +'"> <img src=' + region.data.src + '></a>'
            }else{
                element = '<a href="./index-en.html#pagina/'+region.data.pagina +'"> <img src=' + region.data.src + '></a>'
            }
            
            break;         
            
        case 'event-container':
                let imagenes = region.imagenes_evento
                if(imagenes != undefined){
                    imagenes = JSON.stringify(region.imagenes_evento)
                }
                element = `<div class="event-container">
                    <div class="image">
                        <button  class="evento_abrir" data-id="${region.id}" data-imagenes='${imagenes}' onclick="evento(this)"><img src="${region.src}"></button>
                    </div>
                    <h3 class="text">${region.text}</h3>
                </div>`;
            
            break;
        case 'event-container-2':
            element = `<div class="event-container">
                <div class="image">
                    <img src="${region.src}">
                </div>
                <h3 class="text">${region.text}</h3>
            </div>`;
        
        break;      
        case 'event-title':
            element = `<div class="event-title">
                <p><strong>${region.text1}</strong>${region.text2}</p>
            </div>`;
            break; 
        case 'event-subtitle':
            element = `<div class="event-subtitle">
                <p>${region.text}</p>
            </div>`;
            break; 
        case  'img_container':
            element = `<div id='${region.id}' style="${region.styles}" class="img_container"> 
                            <img style="${region.style_img}" src="${region.src}">
                      </div>`
            break;
        case 'html_pure': 
            element = region.html
            break;
        case  'answer-container':
            /*var datos="";
            var contador=2;
            for(x of region.respuestas){
                datos += '<li class="item">'+
                            '<div class="top">'+
                                '<strong>'+x.pregunta+'</strong>'+
                            '</div>'+
                            '<div class="bottom-container">'+
                                '<p id="button-'+contador+'">'+x.respuesta+'</p>'+
                            '</div>'+
                           '<div class="action">'+
                                    '<button id="boton-ocultar'+contador+'" class="answer-button" onclick="texto_completo('+contador+')">'+
                                        '<img style="width: 100px" src="assets/pics/icons/iconos_leermas2.png">'+
                                    '</button>'+
                                '</div>'+    
                        '</li>';
                contador++;        
            }*/      
            element = `<ul id="answer-container"></ul>`
            break;
        case 'video-fondo': 
            element = `<video autoplay muted loop playsinline preload="auto" webkit-playsinline id="video-background">
                            <source src="${region.src}" type="video/webm">
                        </video>`
            break;
        case 'fdv-element1':
            let videos = region.imagenes_evento
            if(videos != undefined){
                videos = JSON.stringify(region.imagenes_evento)
            } 
            element = `<div>
                            <div class="left">
                                <h1>${region.title}</h1>
                                ${region.texthtml}
                            
                            </div>
                            <div class="right">
                                <h3>${region.date}</h3>
                                <div class="action">
                                    <button data-id="${region.id}" data-imagenes='${videos}' onclick="evento(this)" class="video-button">
                                        Ver Fotos
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
            `
            break;
        case 'fdv-element1-2': 
            element = `<div>
                        <div class="left">
                            <h1>${region.title}</h1>
                            ${region.texthtml}
                        </div>
                        <div class="right">
                            <h3>${region.date}</h3>
                        </div>
                    </div>`
                break;
        case 'fdv-element2':
            let imagenesfdv = region.imagenes_evento
            if(imagenesfdv != undefined){
                imagenesfdv = JSON.stringify(region.imagenes_evento)
            }
            let boton = ""; 
            if(region.leermas != undefined){
                boton = `<button  data-modal="${region.idtext}" onclick="abrirmodal(this)">${region.leermas}</button>`;
            }
            element = `<div>
                            <div class="left">
                                <h1>${region.title}</h1>
                                ${region.texthtml}
                                <div class="action">
                                    <button data-id="${region.id}" class="video-button" data-imagenes='${imagenesfdv}' onclick="evento(this)">
                                        Ver Fotos
                                    </button>
                                    ${boton}
                                </div>
                            </div>
                            <div class="right">
                                <img src="${region.src}">
                            </div>
                        </div>`
            break;
        case 'fdv-logo': 
            element = `<div>
                            <img style="width: 20px" src="assets/pics/icons/fdvLogo.png">
                            <p> FDV GLOBAL</p>
                        </div>
            `
            break;

        case 'fdv-background': 
            element = `<div class="fondo-azul"></div>`
            break;

        case 'top-entrevista': 
            element = `<div class="top-entrevista">
                    ${region.text}            
                </div>`
            break;
        case 'pastor-name': 
            element = `<div class="pastor-name">
                    <p>${region.text}</p>            
                </div>`
            break;
        default:
            break;
            
    }

    return element
}


const addSVG = (content, region) => {
    return "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 " + region.viewX + " " + region.viewY + "' style='overflow: visible;' xml:space=''><foreignObject  width='100%' height='100%' style='overflow:visible;'>" + content + "</foreignObject></svg>"
}


