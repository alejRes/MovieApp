//const fetchtoMongo =require('../../utils/dataDBmong.js')
import postUpdateFilm from './dataDBmong.js'
document.getElementById('btnSU').addEventListener('click', async(e)=>{
    console.log('boton pulsado')
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