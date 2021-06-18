import { getAllFilms  }  from './js/utils/data.js'
import { paintFilmCard, clearFilmCard} from './js/utils/paintFilm.js'


const init = async () =>{
    await clearFilmCard()
    const allProducts = await getAllFilms()
    allProducts.forEach((product) => paintFilmCard(product, false))
}

init()