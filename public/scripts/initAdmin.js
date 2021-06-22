import  {getMoviesList, paintList}  from "./utils/utilsAdmin.js"

 (async function init (){

    const pelis = await getMoviesList()
    pelis.forEach(element => {       
         paintList(element)
    });
    
})()

