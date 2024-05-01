const getDataButton = document.querySelector(".header-button");
const ListDiv = document.querySelector(".table-list");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#search");
const selectDate = document.querySelector(".date-filters");
const selectPrice=document.querySelector(".price-filters")
let transactionList = [];
const filter = {
  searchedItem: "",
};

getDataButton.addEventListener("click", getData);

function getData() {
  axios
    .get("http://localhost:3000/transactions")
    .then((res) => {
      transactionList = res.data;
      showItems(transactionList);
    })
    .catch((error) => console.log(error.message));
}
function showItems(items) {
  ListDiv.innerHTML = "";
  items=items.filter((item)=>item.refId!==undefined)
  items.forEach((item, index) => {
    const listRows = document.createElement("tr");
    listRows.classList.add("transData");
    listRows.innerHTML = `
        <td>${index + 1}</td>
        <td class=${
          item.type === "افزایش اعتبار"
            ? "transaction-success"
            : "transaction-unsuccess"
        }>${item.type}</td>
        <td>${item.price}</td>
        <td>${item.refId}</td>
        <td>${new Date(item.date).toLocaleDateString("fa-IR")} , ${new Date(
      item.date
    ).toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    })} </td>`;
    ListDiv.appendChild(listRows);
  });
}
// ListDiv.innerHTML=""
selectDate.addEventListener("change", (e) => {
  filterValue = e.target.value;
  sortByDate(filterValue);
});
selectPrice.addEventListener("change", (e) => {
  filterValue = e.target.value;
  sortByPrice(filterValue);
});

function sortByDate(filterValue) {
  switch (filterValue) {
    case "asc": {
      axios
        .get(`http://localhost:3000/transactions?_sort=date&_order=asc`)
        .then((res) => showItems(res.data))
        .catch((err) => console.log(err));
      break;
    }
    case "dec": {
      axios
        .get(`http://localhost:3000/transactions?_sort=date&_order=desc`)
        .then((res) => showItems(res.data))
        .catch((err) => console.log(err));
      break;
    }
    default: {
      axios
        .get("http://localhost:3000/transactions")
        .then((res) => showItems(res.data))
        .catch((error) => console.log(error.message));
    }
  }
}
function sortByPrice(filterValue) {
  switch (filterValue) {
    case "asc": {
      axios
        .get(`http://localhost:3000/transactions?_sort=price&_order=asc`)
        .then((res) => showItems(res.data))
        .catch((err) => console.log(err));
      break;
    }
    case "dec": {
      axios
        .get(`http://localhost:3000/transactions?_sort=price&_order=desc`)
        .then((res) => showItems(res.data))
        .catch((err) => console.log(err));
      break;
    }
    default: {
      axios
        .get("http://localhost:3000/transactions")
        .then((res) => showItems(res.data))
        .catch((error) => console.log(error.message));
    }
  }
}
searchInput.addEventListener("change", (e) => {
  // searcheditem = e.target.value;
  axios
    .get(`http://localhost:3000/transactions?refId_like=${e.target.value}`)
    .then((res) => showItems(res.data))
    .catch((err) => console.log(err));
});

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
});
