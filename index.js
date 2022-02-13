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
    const cover_photo = document.querySelector('#cover_photo').value
    const categoryId = parseInt(document.querySelector('#categories').value) //the category id 
    const release_year = document.querySelector('#release_year').value
    const watched = document.querySelector('#watched').value
    const my_rating = document.querySelector('#my_rating').value
    const where_to_watch = document.querySelector('#where_to_watch').value
    postFetch(title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, categoryId)
}


function postFetch(title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, category_id) { // can name whatever we want here but make sure they are in order 
    // confirm these values are coming through properly
    console.log(title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, category_id);
    // build body object
    let bodyData = {title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, category_id}
    //debugger
    fetch(k_dramasIndexPage, {
      // POST request, the verb is different rails is routing us to the create action it has the same endpoint, index and create share same endpoint but different HTTP verb
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bodyData) // strining the data and passing the data 
    })
    .then(response => response.json()) // get the response and parsing to JSON
    .then(kdramas => {
     // console.log(kdramas); // then console loging the response 
      //debugger
      const kdramasData = kdramas // the kdramas object is different from what we had in the get object.. the issue was how the data was coming across need to be careful before it was kdramas.data.attributes , you need to look at the data don't make your life hard
      //debugger
    // render JSON response
        const kdramasMarkup =`
        <div data-id=${kdramas.id}>
        <img src=${kdramasData.cover_photo} height="450" width="450">
        <h3>${kdramasData.title}</h3>
        <p> ${kdramasData.release_year}<p>
        <p> ${kdramasData.where_to_watch}<p>
        <p> ${kdramasData.my_rating}<p>
        <p> ${kdramasData.comment}<p>
        <p> ${kdramasData.category}<p>
        <p> ${kdramasData.watched}<p>
        <button data=id${kdramasData.id}>edit</button>
        </div>
        <br></br>`;

        document.querySelector('#kdramas-container').innerHTML += kdramasMarkup;
     
    })
}

// :title, :release_year, :watched, :where_to_watch, :cover_photo, :my_rating, :comment, :category_id, :category



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