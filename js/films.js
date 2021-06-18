import { postNewFilm, getMyFilms } from './utils/data.js'
import { paintCard, clearCards } from './utils/paintFilm.js'


document.getElementById("searchButton").addEventListener("click", async (e) => {
    e.preventDefault()
    const form = document.getElementById("form").elements
    const data = {}
    for (let input of form) {
        data[input.name] = input.value
    }
    console.log("data recogida del formulario", data)
    const postResponse = await postNewFilm(data);

    const myfilms = await getMyFilms()
    myfilms.data.forEach((film) => paintCard(film, false))

    clearCards()

})

const init = async () => {
    clearCards()
    const allFilms = await getMyFilms()
    console.log("lo que llega del fetch", allFilms)
    allFilms.data.forEach((film) => paintCard(film, false))
}

init()