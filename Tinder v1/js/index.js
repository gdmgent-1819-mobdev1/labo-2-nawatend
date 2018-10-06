let arrOfTenProfile = [];
let btnLike = document.getElementsByClassName("chooseContainer__like")[0];
let btnDislike = document.getElementsByClassName("chooseContainer__dislike")[0];
let name = document.getElementsByClassName("profileContainer__info--name")[0];
let age = document.getElementsByClassName("profileContainer__info--age")[0];
let locationPerson = document.getElementsByClassName(
  "profileContainer__info--location"
)[0];
let image = document.getElementsByClassName(
  "profileContainer__images--image"
)[0];
let profileContainer = document.getElementsByClassName("profileContainer")[0];
let destroy = document.getElementsByClassName("destroy")[0];

let profileCounter = 1;
let nextGroupOfProfileCounter = 1;
let profileAddedCounter = 1;
function setTenProfilesInLocalStorage() {
  for (let i = 0; i < 10; i++) {
    let url = "https://randomuser.me/api/?gender=female";
    fetch(url, {
      method: "GET"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // binnen deze functie kan je de json data manipuleren
        //we need name, age, location, foto,
        //location: data.results[0].location.city
        //foto:     data.results[0].picture.large
        //name:     data.results[0].name.first
        // age:     data.results[0].dob.age

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
        //console.log("Profile Add: " + profileAddedCounter);
        profileAddedCounter++;
      });
  }
}

setTenProfilesInLocalStorage();

// for (let i = 0; i < 10; i++) {
//   console.log(JSON.parse(localStorage.getItem("profile" + i)));
// }

btnLike.addEventListener("click", function() {
  goToNextProfile();
});

btnDislike.addEventListener("click", function() {
  goToNextProfile();
});

profileContainer.addEventListener("load", function() {
  console.log(
    JSON.parse(localStorage.getItem("profile" + profileCounter.toString()))
  );
  console.log(profileCounter);
});

destroy.addEventListener("click", function() {
  console.log("destroyeed");
  localStorage.clear();
});

function goToNextProfile() {
  if (profileCounter < localStorage.length) {
    showProfile();

    if (nextGroupOfProfileCounter === 9) {
      setTenProfilesInLocalStorage();

      nextGroupOfProfileCounter = 1;
    } else {
      addLikeOfDislikeToProfile();
      nextGroupOfProfileCounter++;
    }

    profileCounter++;
  }
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
  // console.log(JSON.parse(localStorage.getItem("profile" + profileCounter)));
  // console.log("ProfileNr: " + profileCounter);
}

function removeProfile() {
  localStorage.removeItem("profile" + profileCounter);
}
//start with a profile index 0
showProfile();

function addLikeOfDislikeToProfile() {
  let profileToUpdate = localStorage.getItem("profile" + profileCounter);

  let like = '","liked"]';

  let index = profileToUpdate.indexOf("]") - 1;

  let newString = profileToUpdate.slice(0, index) + like;

  localStorage.setItem("profile" + profileCounter, newString);
  console.log(index);

  console.log(localStorage.getItem("profile" + profileCounter));
}

//some test
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
