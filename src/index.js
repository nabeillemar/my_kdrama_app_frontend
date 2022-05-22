const k_dramasIndexPage = "http://localhost:3000/api/v1/k_dramas"

document.addEventListener("DOMContentLoaded", () => {    
    console.log("DOM LOADED")

    getKdramas()
    console.log("initally getting all the Kdramas with buttons")  

   const createKdramaForm = document.querySelector("#create-kdrama-form") 
   createKdramaForm.addEventListener("submit", e => createFormHandler(e));



})

function getKdramas() { 
    console.log("inside GetKdramas")
    fetch(k_dramasIndexPage)
    .then(
        function(response) {
        return response.json()} 
        )
    .then(kdramas => {
        console.log(kdramas)
        kdramas.data.forEach(kdramas => { 
          
            const newKdrama = new Kdrama(kdramas, kdramas.attributes)
            document.querySelector('#kdramas-container').innerHTML += newKdrama.renderKdramaCard(); 
        })  

        editButton()
         document.querySelector('#update-kdrama').addEventListener('submit', e => updateFormHandler(e));
         console.log("UpdateFormHandler called from GetKdramas ")

        document.querySelectorAll(".delete-btn").forEach((btn) => btn.addEventListener("click", deleteItem))

     
    })
    
}



    function editButton(){
        document.querySelectorAll('.edit-btn').forEach( (button) => button.addEventListener('click', e => {
            console.log("edit button click within getKdramas")
            const id = parseInt(e.target.dataset.id); 
            const kdrama = Kdrama.findById(id);
            document.querySelector('#update-kdrama').innerHTML += kdrama.renderUpdateForm();
        }));
    }



    function deleteItem(e) {
        console.log("Delete Function Called")

        const id = parseInt(e.target.dataset.id);

        fetch(`http://localhost:3000/api/v1/k_dramas/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((kdrama) => {
            console.log("delete")

            document.querySelector(`#kdrama-${kdrama.id}`).remove()
        });
    }


    function createFormHandler(e) { 
        console.log("Calling CreateFromHandler")
        e.preventDefault()
        const title = document.querySelector('#title').value 
        const comment = document.querySelector('#comment').value
        const cover_photo = document.querySelector('#cover_photo').value
        const categoryId = parseInt(document.querySelector('#categories').value) 
        const release_year = document.querySelector('#release_year').value
        const watched = document.querySelector('#watched').value
        const my_rating = document.querySelector('#my_rating').value
        const where_to_watch = document.querySelector('#where_to_watch').value

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
        const category_id = parseInt(e.target.querySelector('#categories').value) 
        const release_year = e.target.querySelector('#release_year').value
        const watched = e.target.querySelector('#watched').value
        const my_rating = e.target.querySelector('#my_rating').value
        const where_to_watch = e.target.querySelector('#where_to_watch').value

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
            body: JSON.stringify(bodyJSON), 
        })
        .then(response => response.json())
        .then(updatedKdrama => {
            console.log(updatedKdrama);
            if (updatedKdrama.errors != undefined){

                     console.log(updatedKdrama.errors)
                     debugger
                     alert(updatedKdrama.errors)
                 } else {
                     debugger
                     alert("Submitted")
                 }
            const newKdrama = new Kdrama(updatedKdrama.data, updatedKdrama.data.attributes)

            document.querySelector(`#kdrama-${kdrama.id}`).remove()
            console.log("old card deleted Within Patch Request")

            document.querySelector('#kdramas-container').innerHTML += newKdrama.renderKdramaCard()
            console.log("Updated Card added Within patch Request")

            const myDiv = parseInt(document.querySelector('#render-update-form').dataset.id.toString())
            if (myDiv == kdrama.id) {
                document.querySelector('#render-update-form').remove()
            }

            console.log("old update form removed within Patch Request")

        editButton()
        document.querySelectorAll(".delete-btn").forEach((btn) => btn.addEventListener("click", deleteItem));

        console.log("Does this work? kdrama form update ")
        document.getElementById("create-kdrama-form").reset();

        })
    }



function postFetch(title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, category_id) { 
    console.log("Calling PostFetch")

    console.log(title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, category_id);
    let bodyData = {title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, category_id}

    fetch(k_dramasIndexPage, {

      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bodyData) 
    })
    .then(response => response.json()) 
    .then(kdramas => { 
           
            if (kdramas.errors != undefined){
           
                console.log(kdramas.errors)
                debugger
                alert(kdramas.errors)
            } else {
                debugger
                alert("Submitted")
            }

            const newKdrama = new Kdrama(kdramas.data, kdramas.data.attributes) 
            debugger
               document.querySelector('#kdramas-container').innerHTML += newKdrama.renderKdramaCard();
               console.log("Within PostFetch Rendering the Kdrama container with the new KdramaCard")
       
               editButton()
               console.log("EDIT button Functionality with Post Fetch")
       
               document.querySelectorAll(".delete-btn").forEach((btn) => btn.addEventListener("click", deleteItem));
               console.log("Delete button Functionality with Post Fetch")
               document.getElementById("create-kdrama-form").reset();
               console.log("Resets the Create-form")

        
    })
 
}

