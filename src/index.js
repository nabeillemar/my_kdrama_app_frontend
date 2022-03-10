// need to add the automatic refresh button after load pages 

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
   /*
   const kdramaContainer = document.querySelector('#kdramas-container')
   kdramaContainer.addEventListener('click', e => {
       const id = parseInt(e.target.dataset.id); //this parses through the dataset that we clicked on and grabs the id 
       //kdrama = Kdrama.all
       //kdrama.find(x => x.id == id)
       const kdrama = Kdrama.findById(id);
       console.log(kdrama)
       //debugger
       document.querySelector('#update-kdrama').innerHTML += kdrama.renderUpdateForm();
      // document.querySelector('#update-kdrama').addEventListener('submit', e => updateFormHandler(e));
   });
    document.querySelector('#update-kdrama').addEventListener('submit', e => updateFormHandler(e));
   // document.querySelectorAll(".delete-btn").forEach((btn) => btn.addEventListener("click", deleteItem));
*/


})


function getKdramas() { // we need create a function of this Get fetch request and add it to the DOMContentLoaded event 
    fetch(k_dramasIndexPage)
    .then(response => response.json())
    .then(kdramas => {
        kdramas.data.forEach(kdramas => { // this part is manipulating the data part //creating new instances of our kdramas using forEach 
            //debugger
            const newKdrama = new Kdrama(kdramas, kdramas.attributes)//creating new instances of our kdramas using forEach, goes to my constror in the kdrama.js file // this kdramas.attributes comes from the console, kdramas has access to attributes here  // this is how we create a new instance of our Kdrama class (this calls the kdrama.js) getting the data from API then parsing it json then passing to the kdrama class 
            //render(kdramas)
            /*//debugger // manipulating the DOM  below
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
            */
            document.querySelector('#kdramas-container').innerHTML += newKdrama.renderKdramaCard(); // finding the kdramas_container in the HTML and saying we want to update that container with all this markup code 
        })  
        //debugger
        document.querySelectorAll('.edit-btn').forEach( (button) => button.addEventListener('click', e => {
            console.log("edit button click within getKdramas")
            const id = parseInt(e.target.dataset.id); //this parses through the dataset that we clicked on and grabs the id 
            //kdrama = Kdrama.all
            //kdrama.find(x => x.id == id)
            const kdrama = Kdrama.findById(id);
            //debugger
            //console.log(kdrama)
            //debugger
            document.querySelector('#update-kdrama').innerHTML += kdrama.renderUpdateForm();
            //document.querySelector('#update-kdrama').addEventListener('submit', e => updateFormHandler(e));
        }));
         document.querySelector('#update-kdrama').addEventListener('submit', e => updateFormHandler(e));
         console.log("UpdateFormHandler called from GetKdramas ")
         //debugger
        document.querySelectorAll(".delete-btn").forEach((btn) => btn.addEventListener("click", deleteItem))

     
    })
    
}

/*
function render(kdramas) {
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

            document.querySelector('#kdramas-container').innerHTML += kdramasMarkup

}
*/

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
        //kdrama.target.parentElement.remove();
        document.querySelector(`#kdrama-${kdrama.id}`).remove()
      });// how do I refresh this?
  }

/*
  .then(response => response.json())
  .then(updatedKdrama => {
      console.log(updatedKdrama);
      const newKdrama = new Kdrama(updatedKdrama.data, updatedKdrama.data.attributes)

      document.querySelector(`#kdrama-${kdrama.id}`).remove()
      document.querySelector('#kdramas-container').innerHTML += newKdrama.renderKdramaCard()
      */


function createFormHandler(e) { // not working? what kind of fetch do we want to make? grabbing all the values for our inputs 
    console.log("Calling CreateFromHandler")
    e.preventDefault()
    const title = document.querySelector('#title').value // how does this get connected to the form updated ? 
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

function updateFormHandler(e) { // not working? what kind of fetch do we want to make? grabbing all the values for our inputs 
    console.log("UPDATE FORMHANDLER CALLED")
    e.preventDefault()
    const id = parseInt(e.target.dataset.id);
    const kdrama = Kdrama.findById(id);
    const title = e.target.querySelector('#title').value // how does this get connected to the form updated ? 
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
        //document.querySelector('#update-kdrama').remove()
       // let id = kdrama.id
        //debugger
        document.querySelector('#kdramas-container').innerHTML += newKdrama.renderKdramaCard()
        console.log("Updated Card added Within patch Request")
       // debugger
        const myDiv = parseInt(document.querySelector('#render-update-form').dataset.id.toString())
        if (myDiv == kdrama.id) {
            document.querySelector('#render-update-form').remove()
        }
        //debugger
        console.log("old update form removed within Patch Request")// after this it still shows the render-update-form in the console
       // debugger // can't reset update form becuase it just resets to previous values, does not CLEAR or Re-render the form, 
        // this current way you can only edit once back to back you can't edit it twice back to back 
        // also when I added the data below, it allows to mulitple clicks on the edit and delete button 
        // first time I submit edit button it works, 2nd time I click it it it pulls up the previous one values, still submits, 3rd time the edit and delete button don't work 
        // TYPEERROR cannot read properties of null 
  // how to I refresh this?
        //debugger
        document.querySelectorAll('.edit-btn').forEach( (button) => button.addEventListener('click', e => {
            console.log("edit button click within patch Request")
        const id = parseInt(e.target.dataset.id); //this parses through the dataset that we clicked on and grabs the id 
        //kdrama = Kdrama.all
        //kdrama.find(x => x.id == id)
        const kdrama = Kdrama.findById(id);
        //debugger
        //console.log(kdrama)
        //debugger
        document.querySelector('#update-kdrama').innerHTML += kdrama.renderUpdateForm();
        console.log("Update form rendered within Patch Request")
        //debugger
        //document.querySelector('#update-kdrama').addEventListener('submit', e => updateFormHandler(e));

}));
    document.querySelectorAll(".delete-btn").forEach((btn) => btn.addEventListener("click", deleteItem));
    //debugger
    console.log("Does this work? kdrama form update ")
    document.getElementById("create-kdrama-form").reset();

    })
}

/*    TODO
1. add Validations on Backend 
2. Clear out Comments
3. Refactor 
4. See if you can get rid of the mulitple click sitation, bascially we can click the edit button multiple times 
5. 
*/

function postFetch(title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, category_id) { // can name whatever we want here but make sure they are in order 
    // confirm these values are coming through properly
    console.log("Calling PostFetch")
    //debugger
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
        console.log(kdramas); // then console loging the response 
      //debugger
      //const kdramasData = kdramas.data
      const newKdrama = new Kdrama(kdramas.data, kdramas.data.attributes) // the kdramas object is different from what we had in the get object.. the issue was how the data was coming across need to be careful before it was kdramas.data.attributes , you need to look at the data don't make your life hard // also this gets connected to the create kdrama action controller. the Serializer matters here so we can get an nested array 
     // debugger
    // render JSON response
        //render(kdramasData)
        /*const kdramasMarkup =`
        <div data-id=${kdramas.id}>
        <img src=${kdramasData.attributes.cover_photo} height="450" width="450">
        <h3>${kdramasData.attributes.title}</h3>
        <p> ${kdramasData.attributes.release_year}<p>
        <p> ${kdramasData.attributes.where_to_watch}<p>
        <p> ${kdramasData.attributes.my_rating}<p>
        <p> ${kdramasData.attributes.comment}<p>
        <p> ${kdramasData.attributes.category.name}<p>
        <p> ${kdramasData.attributes.watched}<p>
        <button data=id${kdramasData.id}>edit</button>
        </div>
        <br></br>`;
        */
        document.querySelector('#kdramas-container').innerHTML += newKdrama.renderKdramaCard();
        console.log("Within PostFetch Rendering the Kdrama container with the new KdramaCard")
        //window.location.reload();

        document.querySelectorAll('.edit-btn').forEach( (button) => button.addEventListener('click', e => {
            console.log("edit button click within Post Fetch")
            const id = parseInt(e.target.dataset.id); //this parses through the dataset that we clicked on and grabs the id 
            //kdrama = Kdrama.all
            //kdrama.find(x => x.id == id)
            const kdrama = Kdrama.findById(id);
            //debugger
            //debugger
            document.querySelector('#update-kdrama').innerHTML += kdrama.renderUpdateForm();
            console.log("Renders Update Form within Post Fetch")
            //debugger
            //document.querySelector('#update-kdrama').addEventListener('submit', e => updateFormHandler(e));
            console.log("Calls UpdateFormHandler from POST FETCH")
        }));
        console.log("EDIT button Functionality with Post Fetch")


        //let id = kdrama.id
         //document.querySelector('#update-kdrama').addEventListener('submit', e => updateFormHandler(e));
        document.querySelectorAll(".delete-btn").forEach((btn) => btn.addEventListener("click", deleteItem));
        console.log("Delete button Functionality with Post Fetch")
        document.getElementById("create-kdrama-form").reset();
        console.log("Resets the Create-form")
        //debugger 
        //document.getElementsByName(`${id}`).reset();
       // document.getElementById("update-kdrama").reset();
     
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