import { postUpdateFilm } from './utils/utilsAdmin.js'

if (window.location.pathname != "/createMovie") {
    document.getElementById('btnSU').addEventListener('click', async (e) => {
        console.log('boton pulsado')
        e.preventDefault()
        let id = window.location.pathname.split("/")[2]
        let btnvalue;
        const form = document.querySelector('#CrUpFilm').elements
        const peli = {}
        for (let input of form) {
            input.type != "button" ? peli[input.name] = input.value : btnvalue = input.value
        }
        console.log(peli)
        postUpdateFilm(peli, id)
        /*else 
        postCreateFilm(peli) */
    })
}