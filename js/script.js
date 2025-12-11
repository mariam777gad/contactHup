var userName = document.getElementById("userName");
var userNumber = document.getElementById("userNumber");
var userEmail = document.getElementById("userEmail");
var userAddress = document.getElementById("userAddress");
var userGroup = document.getElementById("userGroup");
var userDescription = document.getElementById("userDescription");
var btnUpdate = document.getElementById("btnUpdate");
var btnAdd = document.getElementById("btnAdd");
var userImage = document.getElementById("userImage");
var userFavorite = document.getElementById("userFavorite");
var userEmergency = document.getElementById("userEmergency");
var headerModal = document.getElementById("headerModal");
// var alertText = document.getElementById("alertText");
// var alertNumber = document.getElementById("alertNumber");

// user window :
var userWindow = document.getElementById("userWindow");
function getUserInfo() {
  userWindow.classList.remove("d-none");
  headerModal.innerHTML = `Add new contacts`;
}
function closeUserWindow() {
  userWindow.classList.add("d-none");
}

var usersList = localStorage.getItem("userStorage")
  ? JSON.parse(localStorage.getItem("userStorage"))
  : [];

displayUserInfo();
var user;
function addUserInfo() {
  if (
    validation(userName, "alertText") &&
    validation(userNumber, "alertNumber")
  ) {
    user = {
      name: userName.value,
      number: userNumber.value,
      email: userEmail.value,
      address: userAddress.value,
      group: userGroup.value,
      des: userDescription.value,
      fav: userFavorite.checked, //return true /false
      emergency: userEmergency.checked, //return true /false

      image: userImage.files[0] ? `images/${userImage.files[0].name} ` : "",

      // image: userImage.files[0] ? URL.createObjectURL(userImage.files[0]) : "",
    };
    usersList.push(user);
    localStorage.setItem("userStorage", JSON.stringify(usersList));
    displayUserInfo();
    clearUserInfo();
    closeUserWindow();
    btnAdd.classList.remove("d-none");
    btnUpdate.classList.add("d-none");
    showAlert("Add!", "User has been added successfully", "success");
  } else if (validation(userName, "alertText") == false) {
    closeUserWindow();
    showAlert(
      "Invalid Name",
      "Name should contain only letters and spaces (2-50 characters)",
      "error"
    );
  } else {
    closeUserWindow();
    showAlert(
      "Invalid Number",
      "Please enter a valid Egyptian phone number",
      "error"
    );
  }

  // for(var i=0 ; i<usersList.length ;i++){
  //   if(userNumber.value==usersList[i].number){
  //     console.log("hiiiiiiiiii")
  //   }
  // }
}

function clearUserInfo() {
  userName.value = null;
  userNumber.value = null;
  userEmail.value = null;
  userAddress.value = null;
  userGroup.value = null;
  userDescription.value = null;
  userFavorite.checked = null;
  userEmergency.checked = null;
}

function displayUserInfo() {
  var usersList = JSON.parse(localStorage.getItem("userStorage"));
  var content = "";
  var noContact = document.getElementById("noContact");
  if (usersList.length === 0) {
    content += `
          <div class="mt-5 ">
                    <div class="mb-4">
                      <span class="fs-2 p-3 rounded-3 bg-gray-200 text-gray-300"
                        ><i class="fa-solid fa-address-book"></i
                      ></span>
                    </div>
                    <p class="text-gray-500 fw-medium mb-0">
                      No contacts found
                    </p>
                    <span class="text-gray-400"
                      >Click "Add Contact" to get started</span
                    >
                  </div>
    `;
    noContact.innerHTML = content;
    document.getElementById("showInfo").innerHTML = "";
  } else {
    for (var i = 0; i < usersList.length; i++) {
      content += `
                    <div >
                  <div class="inner bg-white p-3 rounded-4">
                    <div class="d-flex align-items-center">

                          <div
                        class="img-container d-flex align-items-center justify-content-center position-relative overflow-hidden text-lg fw-medium bg-amber-400 rounded-3 text-white me-3 text-capitalize"
                      >
                        ${
                          usersList[i].image
                            ? `<img src="${usersList[i].image}" >`
                            : usersList[i].name[0]
                        }


                        ${
                          usersList[i].emergency == true
                            ? `
                          <div
                          class="position-absolute heart-pulse p-1 rounded-circle bg-red-500 border border-2 border-white"
                        >
                          <i class="fa-solid fa-heart-pulse"></i>
                        </div>
                          `
                            : ""
                        }

                        ${
                          usersList[i].fav == true
                            ? `<div id="favoriteStar"
                          class=" position-absolute star-icon p-1 rounded-circle bg-amber-500 border border-2 border-white"
                        >
                          <i class="fa-solid fa-star"></i>
                        </div>`
                            : ""
                        }
                        
                        
                      </div>




                      <div>
                        <h6 class="mb-0 text-capitalize">${
                          usersList[i].name
                        }</h6>
                        <div class="d-flex mt-1">
                          <div
                            class="p-1 rounded-2 me-2 d-flex align-items-center justify-content-center text-xs bg-blue-100 text-blue-600"
                          >
                            <i class="fa-solid fa-phone"></i>
                          </div>
                          <span class="text-sm text-gray-500">${
                            usersList[i].number
                          }</span>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-3">
                      <div
                        class="p-1 rounded-2 me-2 d-flex align-items-center justify-content-center text-xs bg-purple-200 text-purple-600"
                      >
                        <i class="fa-solid fa-envelope"></i>
                      </div>
                      <span class="text-gray-600 text-sm"
                        >${usersList[i].email}</span
                      >
                    </div>
                    <div class="d-flex mt-2">
                      <div
                        class="p-1 rounded-2 me-2 d-flex align-items-center justify-content-center text-xs bg-green-200 text-green-700"
                      >
                        <i class="fa-solid fa-location-dot"></i>
                      </div>
                      <span class="text-gray-600 text-sm">${
                        usersList[i].address
                      }</span>
                    </div>
                    <div class="my-3">
                    ${
                      usersList[i].group == "family"
                        ? `
                          <span
                        class="me-3 text-xs fw-medium bg-blue-100 text-blue-600 p-1 rounded-2">
                        family
                      </span>`
                        : ""
                    }

                        ${
                          usersList[i].group == "work"
                            ? `
                        <span
                        class="me-3 text-xs fw-medium bg-violet-100 text-violet-600 p-1 rounded-2">
                          Work
                        </span>`
                            : ""
                        }

                         ${
                           usersList[i].group == "school"
                             ? `
                        <span
                        class="me-3 text-xs fw-medium bg-amber-100 text-orange-700 p-1 rounded-2">
                          School
                        </span>`
                             : ""
                         }

                          ${
                            usersList[i].group == "friends"
                              ? `
                        <span
                        class="me-3 text-xs fw-medium bg-green-100 text-green-700 p-1 rounded-2">
                          Friends
                        </span>`
                              : ""
                          }


                          ${
                            usersList[i].group == "other"
                              ? `
                        <span
                        class="me-3 text-xs fw-medium bg-gray-100 text-gray-700 p-1 rounded-2">
                          Other
                        </span>`
                              : ""
                          }


                          ${
                            usersList[i].emergency == true
                              ? `<span
                        class="text-xs fw-medium bg-red-50 text-red-500 p-1 rounded-2"
                        ><i class="fa-solid fa-heart-pulse"></i> Emergency</span
                      >`
                              : ""
                          }


                    </div>
                    <div class="d-flex justify-content-between border-top pt-3">
                      <div>
                        <span class="p-1 bg-green-100 text-green-700 rounded-3 text-sm me-2"><i class="fa-solid fa-phone"></i></span>
                        <span class="p-1 bg-purple-100 text-purple-700 rounded-3 text-sm"><i class="fa-solid fa-envelope"></i></span>
                      </div>
                      <div class="">

                      ${
                        usersList[i].fav == true
                          ? `<span  onclick="changeIcon(${i},'fav')"   class=" me-3 text-sm star-icon2 p-2 rounded-3 "><i class="fa-solid fa-star"></i></span>`
                          : `<span  onclick="changeIcon(${i},'fav')" class="text-gray-500 me-3 text-sm star-icon p-2 rounded-3"><i class="fa-regular fa-star"></i></span>`
                      }
                        ${
                          usersList[i].emergency == true
                            ? `<span onclick="changeIcon(${i},'emergency')" class="text-red-500 me-3 bg-red-50  text-sm heart-icon p-2 rounded-3"><i class="fa-solid fa-heart-pulse"></i></span>`
                            : `<span onclick="changeIcon(${i},'emergency')" class="text-gray-500 me-3 text-sm heart-icon p-2 rounded-3"><i class="fa-regular fa-heart"></i></span>`
                        }
                        <span onclick="setUserInfo(${i})" class="text-gray-500 me-3 text-sm pen-icon p-2 rounded-3"><i class="fa-solid fa-pen"></i></span>
                        <span onclick="deletUserInfo(${i})" class="text-gray-500 me-3 text-sm trash-icon p-2 rounded-3"><i class="fa-solid fa-trash"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
    `;
    }
    document.getElementById("showInfo").innerHTML = content;
    noContact.innerHTML = "";
  }
  totalFavAndEmergency();
  allContactsHeader();
  addRightFav();
  addRightEmergency();
  document.getElementById("totalUsers").innerHTML = usersList.length;
}

function deletUserInfo(indexDelet) {
  usersList.splice(indexDelet, 1);
  localStorage.setItem("userStorage", JSON.stringify(usersList));

  displayUserInfo();
  showAlert("Success!", "User has been deleted successfully", "success");
}

var searchInput = document.getElementById("searchInput");
function searchUser() {
  var term = searchInput.value;
  var content = "";
  for (var i = 0; i < usersList.length; i++) {
    if (
      usersList[i].name.toLowerCase().includes(term.toLowerCase()) ||
      usersList[i].number.toLowerCase().includes(term.toLowerCase()) ||
      usersList[i].email.toLowerCase().includes(term.toLowerCase())
    ) {
      content += `
                    <div >
                  <div class="inner bg-white p-3 rounded-4">
                    <div class="d-flex align-items-center">
                      <span
                        class="py-2 px-3 text-lg fw-medium bg-amber-400 rounded-3 text-white me-3 text-capitalize"
                        >n</span
                      >
                      <div>
                        <h6 class="mb-0">${usersList[i].name}</h6>
                        <div class="d-flex mt-1">
                          <div
                            class="p-1 rounded-2 me-2 d-flex align-items-center justify-content-center text-xs bg-blue-100 text-blue-600"
                          >
                            <i class="fa-solid fa-phone"></i>
                          </div>
                          <span class="text-sm text-gray-500 fw-bold">${
                            usersList[i].number
                          }</span>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex mt-3">
                      <div
                        class="p-1 rounded-2 me-2 d-flex align-items-center justify-content-center text-xs bg-purple-200 text-purple-600"
                      >
                        <i class="fa-solid fa-envelope"></i>
                      </div>
                      <span class="text-gray-600 text-sm"
                        >${usersList[i].email}</span
                      >
                    </div>
                    <div class="d-flex mt-2">
                      <div
                        class="p-1 rounded-2 me-2 d-flex align-items-center justify-content-center text-xs bg-green-200 text-green-700"
                      >
                        <i class="fa-solid fa-location-dot"></i>
                      </div>
                      <span class="text-gray-600 text-sm">${
                        usersList[i].address
                      }</span>
                    </div>
                    <div class="my-3">
                    ${
                      usersList[i].group == "family"
                        ? `
                          <span
                        class="me-3 text-xs fw-medium bg-blue-100 text-blue-600 p-1 rounded-2">
                        family
                      </span>`
                        : ""
                    }

                        ${
                          usersList[i].group == "work"
                            ? `
                        <span
                        class="me-3 text-xs fw-medium bg-violet-100 text-violet-600 p-1 rounded-2">
                          Work
                        </span>`
                            : ""
                        }

                         ${
                           usersList[i].group == "school"
                             ? `
                        <span
                        class="me-3 text-xs fw-medium bg-amber-100 text-orange-700 p-1 rounded-2">
                          School
                        </span>`
                             : ""
                         }

                          ${
                            usersList[i].group == "friends"
                              ? `
                        <span
                        class="me-3 text-xs fw-medium bg-green-100 text-green-700 p-1 rounded-2">
                          Friends
                        </span>`
                              : ""
                          }


                          ${
                            usersList[i].group == "other"
                              ? `
                        <span
                        class="me-3 text-xs fw-medium bg-gray-100 text-gray-700 p-1 rounded-2">
                          Other
                        </span>`
                              : ""
                          }
                  
                    </div>
                    <div class="d-flex justify-content-between border-top pt-3">
                      <div>
                        <span class="p-1 bg-green-100 text-green-700 rounded-3 text-sm me-2"><i class="fa-solid fa-phone"></i></span>
                        <span class="p-1 bg-purple-100 text-purple-700 rounded-3 text-sm"><i class="fa-solid fa-envelope"></i></span>
                      </div>
                      <div class="">
                        <span class="text-gray-500 me-3 text-sm"><i class="fa-regular fa-star"></i></span>
                        <span class="text-gray-500 me-3 text-sm"><i class="fa-regular fa-heart"></i></span>
                        <span onclick="setUserInfo(${i})" class="text-gray-500 me-3 text-sm"><i class="fa-solid fa-pen"></i></span>
                        <span onclick="deletUserInfo(${i})" class="text-gray-500 me-3 text-sm"><i class="fa-solid fa-trash"></i></span>
                      </div>
                    </div>
                  </div>
                </div>
    `;
    }
  }
  document.getElementById("showInfo").innerHTML = content;
}
// global index for another function
var globalIndex = "";
function setUserInfo(index) {
  globalIndex = index;

  userName.value = usersList[index].name;
  userNumber.value = usersList[index].number;
  userEmail.value = usersList[index].email;
  userDescription.value = usersList[index].des;
  userGroup.value = usersList[index].group;
  userAddress.value = usersList[index].address;

  getUserInfo();
  btnUpdate.classList.remove("d-none");
  btnAdd.classList.add("d-none");
  headerModal.innerHTML = `Update contacts`;
}

// user the global index here
function updateUserInfo() {
  var user = {
    name: userName.value,
    number: userNumber.value,
    email: userEmail.value,
    address: userAddress.value,
    group: userGroup.value,
    des: userDescription.value,
    fav: userFavorite.checked,
    emergency: userEmergency.checked,
  };
  usersList.splice(globalIndex, 1, user);
  localStorage.setItem("userStorage", JSON.stringify(usersList));
  displayUserInfo();
  closeUserWindow();
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  clearUserInfo();
  showAlert("Success!", "User has been updated successfully", "success");
}

// iconType = fav or emergence based on the clicked element
function changeIcon(index, iconType) {
  usersList[index][iconType] = !usersList[index][iconType];
  localStorage.setItem("userStorage", JSON.stringify(usersList));
  displayUserInfo();
}

function totalFavAndEmergency() {
  var totalFav = [];

  var totalEmergence = [];

  for (var i = 0; i < usersList.length; i++) {
    // usersList[i].fav == true && totalFav.push(usersList[i].fav);
    if (usersList[i].fav == true) {
      totalFav.push(usersList[i].fav);
    }

    usersList[i].emergency == true &&
      totalEmergence.push(usersList[i].emergency);
  }

  document.getElementById("totalFav").innerHTML = totalFav.length;
  document.getElementById("totalEmergence").innerHTML = totalEmergence.length;
}

function addRightFav() {
  var content = "";
  var totalFav = [];
  for (var i = 0; i < usersList.length; i++) {
    if (usersList[i].fav == true) {
      var userFav = {
        name: usersList[i].name,
        number: usersList[i].number,
      };
      totalFav.push(userFav);
      content += `
        
                  <div  
                    class="mb-2 d-flex justify-content-around py-2 justify-content-center align-items-center bg-gray-100 rounded-3"
                  >
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <span
                        class="px-3 py-2 bg-rose-500 rounded-3 me-2 text-white fw-medium text-capitalize"
                        >${usersList[i].name[0]}</span
                      >
                      <div class="text-start d-flex flex-column">
                        <span class="mb-0 fw-normal text-capitalize">${usersList[i].name}</span>
                        <span class="text-xs text-gray-400">${usersList[i].number}</span>
                      </div>
                    </div>

                    <div
                      class="text-xs text-green-700 p-2 bg-green-100 rounded-3"
                    >
                      <i class="fa-solid fa-phone"></i>
                    </div>

                  </div>
      
      `;
    }
  }

  if (totalFav.length) {
    document.getElementById("favCardsContainer").innerHTML = content;
    document.getElementById("noFav").innerHTML = "";
  } else {
    document.getElementById("favCardsContainer").innerHTML = "";
    document.getElementById("noFav").innerHTML = `No favorites yet`;
  }
}

function addRightEmergency() {
  var content = "";
  var totalEmergency = [];
  for (var i = 0; i < usersList.length; i++) {
    if (usersList[i].emergency) {
      var userEmergency = {
        name: usersList[i].name,
        number: usersList[i].number,
      };
      totalEmergency.push(userEmergency);
      content += `<div
                    class="mb-2 d-flex justify-content-around py-2 justify-content-center align-items-center bg-gray-100 rounded-3"
                  >
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <span
                        class="px-3 py-2 bg-rose-500 rounded-3 me-2 text-white fw-medium text-capitalize"
                        >${usersList[i].name[0]}</span
                      >
                      <div class="text-start d-flex flex-column">
                        <span class="mb-0 fw-normal">${usersList[i].name}</span>
                        <span class="text-xs text-gray-400">${usersList[i].number}</span>
                      </div>
                    </div>

                    <div
                      class="text-xs text-green-700 p-2 bg-green-100 rounded-3"
                    >
                      <i class="fa-solid fa-phone"></i>
                    </div>
                  </div>`;
    }
  }

  if (totalEmergency.length) {
    document.getElementById("emergencyCardsContainer").innerHTML = content;
    document.getElementById("noEmergency").innerHTML = "";
  } else {
    document.getElementById("emergencyCardsContainer").innerHTML = "";
    document.getElementById("noEmergency").innerHTML = `No emergency yet`;
  }
}
function allContactsHeader() {
  var countContacts = document.getElementById("countContacts");

  countContacts.innerHTML = `Manage and organize your ${
    usersList.length
  } contact${usersList.length > 1 ? `s` : ""}`;
}

function showAlert(myTitle, myText, myIcon) {
  Swal.fire({
    title: myTitle,
    text: myText,
    icon: myIcon,
    confirmButtonText: "ok",
  });
}

// function changeemergenceIcon(index) {
//   usersList[index].emergency ?usersList[index].emergency=false :usersList[index].emergency=true
//   displayUserInfo();
// }
// function changeemergenceIcon(index) {
//   usersList[index].emergency ?usersList[index].emergency=false :usersList[index].emergency=true
//   displayUserInfo();
// }

//  dont forget return true / false-//
function validationName() {
  var regex = /^[a-z A-Z]{2,50}$/;
  if (regex.test(userName.value)) {
    console.log("hi");
    alertText.classList.add("d-none");
    return true;
  } else {
    console.log("try");
    alertText.classList.remove("d-none");
    return false;
  }
}
///^[010 011 012 015]\d{10}$/
///^[010 011 012 015][0-9]{10}$/
///^(010|011|012|015)\d{8}$/
function validationNumber() {
  regex = /^[010 011 012 015]\d{10}$/;
  if (regex.test(userNumber.value)) {
    console.log("hii");
    alertNumber.classList.add("d-none");
    return true;
  } else {
    console.log("bye");
    alertNumber.classList.remove("d-none");
    return false;
  }
}

function validation(element, text) {
  var regex = {
    userName: /^[a-z A-Z]{2,50}$/,
    userNumber: /^(010|011|012|015)\d{8}$/,
  };
  var text = document.getElementById(text);
  if (regex[element.id].test(element.value)) {
    console.log("welcome");
    text.classList.add("d-none");
    return true;
  } else {
    console.log("sorry");
    text.classList.remove("d-none");
    return false;
  }
}
