import  {getMoviesList, paintList}  from "./utilsAdmin.js"

const init = async ()=>{

    const pelis = await getMoviesList()
    pelis.forEach(element => {
        console.log(element)
        paintList(element)
    });
    
}

init()