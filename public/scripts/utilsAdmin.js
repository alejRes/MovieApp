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

export const getMoviesList = async ()=>{

    const response = await fetch(`http://localhost:3000/createList`)
    const result = await response.json()
    return result
    
}
export const paintList = ({Title, _id})=>{
    
    let container = document.getElementById('listfilms')
    let div = document.createElement('div')
    let li = document.createElement('li')
    let txt = document.createTextNode(Title)
    let imgUpdate = document.createElement('img')
    imgUpdate.setAttribute('src','./public/images/edit.png')
    imgUpdate.setAttribute('id', _id)
    let imgDelete = document.createElement('img')
    imgDelete.setAttribute('src','./public/images/delete.png')
    imgDelete.setAttribute('id',Title)
    li.appendChild(txt)
    div.appendChild(li)
    div.appendChild(imgUpdate)
    div.appendChild(imgDelete)
    container.appendChild(div)
    imgUpdate.addEventListener('click', updateFilm)
    imgDelete.addEventListener('click', deleteFilm)
}

const updateFilm = async (e)=>{
    const id = e.target.id
    // await fetch(`http://localhost:3000/editMovie/${id}`,{method: 'GET'})
    window.location.href=`http://localhost:3000/editMovie/${id}`
    
}
const deleteFilm = (e)=>{
    const title = e.target.id
}

export default {postUpdateFilm, getMoviesList, paintList}