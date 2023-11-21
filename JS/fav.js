let list = document.querySelector('.list-container')


window.addEventListener("load", function () {
     // Getting the favourites array fom localStorage
     let favourites = localStorage.getItem("favouriteCharacters");

     // if favourites is null the we display nothing and return from there 
     if (favourites == null) {
          list.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>"
          return;
     }
     // if NOT NULL the paring it to convert it to array
     else {
          favourites = JSON.parse(this.localStorage.getItem("favouriteCharacters"));
     }

     // if all the characters are deleted from favourites and not character left for displaying
     if (favourites.length == 0) {
          list.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>";
          return;
     }

     list.innerHTML = "";
     favourites.forEach(character => {
          list.innerHTML +=
               `
              <div class="list">
              <div class='info'>
              <img src="${character.squareImage}" alt="${character.name}">
              <p>${character.name}</p>
              <p>Id : ${character.id}</p>
              <a class="character-info" href="heroInfo.html">
              <button class="btn"> More Info</button>
              </a>
              <div style="display:none;">
              <span>${character.id}</span>
              <span>${character.name}</span>
              <span>${character.comics}</span>
              <span>${character.series}</span>
              <span>${character.stories}</span>
              <span>${character.description}</span>
              <span>${character.landscapeImage}</span>
              <span>${character.portraitImage}</span>
              <span>${character.squareImage}</span>
              </div>
              <button class="btn remove-btn"><i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites</button>
              </div>
              </div>
         `

     })
     // Adding the appropritate events to the buttons after they are inserted in dom 
     addEvent();
})

// Function for attacthing eventListener to buttons
function addEvent() {
     let removeBtn = document.querySelectorAll(".remove-btn");
     removeBtn.forEach((btn) => btn.addEventListener("click", removeCharacterFromFavourites))

     let characterInfo = document.querySelectorAll(".character-info");
     characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage));
}


function removeCharacterFromFavourites() {

     // Storing the Id of character in a voriable
     let idOfCharacterToBeDeleted = this.parentElement.children[2].innerHTML.substring(5);

     // getting the favourites array which stores objects of character  
     let favourites = JSON.parse(localStorage.getItem("favouriteCharacters"));
     // favouritesCharacterIDs is taken from localStorage for deleting the ID of the character which is deleted from favourites
     let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
     // deleting the characters id from favouritesCharacterId map
     favouritesCharacterIDs.delete(`${idOfCharacterToBeDeleted}`);


     // deleting the character form array whose id is matched 
     favourites.forEach(function (favourite, index) {
          if (favourite.id == idOfCharacterToBeDeleted) {
               // console.log(favourite)
               favourites.splice(index, 1);
          }
     });

     // if all the characters are deleted from favourites and not character left for displaying
     if (favourites.length == 0) {
          list.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>";
     }

     // Updating the new arrays in localStorage
     localStorage.setItem("favouriteCharacters", JSON.stringify(favourites));
     localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));

     // Removing the element from DOM
     this.parentElement.remove();
}


// Function which stores the info object of character for which user want to see the info 
function addInfoInLocalStorage() {
     // This function basically stores the data of character in localStorage.  
     let heroInfo = {
          name: this.parentElement.children[7].children[1].innerHTML,
          description: this.parentElement.children[7].children[5].innerHTML,
          comics: this.parentElement.children[7].children[2].innerHTML,
          series: this.parentElement.children[7].children[3].innerHTML,
          stories: this.parentElement.children[7].children[4].innerHTML,
          portraitImage: this.parentElement.children[7].children[7].innerHTML,
          id: this.parentElement.children[7].children[0].innerHTML,
          landscapeImage: this.parentElement.children[7].children[6].innerHTML
     }

     localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}