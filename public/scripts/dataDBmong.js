export const postUpdateFilm = async(peli, id) => {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body:JSON.stringify( peli)
            }
            console.log(options.body)
            const response = await fetch(`http://localhost:3000/editMovie/${id}`,options)
            const result = await response.json()
            return result 

        } catch (error) {
            alert(error)
        }
    }



export default postUpdateFilm
