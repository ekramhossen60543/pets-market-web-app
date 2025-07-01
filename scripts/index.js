// category btn load and display section start
const loadCategoryBtnContainer = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const data = await res.json();
    displayCategoryBtnContainer(data.categories);
  } catch (error) {
    console.error("Error: ", error);
  }
};

const displayCategoryBtnContainer = (categories) => {
  const categoryBtnContainer = document.getElementById(
    "category-btn-container"
  );

  for (const item of categories) {
    const buttonDiv = document.createElement("div");

    buttonDiv.innerHTML = `
    
      <button onclick="loadCategory('${item.category}',this)" class="category-btn btn  w-full !py-12 !px-12 bg-white flex item-center gap-4 rounded-xl">
        <img class="w-14" src="${item.category_icon}"/>
        <h4 class="text-2xl font-bold">${item.category}</h4>
      </button>
      
    `;
    categoryBtnContainer.append(buttonDiv);
  }
};
loadCategoryBtnContainer();

// category btn load and display section end

// pets card section load and display start
let petsData = [];
const loadPetsCardContainer = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await res.json();

    petsData = data.pets;
    displayPetsCardContainer(petsData);
    document.getElementById("sort-btn").addEventListener("click", () => {
      sortPetsByPriceDesc();
    });
  } catch (error) {
    console.error("Error: ", error);
  }
};
// Price Shorting --> Descending Order
const sortPetsByPriceDesc = () => {
  const sortedPets = petsData
    .filter((pet) => pet.price !== null) // exclude null prices
    .sort((a, b) => b.price - a.price);

  displayPetsCardContainer(sortedPets);
};

const displayPetsCardContainer = (pets) => {
  const petsCardContainer = document.getElementById("pets-card-container");
  const likeImageContainer = document.getElementById("like-card-container");
  petsCardContainer.innerHTML = "";

  if (pets.length === 0) {
    petsCardContainer.innerHTML = "";
    likeImageContainer.classList.add("hidden");
    petsCardContainer.classList.remove("grid");
    petsCardContainer.innerHTML = `
  
    <div class="w-full h-[500px] flex justify-center items-center">
      <div class="w-200px flex flex-col justify-center items-center">
          <img class="w-[150px] mb-10" src="../assets/images/error.webp"/>
          <h2 class="text-5xl font-bold">No Content Here!</h2>
      </div>
    </div>
    
    `;
    return;
  } else {
    likeImageContainer.classList.remove("hidden");
    petsCardContainer.classList.add("grid");
  }

  for (const card of pets) {
    const petCard = document.createElement("div");
    petCard.classList = "";
    petCard.innerHTML = `
    
  <div class="card border-1 border-gray-200 p-5 rounded-xl">
    <figure class="w-full h-full object cover mb-6 rounded-xl">
      <img
      class="w-full h-full object-cover"
      src="${card.image}" />
    </figure>
    <div class="mb">
      <h2 class="text-xl font-black mb-2"> ${card.pet_name}</h2>
      <p class="text-gray-700"><strong>Breed:</strong> ${
        card.breed === undefined ? "Not available" : card.breed
      }</p>
      <p class="text-gray-700"><strong>Birth:</strong> ${
        card.date_of_birth === null || card.date_of_birth === undefined
          ? "Not available"
          : card.date_of_birth
      }</p>
      <p class="text-gray-700"><strong>Gender:</strong> ${
        card.gender === undefined ? "Not available" : card.gender
      }</p>
      <p class="text-gray-700"><strong>Price:</strong> ${
        card.price === null ? "Not available" : card.price + "$"
      }</p>
       <hr class="border-gray-200 mt-4 mb-4"/>
      <div class="flex justify-between items-center">
      <button onclick="displayLikeCardImage('${
        card.image
      }')" class="btn rounded-md"><img class="w-6" src="https://img.icons8.com/?size=100&id=82788&format=png&color=000000"/></button>
      <button  onclick="adoptDisableModal(this)" class="btn rounded-md text-[#0E7A81]">Adopt</button>
      <button  onclick="loadDetails(${
        card.petId
      })" class="btn rounded-md text-[#0E7A81]">Details</button>
    </div>
    </div>
  </div
    `;

    // Append card
    petsCardContainer.append(petCard);
  }
};
loadPetsCardContainer();
// pets card section load and display end

// Load category and Display category
const loadCategory = async (category, clickedBtn) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${category}`
    );
    const data = await res.json();

    // Loading Spinner functionality
    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.classList.remove("hidden");
    setTimeout(() => {
      loadingSpinner.classList.add("hidden");
      petsData = data.data;
      displayPetsCardContainer(petsData);
    }, 2000);
  } catch (error) {
    console.error("Error: ", error);
  }

  setActive(clickedBtn);
};

const setActive = (clickedBtn) => {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("bg-gray-200", "rounded-full");
    btn.classList.add("bg-white", "rounded-xl");
  });

  clickedBtn.classList.remove("bg-white", "rounded-xl");
  clickedBtn.classList.add("bg-gray-200", "rounded-full");
};

// Like card image

const displayLikeCardImage = (image) => {
  const likeCardImageContainer = document.getElementById("like-card-container");
  likeCardImageContainer.classList.remove("h-screen");
  let imageDiv = document.createElement("div");
  imageDiv.classList = "w-full";
  imageDiv.innerHTML = `
    <img class="w-full rounded-md shadow-sm" src="${image}"/>
  `;
  likeCardImageContainer.append(imageDiv);
};

// Adopt Disable Modal

const adoptDisableModal = (button) => {
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
  
  <img class="max-w-12" src="https://img.icons8.com/?size=100&id=12208&format=png&color=000000" />
  <h2 class="text-3xl font-bold">Congrates</h2>
  <p class="text-xl">Adoption Process is Start For your Pet</p>
  <h1 class="text-4xl font-bold text-black" id="adopt-count"></h1>
  
  `;
  // Way - 01
  // document.getElementById("showModalData").click();

  // Way - 02
  document.getElementById("adopt_disable_modal").showModal(); //showModal() this function provide daisyui
  adoptProcessCount(button);
};

// Adopt Process Counting
const adoptProcessCount = (button) => {
  const adoptModalClosedBtn = document.getElementById("adopt-closed-btn");
  let count = 3;
  const countElement = document.getElementById("adopt-count");
  countElement.textContent = count;
  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countElement.textContent = count;
    } else {
      clearInterval(interval);
      button.textContent = "Adopted";
      button.disabled;
      button.classList = "opacity-50 cursor-not-allowed";
      adoptModalClosedBtn.click();
    }
  }, 3000);
};

// Details Modal

const loadDetails = async (petId) => {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.petData);
};

const displayDetails = (petData) => {
  document.getElementById("details_btn_modal").showModal();
  const detailsModalContent = document.getElementById("details-modal-content");
  detailsModalContent.innerHTML = `
  
   <div>
   <div class="mb-3"><img class="w-full" src="${petData.image}"/></div>
    <h3 class="font-black text-xl mb-5">${petData.pet_name}</h3>
   <div class="flex items-start">
        <div class="w-1/2">
            <h4 class="text-gray-500"><span class="font-bold text-gray-700">Breed:</span> ${
              petData.breed === undefined ? "Not available" : petData.breed
            }</h4>
            <h4 class="text-gray-500"><span class="font-bold text-gray-700">Gender:</span> ${
              petData.gender === undefined ? "Not available" : petData.gender
            }</h4>
            <h4 class="text-gray-500"><span class="font-bold text-gray-700">Vaccinate Status:</span> ${
              petData.vaccinated_status === undefined
                ? "Not available"
                : petData.vaccinated_status
            }</h4>
        </div>

        <div class="w-1/2>
            <h4 class="text-gray-500"><span class="font-bold text-gray-700">Birth:</span> ${
              petData.date_of_birth === undefined
                ? "Not available"
                : petData.date_of_birth
            }</h4>
            <h4 class="text-gray-500"><span class="font-bold text-gray-700">Price:</span> ${
              petData.price === undefined
                ? "Not available"
                : petData.price + "$"
            }</h4>
        </div>
   </div>

   <div>
        <h3 class="font-black text-xl my-5">Detail Information</h3>
        <p>${petData.pet_details}</p>
   </div>
   </div>
  
  `;
  console.log(petData);
};
/*
category: "Rabbit";
date_of_birth: "2022-04-20";
gender: "Male";
image: "https://i.ibb.co.com/s3PXSwD/pet-3.jpg";
petId: 3;
pet_details: "This male African Grey rabbit is a small, friendly companion born on April 20, 2022. He prefers a calm environment and enjoys gentle handling. Partially vaccinated, he's a great choice for rabbit lovers who want a peaceful, easygoing pet. Priced at $1500, he's perfect for a quiet home environment.";
pet_name: "Coco";
price: 1500;
vaccinated_status: "Partially";
*/
