let arrOfTenProfile = [];
let btnLike = document.getElementsByClassName("chooseContainer__like")[0];
let btnDislike = document.getElementsByClassName("chooseContainer__dislike")[0];
let btnPreviouse = document.getElementsByClassName(
  "chooseContainer__previouse"
)[0];
let name = document.getElementsByClassName("profileContainer__info--name")[0];
let age = document.getElementsByClassName("profileContainer__info--age")[0];
let locationPerson = document.getElementsByClassName(
  "profileContainer__info--location"
)[0];
let image = document.getElementsByClassName(
  "profileContainer__images--image"
)[0];
let profileContainer = document.getElementsByClassName("profileContainer")[0];
let clear = document.getElementsByClassName("clear")[0];

//profiles counter variable en initiated
let profileCounter = 1;
let nextGroupOfProfileCounter = 1;
let profileAddedCounter = 1;

//Choosing Gender In menu -------------------------- !!! MENU FEATURE WERK NIET !!!
let female = document.getElementsByClassName("menu__burger--female")[0];
let male = document.getElementsByClassName("menu__burger--male")[0];
let both = document.getElementsByClassName("menu__burger--X ")[0];
let url = "https://randomuser.me/api/?results=10";

female.addEventListener("click", function() {
  url = "https://randomuser.me/api/?gender=female";
  UpateProfilesByGenderChosen();

  console.log(url);
});
male.addEventListener("click", function() {
  url = "https://randomuser.me/api/?gender=male";
  UpateProfilesByGenderChosen();

  console.log(url);
});

both.addEventListener("click", function() {
  url = "https://randomuser.me/api/";
  UpateProfilesByGenderChosen();

  console.log(url);
});

//Update Profiles to Chosen Gender
function UpateProfilesByGenderChosen() {
  localStorage.clear();
  setTenProfilesInLocalStorage();
}

//LOAD

// Dit is geen efficient want x10 fetch
function setTenProfilesInLocalStorage() {
  for (let i = 0; i < 10; i++) {
    fetch(url, {
      method: "GET"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        //Binnen deze functie kan je de json data manipuleren
        //we need name, age, location, foto,

        let profile = [
          data.results[0].name.first,
          data.results[0].dob.age,
          data.results[0].location.city,
          data.results[0].picture.large
        ];

        arrOfTenProfile.push(profile);

        localStorage.setItem(
          "profile" + profileAddedCounter.toString(),
          JSON.stringify(profile)
        );
        console.log(JSON.stringify(profile));
        //console.log("Profile Add: " + profileAddedCounter);
        profileAddedCounter++;
      });
  }
}

setTenProfilesInLocalStorage();

// for (let i = 0; i < 10; i++) {
//   console.log(JSON.parse(localStorage.getItem("profile" + i)));
// }
//Liking en disliking btns
btnLike.addEventListener("click", function() {
  addLikeOfDislikeToProfile("liked");
  goToNextProfile();
});
btnPreviouse.addEventListener("click", function() {
  goToPreviouseProfile();
});
btnDislike.addEventListener("click", function() {
  addLikeOfDislikeToProfile("dis");
  goToNextProfile();
});

// profileContainer.addEventListener("load", function() {
//   console.log(
//     JSON.parse(localStorage.getItem("profile" + profileCounter.toString()))
//   );
//   console.log(profileCounter);
// });

clear.addEventListener("click", function() {
  console.log("Cleared Storage");
  localStorage.clear();
});

function addLikeOfDislikeToProfile(likeStatus) {
  let profileToUpdate = localStorage.getItem("profile" + profileCounter);
  console.log(profileToUpdate);
  let likeOrdislike;
  if (
    profileToUpdate.search("liked") !== -1 ||
    profileToUpdate.search("dis") !== -1
  ) {
    if (profileToUpdate.search("liked") !== -1) {
      profileToUpdate = profileToUpdate.replace("liked", likeStatus);
      console.log("Changed to Dis");
      localStorage.setItem("profile" + profileCounter, profileToUpdate);
    } else {
      profileToUpdate = profileToUpdate.replace("dis", likeStatus);
      localStorage.setItem("profile" + profileCounter, profileToUpdate);
    }
  } else {
    if (likeStatus === "liked") {
      likeOrdislike = '","liked"]';
    } else {
      likeOrdislike = '","dis"]';
    }

    let index = profileToUpdate.indexOf("]") - 1;

    profileToUpdate = profileToUpdate.slice(0, index) + likeOrdislike;
    localStorage.setItem("profile" + profileCounter, profileToUpdate);
    console.log("not likeds");
  }

  //console.log(profileToUpdate);

  //Change like or dislike -- search 4th ','
  let komma4thIndex = profileToUpdate.lastIndexOf(",");
  //console.log("komme:  " + komma4thIndex);
  // console.log(profileToUpdate.slice(komma4thIndex - 1, profileToUpdate.length));
  // console.log(index);
  // console.log(localStorage.getItem("profile" + profileCounter));
}
function goToNextProfile() {
  if (profileCounter < localStorage.length) {
    if (nextGroupOfProfileCounter === 9) {
      setTenProfilesInLocalStorage();

      nextGroupOfProfileCounter = 1;
    } else {
      nextGroupOfProfileCounter++;
    }

    profileCounter++;
    showProfile();
  }
}

function goToPreviouseProfile() {
  console.log(profileCounter);
  if (profileCounter !== 1) {
    profileCounter--;
  }

  console.log(profileCounter);
  showProfile();
}

function showProfile() {
  name.textContent = JSON.parse(
    localStorage.getItem("profile" + profileCounter)
  )[0];

  age.textContent = JSON.parse(
    localStorage.getItem("profile" + profileCounter)
  )[1];
  locationPerson.textContent = JSON.parse(
    localStorage.getItem("profile" + profileCounter)
  )[2];
  image.setAttribute(
    "src",
    JSON.parse(localStorage.getItem("profile" + profileCounter))[3]
  );
  console.log(profileCounter);
  console.log(JSON.parse(localStorage.getItem("profile" + profileCounter)));
  // console.log("ProfileNr: " + profileCounter);
}
showProfile();

function removeProfile() {
  localStorage.removeItem("profile" + profileCounter);
}
//start with a profile index 0
//showProfile();

//Everything with menu
let btnMenu = document.getElementsByClassName("headerContainer__burgermenu")[0];
let menu = document.getElementsByClassName("menu__burger")[0];

let menuItems = document.getElementsByClassName("menu__burger--items")[0];
btnMenu.addEventListener("click", function() {
  menu.classList.toggle("menu__expand");
  menuItems.classList.toggle("menu__show");
  btnMenu.style.color = "white";
});

//some tests
let listLocalStorage = document.getElementsByClassName("list__localstorage")[0];
let btnShowList = document.getElementsByClassName("btn__showList")[0];

function showLocalStorageList() {
  for (let key in localStorage) {
    let p = document.createElement("p");

    p.textContent = key + " : " + JSON.parse(localStorage.getItem(key));
    listLocalStorage.appendChild(p);
  }
  console.log(localStorage.length);
}

btnShowList.addEventListener("click", function() {
  listLocalStorage.textContent = "";
  showLocalStorageList();
});
