const BASE_URL = 'http://localhost:3000/'

export const getAllFilms = async() =>{
    const response = await fetch(`${BASE_URL}/search`)
    const results = await response.json()
    console.log(results)
    return results
}

export const getFilmDetail = async(title) =>{
    const response = await fetch(`${BASE_URL}/search/${title}`)
    const result = await response.json()
    console.log(result)
    return result
}

export const getMyFilms = async() =>{
    const response = await fetch(`${BASE_URL}/movies`)
    const result = await response.json()
    return result
}

export const postNewFilm = async(film) => {
    try {
        const options = {
            method: 'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(film)
        }
        const response = await fetch(`${BASE_URL}/search`, options)
        const result = await response.json()
            return result
        
    } catch (error) {
        alert(error)
    }
    console.log(result)
}