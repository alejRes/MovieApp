export const postUpdateFilm = async(peli, id) => {
        try {
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body:JSON.stringify(peli)
            }
            console.log(options.body)
            const response = await fetch(`http://localhost:3000/apiAdmin/editMovie/${id}`,options)
            const result = await response.json()
            return result 

        } catch (error) {
            return error.message
        }
    }

export const postCreateFilm = async (peli)=>{
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify(peli)
        }
        console.log(options.body)
        const response = await fetch(`http://localhost:3000/apiAdmin/createMovie`,options)
        const result = await response.json()
        if(result.redirect){
            window.location.assign('/movies')
        }else{
            window.location.reload()
        }
        return result 

    } catch (error) {
        return error.message
    }
}

export const getMoviesList = async ()=>{

    const response = await fetch(`http://localhost:3000/apiAdmin/createList`)
    const result = await response.json()
    return result
    
}
export const paintList = ({Title, filmId})=>{
    let id = `${filmId}`
    console.log(id)
    let container = document.getElementById("listfilms")
    let div = document.createElement("div")
    let li = document.createElement("li")
    let txt = document.createTextNode(Title)
    let imgUpdate = document.createElement("img")
    imgUpdate.setAttribute("src","../public/images/edit.png")
    imgUpdate.setAttribute("id", id)
    let imgDelete = document.createElement("img")
    imgDelete.setAttribute("src","../public/images/delete.png")
    imgDelete.setAttribute("id",Title)
    li.appendChild(txt)
    div.appendChild(li)
    div.appendChild(imgUpdate)
    div.appendChild(imgDelete)
    container.appendChild(div)
    imgUpdate.addEventListener("click", updateFilm)
    imgDelete.addEventListener("click", deleteFilm)
}

const updateFilm = async (e)=>{
    const id = e.target.id
    window.location.assign(`http://localhost:3000/editmovie/${id}`)
    
}
const deleteFilm = (e)=>{

    const title = e.target.id
    
    const deletfilm = async (title)=>{
        console.log(title)
        const options = {
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json"
            }
        }
        console.log(options.body)
        const response = await fetch(`http://localhost:3000/apiAdmin/removeMovie/${title}`,options)
        location.reload()
    }

    let popup = document.createElement("section")
    let btnYes = document.createElement("button")
    let btnX = document.createElement("button")
    let btnCancel = document.createElement("button")
    btnYes.innerText = "Si"
    btnCancel.innerText= "Cancel"
    let imgX = document.createElement("img")
    imgX.setAttribute("src","../public/images/cancel.png")
    let p= document.createElement("p")
    p.innerText=`seguro que quieres eliminar ${title}`
    btnYes.addEventListener("click",()=> deletfilm(title))
    btnCancel.addEventListener("click",()=>{
        console.log("hola")
        document.body.removeChild(popup)} )
    btnX.addEventListener("click",()=>{document.body.removeChild(popup)})
    btnX.appendChild(imgX)
    popup.appendChild(p)
    popup.appendChild(btnYes)
    popup.appendChild(btnCancel)
    popup.appendChild(btnX)
    
    document.body.append(popup) 
    
}

export default {postUpdateFilm, getMoviesList, paintList}