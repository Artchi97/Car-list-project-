// Variables

const carList = document.querySelector("#carList");
const formCar = document.querySelector("#formCar");
const choiceBtn = document.querySelectorAll(".choice");
const leasingBtn = document.querySelector("#leasing");
const cashBtn = document.querySelector("#cash");
const priceInForm = document.querySelector("#totalPrice");
const carNameInForm = document.querySelector("#carName");
const nameInput = document.querySelector("#nameSurname");
const pickupPlaceInput = document.querySelector("#pickupPlace");
const pickupDateInput = document.querySelector("#pickupDate");
const tochoseList = document.querySelector("#toChoseAccesories");
const chosenList = document.querySelector("#chosenAccesories");
const backBtn = document.querySelector("#backBtn");
const buyBtn = document.querySelector("#buyBtn");
const thankPage = document.querySelector("#thankPage");
const thankBackBtn = document.querySelector("#thankBack");
let originalPrice;

// Functions

const carChoice = (button) => {
  carList.classList.add("hidden");
  formCar.classList.remove("hidden");
  let carData = button.closest(".carData");
  let priceElement = carData.querySelector(".priceNumber");
  let brandEl = carData.querySelector(".brandName");
  let modelEl = carData.querySelector(".modelName");
  let brandCar = brandEl.textContent;
  let modelCar = modelEl.textContent;
  let carPrice = priceElement.textContent;
  priceInForm.textContent = carPrice.replace(" ", "");
  carNameInForm.textContent = `${brandCar} ${modelCar}`;

  originalPrice = parseFloat(carPrice.replace(/\s/g, "").replace(",", "."));

  let carListItem = button.closest("li");
  let carImage = carListItem.querySelector(".carImage img");
  thankImg.src = carImage.src;
};

const backToCarList = () => {
  formCar.classList.add("hidden");
  carList.classList.remove("hidden");
};

function weekend() {
  const selectedDate = new Date(this.value);

  if (selectedDate.getDay() === 6 || selectedDate.getDay() === 0) {
    alert("Nie można wybrać soboty ani niedzieli!");
    this.value = "";
  }
}

const formValidation = () => {
  const regex = /^[a-zA-Z]+\s[a-zA-Z]+$/;

  if (!nameInput.value.match(regex) || !pickupDateInput.value) {
    alert("Wypełnij poprawnie pola!");
  } else {
    formCar.classList.add("hidden");
    thankPage.classList.remove("hidden");
  }

  dataInThankDiv();
};

const dataInThankDiv = () => {
  const chosenCar = document.querySelector("#thankCarName");
  const deliveryDate = document.querySelector("#deliveryDate");
  const paymentForm = document.querySelector("#paymentForm");
  const totalPriceInThanks = document.querySelector("#total");
  chosenCar.textContent = carNameInForm.textContent;
  deliveryDate.textContent = pickupDateInput.value;
  if (leasingBtn.checked) {
    paymentForm.textContent = "Leasing";
  } else {
    paymentForm.textContent = "Gotówka";
  }
  totalPriceInThanks.innerHTML = priceInForm.innerHTML;
};

const addAccesory = (btn) => {
  const listItem = btn.closest("li");
  const removeBtn = listItem.querySelector(".plus");
  const price = parseFloat(listItem.querySelector(".accPrice").textContent);
  const priceInFormValue = parseFloat(priceInForm.textContent);
  priceInForm.textContent = priceInFormValue + price;
  removeBtn.classList.remove("plus");
  removeBtn.classList.add("minus");
  removeBtn.textContent = "-";

  const newLi = document.createElement("li");
  newLi.innerHTML = listItem.innerHTML;
  chosenList.appendChild(newLi);
  listItem.remove();
};

const removeAccesory = (btn) => {
  const listItem = btn.closest("li");
  const addBtn = listItem.querySelector(".minus");
  const price = parseFloat(listItem.querySelector(".accPrice").textContent);
  const priceInFormValue = parseFloat(priceInForm.textContent);
  priceInForm.textContent = priceInFormValue - price;

  addBtn.classList.remove("minus");
  addBtn.classList.add("plus");
  addBtn.textContent = "+";

  const newLi = document.createElement("li");
  newLi.innerHTML = listItem.innerHTML;
  tochoseList.appendChild(newLi);
  listItem.remove();
};

const updatePrice = () => {
  if (leasingBtn.checked) {
    priceInForm.textContent = (originalPrice * 1.3).toFixed(0);
  } else {
    priceInForm.textContent = originalPrice.toFixed(0);
  }
};

const updateAndClear = () => {
  updatePrice();

  const chosenAcc = chosenList.querySelectorAll("li");
  if (chosenAcc.length !== 0) {
    chosenAcc.forEach((item) => {
      const newItem = document.createElement("li");
      newItem.innerHTML = item.innerHTML;
      const button = newItem.querySelector(".minus");
      button.classList.remove("minus");
      button.classList.add("plus");
      button.textContent = "+";

      tochoseList.appendChild(newItem);
      item.remove();
    });
  }
};

const today = new Date();
const minDate = new Date(today);
minDate.setDate(minDate.getDate() + 14);
const minDateFormatted = minDate.toISOString().split("T")[0];
pickupDateInput.setAttribute("min", minDateFormatted);

const backToData = () => {
  thankPage.classList.add("hidden");
  formCar.classList.remove("hidden");
};

// Events

choiceBtn.forEach((button) => {
  button.addEventListener("click", () => carChoice(button));
});

backBtn.addEventListener("click", backToCarList);

pickupDateInput.addEventListener("change", weekend);

buyBtn.addEventListener("click", formValidation);

tochoseList.addEventListener("click", (e) => {
  const btn = e.target.closest(".plus");
  if (btn) {
    addAccesory(btn);
  }
});

chosenList.addEventListener("click", (e) => {
  const btn = e.target.closest(".minus");
  if (btn) {
    removeAccesory(btn);
  }
});

leasingBtn.addEventListener("change", updateAndClear);
cashBtn.addEventListener("change", updateAndClear);

thankBackBtn.addEventListener("click", backToData);
