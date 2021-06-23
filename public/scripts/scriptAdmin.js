import { postUpdateFilm, postCreateFilm } from './utils/utilsAdmin.js'


    document.getElementById('btnSU').addEventListener('click', async (e) => {
        console.log('boton pulsado')
        e.preventDefault()
        console.log(e.target.value)
        let id = window.location.pathname.split("/")[2]
        let btnvalue =e.target.value;
        const form = document.querySelector('#formAdmin').elements
        const peli = {}
        for (let input of form) {
            input.type != "button" ? peli[input.name] = input.value : btnvalue = input.value
        }
        console.log(peli)
        if(btnvalue=="update")
            postUpdateFilm(peli, id)
        else 
            postCreateFilm(peli)    
    })