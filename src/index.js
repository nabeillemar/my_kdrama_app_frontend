const k_dramasIndexPage = "http://localhost:3000/api/v1/k_dramas"

document.addEventListener("DOMContentLoaded", () => {   // We want to listen to the document, we are telling JS to listen to the document and... we want to listen for our DOMContent to be loaded 
    console.log("DOM LOADED")
    // fetch and load kdrama
    getKdramas()
    console.log("initally getting all the Kdramas with buttons") //bascially the first step the DOMContent Loaded event will do is render the data using this function 
    // listen for the "submit" event on form and handle data
   const createKdramaForm = document.querySelector("#create-kdrama-form") 
   createKdramaForm.addEventListener("submit", e => createFormHandler(e));
   // listen for the "click" event on form and handle data, we are searching the container because that is where the edit button is at


})


function getKdramas() { // we need create a function of this Get fetch request and add it to the DOMContentLoaded event 
    fetch(k_dramasIndexPage)
    .then(response => response.json())
    .then(kdramas => {
        kdramas.data.forEach(kdramas => { // this part is manipulating the data part //creating new instances of our kdramas using forEach 
            //debugger
            const newKdrama = new Kdrama(kdramas, kdramas.attributes)//creating new instances of our kdramas using forEach, goes to my constror in the kdrama.js file // this kdramas.attributes comes from the console, kdramas has access to attributes here  // this is how we create a new instance of our Kdrama class (this calls the kdrama.js) getting the data from API then parsing it json then passing to the kdrama class 
            document.querySelector('#kdramas-container').innerHTML += newKdrama.renderKdramaCard(); // finding the kdramas_container in the HTML and saying we want to update that container with all this markup code 
        })  
        //debugger
        document.querySelectorAll('.edit-btn').forEach( (button) => button.addEventListener('click', e => {
            console.log("edit button click within getKdramas")
            const id = parseInt(e.target.dataset.id); //this parses through the dataset that we clicked on and grabs the id 
            const kdrama = Kdrama.findById(id);
            document.querySelector('#update-kdrama').innerHTML += kdrama.renderUpdateForm();
            //document.querySelector('#update-kdrama').addEventListener('submit', e => updateFormHandler(e));
        }));
         document.querySelector('#update-kdrama').addEventListener('submit', e => updateFormHandler(e));
         console.log("UpdateFormHandler called from GetKdramas ")
         //debugger
        document.querySelectorAll(".delete-btn").forEach((btn) => btn.addEventListener("click", deleteItem))

     
    })
    
}

function deleteItem(e) {
    console.log("Delete Function Called")
    //debugger
    const id = parseInt(e.target.dataset.id);
    //debugger
    fetch(`http://localhost:3000/api/v1/k_dramas/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
        }
    })
      .then((res) => res.json())
      .then((kdrama) => {
          console.log("delete")
         //debugger
        document.querySelector(`#kdrama-${kdrama.id}`).remove()
      });
  }


function createFormHandler(e) { 
    console.log("Calling CreateFromHandler")
    e.preventDefault()
    const title = document.querySelector('#title').value 
    const comment = document.querySelector('#comment').value
    const cover_photo = document.querySelector('#cover_photo').value
    const categoryId = parseInt(document.querySelector('#categories').value) //the category id 
    const release_year = document.querySelector('#release_year').value
    const watched = document.querySelector('#watched').value
    const my_rating = document.querySelector('#my_rating').value
    const where_to_watch = document.querySelector('#where_to_watch').value
    //debugger
    postFetch(title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, categoryId)
}

function updateFormHandler(e) { 
    console.log("UPDATE FORMHANDLER CALLED")
    e.preventDefault()
    const id = parseInt(e.target.dataset.id);
    const kdrama = Kdrama.findById(id);
    const title = e.target.querySelector('#title').value 
    const comment = e.target.querySelector('#comment').value
    const cover_photo = e.target.querySelector('#cover_photo').value
    const category_id = parseInt(e.target.querySelector('#categories').value) //the category id 
    const release_year = e.target.querySelector('#release_year').value
    const watched = e.target.querySelector('#watched').value
    const my_rating = e.target.querySelector('#my_rating').value
    const where_to_watch = e.target.querySelector('#where_to_watch').value
    //debugger
    patchKdrama(kdrama, title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, category_id)
}

function patchKdrama(kdrama, title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, category_id){
    console.log("PATCH REQUEST CALLED")
    let bodyJSON = {title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, category_id }
    fetch(`http://localhost:3000/api/v1/k_dramas/${kdrama.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
             Accept: 'application/json', 
        },
        body: JSON.stringify(bodyJSON), // strining the data and passing the data 
    })
    .then(response => response.json())
    .then(updatedKdrama => {
        console.log(updatedKdrama);
        const newKdrama = new Kdrama(updatedKdrama.data, updatedKdrama.data.attributes)
       // debugger
        document.querySelector(`#kdrama-${kdrama.id}`).remove()
        console.log("old card deleted Within Patch Request")
       // debugger
        //debugger
        document.querySelector('#kdramas-container').innerHTML += newKdrama.renderKdramaCard()
        console.log("Updated Card added Within patch Request")
       // debugger
        const myDiv = parseInt(document.querySelector('#render-update-form').dataset.id.toString())
        if (myDiv == kdrama.id) {
            document.querySelector('#render-update-form').remove()
        }
        //debugger
        console.log("old update form removed within Patch Request")
        //debugger
        document.querySelectorAll('.edit-btn').forEach( (button) => button.addEventListener('click', e => {
            console.log("edit button click within patch Request")
        const id = parseInt(e.target.dataset.id); //this parses through the dataset that we clicked on and grabs the id 
        const kdrama = Kdrama.findById(id);
        document.querySelector('#update-kdrama').innerHTML += kdrama.renderUpdateForm();
        console.log("Update form rendered within Patch Request")

}));
    document.querySelectorAll(".delete-btn").forEach((btn) => btn.addEventListener("click", deleteItem));
    //debugger
    console.log("Does this work? kdrama form update ")
    document.getElementById("create-kdrama-form").reset();

    })
    .catch((error) => {
        debugger
        alert(error);
    });
}

/*    TODO
1. add Validations on Backend (COMPLETED)
2. Clear out Comments (ALMOST DONE)
3. Refactor 
4. See if you can get rid of the mulitple click sitation, bascially we can click the edit button multiple times (ASK TAO)
5. Ask Tao about .Catch Error messages
*/




function postFetch(title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, category_id) { 
    console.log("Calling PostFetch")
    //debugger
    console.log(title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, category_id);
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
        console.log(kdramas); // then console loging the response 
      const newKdrama = new Kdrama(kdramas.data, kdramas.data.attributes) // the kdramas object is different from what we had in the get object.. the issue was how the data was coming across need to be careful before it was kdramas.data.attributes , you need to look at the data don't make your life hard // also this gets connected to the create kdrama action controller. the Serializer matters here so we can get an nested array 
     // debugger
        document.querySelector('#kdramas-container').innerHTML += newKdrama.renderKdramaCard();
        console.log("Within PostFetch Rendering the Kdrama container with the new KdramaCard")

        document.querySelectorAll('.edit-btn').forEach( (button) => button.addEventListener('click', e => {
            console.log("edit button click within Post Fetch")
            const id = parseInt(e.target.dataset.id); //this parses through the dataset that we clicked on and grabs the id 
            const kdrama = Kdrama.findById(id);
            //debugger
            //debugger
            document.querySelector('#update-kdrama').innerHTML += kdrama.renderUpdateForm();
            console.log("Renders Update Form within Post Fetch")
            console.log("Calls UpdateFormHandler from POST FETCH")
        }));
        console.log("EDIT button Functionality with Post Fetch")

        document.querySelectorAll(".delete-btn").forEach((btn) => btn.addEventListener("click", deleteItem));
        console.log("Delete button Functionality with Post Fetch")
        document.getElementById("create-kdrama-form").reset();
        console.log("Resets the Create-form")
        //debugger 
     
    })
    .catch((error) => {
        debugger
        alert(error);
    });
 
}

