import {postUpdateFilm} from './utilsAdmin.js'

document.getElementById('btnSU').addEventListener('click', async(e)=>{
    
    e.preventDefault()
    let id = window.location.pathname.split("/")[2]
    let btnvalue;
    const form = document.querySelector('#CrUpFilm').elements
    const peli = {}
    for(let input of form){
        input.type !="button"?peli[input.name]=input.value:    btnvalue = input.value
    }
    if(btnvalue === 'update'){
        postUpdateFilm(peli, id)
    }
})