import dataDBmong from ('../../utils/dataDBmong.js')
document.getElementById('btnSU').addEventListener('click', async(e)=>{
    e.preventDefault()
    const form = document.querySelector('#CrUpFilm').elements
    const peli = {}
    for(let input of form){
        if(input.type !="button"){
            peli[input.name]=input.value
        }else
            let btnvalue = input.value
    }
    if(btnvalue === 'update'){

    }else{

    }
})