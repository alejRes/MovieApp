const addFavorite = async (id)=>{
    let contain = document.getElementById(id).parentNode
    let img = document.getElementById(id)
    console.log(img.alt)
    if(img.alt != 'heartEmpty'){
        contain.removeChild(img)
        let imgfull = document.createElement('img')
        imgfull.setAttribute('src','../public/images/heartEmpty.svg')
        imgfull.setAttribute('class','normal')
        imgfull.setAttribute('id',id)
        imgfull.setAttribute('alt','heartEmpty')
        imgfull.setAttribute('onclick','addFavorite(id)')
        contain.appendChild(imgfull)
    }else{
        contain.removeChild(img)
        let imgEmpty = document.createElement('img')
        imgEmpty.setAttribute('src','../public/images/heartFull.svg')
        imgEmpty.setAttribute('class','normal')
        imgEmpty.setAttribute('id',id)
        imgEmpty.setAttribute('alt','heartFull')
        imgEmpty.setAttribute('onclick','addFavorite(id)')
        contain.appendChild(imgEmpty)
    }
    let favorite = {
        id: id,
        state: img.alt
    }
    const options = {
        
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(favorite)
    }
    await fetch ('http://localhost:3000/favorites', options)
}