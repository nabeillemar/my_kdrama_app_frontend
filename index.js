const k_dramasIndexPage = "http://localhost:3000/api/v1/k_dramas"

document.addEventListener("DOMContentLoaded", () => {   // We want to listen to the document, we are telling JS to listen to the document and... we want to listen for our DOMContent to be loaded 
   console.log("DOM LOADED")
    getKdramas() //bascially the first step the DOMContent Loaded event will do is render the data using this function 

   const createKdramaForm = document.querySelector("#create-kdrama-form") 

   createKdramaForm.addEventListener("submit", (e) => createFormHandler(e))

})



function getKdramas() { // we need create a function of this Get fetch request and add it to the DOMContentLoaded event 
    fetch(k_dramasIndexPage)
    .then(response => response.json())
    .then(kdramas => {
        kdramas.data.forEach(kdramas => { // this part is manipulating the data part 
            //debugger
            const kdramasMarkup =` 
            <div data-id=${kdramas.id}>
            <img src=${kdramas.attributes.cover_photo} height="450" width="450">
            <h3>${kdramas.attributes.title}</h3>
            <p> ${kdramas.attributes.release_year}<p>
            <p> ${kdramas.attributes.where_to_watch}<p>
            <p> ${kdramas.attributes.my_rating}<p>
            <p> ${kdramas.attributes.comment}<p>
            <p> ${kdramas.attributes.category.name}<p>
            <p> ${kdramas.attributes.watched}<p>
            <button data=id${kdramas.id}>edit</button>
            </div>
            <br></br>`;

            document.querySelector('#kdramas-container').innerHTML += kdramasMarkup // finding the kdramas_container in the HTML and saying we want to update that container with all this markup code 
        })  

    })
}


function createFormHandler(e) { // not working? what kind of fetch do we want to make? grabbing all the values for our inputs 
    e.preventDefault()
    const title = document.querySelector('#title').value // how does this get connected to the form updated ? 
    const comment = document.querySelector('#comment').value
    const coverPhoto = document.querySelector('#cover_photo').value
    const category = document.querySelector('#categories').value
    const categoryId = parseInt(category) //the category id 
    postFetch(title, comment, coverPhoto, categoryId)
}

function postFetch(title, comment, cover_photo, category_id) { // can name whatever we want here but make sure they are in order 
    console.log();

}





/*
function getKdramas() { // we need create a function of this Get fetch request and add it to the DOMContentLoaded event 
    fetch(k_dramasIndexPage)
    .then(response => response.json())
    .then(kdramas => console.log(kdramas)); //we can still call the json a different name as well 

}





/* this way of adding everything to the DOMContentLoaded is not good because it is not DRY 
document.addEventListener("DOMContentLoaded", () => {   // We want to listen to the document, we are telling JS to listen to the document and... we want to listen for our DOMContent to be loaded 
    fetch(k_dramasIndexPage) // Once this listens to the document being loaded we want to make a GET request to the index page, fetch returns a promise, in that promise there is a response that we can parse 
    .then(response => response.json) // this get the response that the fetch gave us through the promise and we convert it to json , we are parsing the response to json 
    .then(kdramas => { // get access to the json data, we can name it whatever we want but it should make sense, we should get an array of kdramas back 
        console.log(kdramas); 
    })
    // we can add a .catch() here 
}) //
*/