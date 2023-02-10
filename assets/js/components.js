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

        case 'modal':
            element = $('<div/>', { class: 'content-modal' }).append(
                $('<div/>', { id: region.id, class: 'modal' }).append(
                    $('<div/>', { class: 'header-modal' }).append($('<h1/>', {}).html(region.data.title)),
                    $('<div/>', { class: 'body-modal' }).append($('<p/>', { class: region.class }).html(region.data.content))),
                addSVG('<a href="#' + region.id + '" rel="modal:open" class="button-magazine" xmlns="http://www.w3.org/1999/xhtml"><p style="font-size:' + region.fontSize + '">' + region.text + '</p><img src="' + region.icon + '"><a/>', region))

            break;
        case 'content-text':
            var recorrer = "";        
            for (x of region.data){
                    recorrer += x.titulo + x.autor + x.cargo + x.pagina 
            }
            
            element = '<div class="div-center-ubication-responsive">'+
                            '<div class="aux-class-content" style="width: 80%; heiht: 80%;' + region.styleBox +'">'+ 
                                '<span class="responsive-font-content" style="' + region.style + '">'+ recorrer +
                                '</span>'+
                            '</div>'+ 
                        '</div>'
            break;
        case 'contenido':
            element = (`<div class="div-center-ubication-responsive">
                            <div class='aux-class-content' style="width: 80%; heiht: 80%; ${region.styleBox}"> 
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
            element = (`<div class="div-center-ubication-responsive"> <a id="${region.id}" onclick="clickReadMore('+${region.id}+')" style="background-color: ${region['background-color']}; z-index: 1000;" class='btn-normal-23'   target="_blank" id="${region.id}"><span style="color: ${region.color}; font-size: ${region['font-size']}" class="boton-normal-text-23">${(region.data).text}</span></a> </div>`)
            break;
        case 'btn-normal-2':
            element = (`<div class="div-center-ubication-responsive"> <div class="div-center-two-icons-responsive" > ${`<a style="cursor: pointer;" onClick="playAudio('${(region.data)[0].url}')"><img class='audio-img-content' src="${(region.data)[0].icon}" ></a> <a class='img-tag-imprimir' href="${(region.data)[1].url}" target='_blank' ><img src="${(region.data)[1].icon}" ></a>`} </div> </div>`)
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
                       
        case 'wordsGame':
            element = ($('<div />', { 'class': 'div-words div-center-ubication-responsive' }).html("<div id='puzzle'> </div>" +
            "<div id='words'></div>" +
            "<div id='wordsButton'><button class='buttonsGame' id='solve'>Resolver</button><button class='buttonsGame' id='clean'>Reiniciar</button></div>"))
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
            element = (`<form action="/my-handling-form-page" method="post">
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
             <button  type="submit">Enviar</button>
            </ul>
           </form>`)
            break;                            
        default:
            break;
    }

    return element
}


const addSVG = (content, region) => {
    return "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 " + region.viewX + " " + region.viewY + "' style='overflow: visible;' xml:space=''><foreignObject  width='100%' height='100%' style='overflow:visible;'>" + content + "</foreignObject></svg>"
}
