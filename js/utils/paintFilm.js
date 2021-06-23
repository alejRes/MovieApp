import { getFilmDetail } from './utils/data.js'

export const paintCard = ({title, year, director, actors, plot, genre, poster, runtime, imdbRating}, detail) => {

    const cardsContainer = document.getElementById('cards-container')
    
    const card = document.createElement('div')
    detail && card.setAttribute('class', 'detail-card')

    const filmTitle = document.createElement('h2')
    filmTitle.innerText = `${title}`
    const filmYear = document.createElement('p')
    filmYear.innerText = `${year}`
    const filmDirector = document.createElement('p')
    filmDirector.innerText = `${director}`
    const filmActors = document.createElement('p')
    filmActors.innerText = `${actors}`
    const filmPlot = document.createElement('p')
    filmPlot.innerText = `${plot}`
    const filmGenre = document.createElement('p')
    filmGenre.innerText = `${genre}`
    const filmPoster = document.createElement('img')
    filmPoster.setAttribute('src', poster)
    const filmRuntime = document.createElement('p')
    filmRuntime.innerText = `${runtime}`
    const filmRating = document.createElement('p')
    filmRating.innerText = `${imdbRating}`
 

    //añado al div contenedor de cada tarjeta todos los nodos correspondientes a la información y la imagen
    card.appendChild(filmTitle)
    card.appendChild(filmYear)
    card.appendChild(filmDirector)
    card.appendChild(filmActors)
    card.appendChild(filmPlot)
    card.appendChild(filmGenre)
    card.appendChild(filmPoster)
    card.appendChild(filmRating)
    

    //añado un EventListener a la tarjeta para que me redirija a la vista detalle
    card.addEventListener('click', async () => {
        // Borrar todos los nodos dentro de cards-container
        clearCards()
        // Hacer una petición al servidor para obtener el detalle de un producto determinado
        //...
        const detail = await getFilmDetail(id)

        
        // Pintar el detalle del producto clickeado
        detail.forEach((film)=> paintCard(film, true))
    })
    
    // añado la tarjeta completa al contenedor de mi DOM
    cardsContainer.appendChild(card)
}

export const clearCards = () =>{
    const cardsContainer = document.getElementById('cards-container')
    cardsContainer.innerHTML = ''
}