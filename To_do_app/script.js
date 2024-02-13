// selection of all elements
const form = document.querySelector("#list-form");
const input = document.querySelector("#input-search");
const addBtn = document.querySelector("#addition-Btn");
const itemsList = document.querySelector("#items-list");

form.addEventListener("submit", (e) => {
    e.preventDefault();
});

function add() {
    addBtn.addEventListener("click", () => {
        let inputVal = input.value;
        let item = document.createElement("li");
        let itemId = Date.now(); // Unique ID for each item
        item.id = itemId;
        item.innerHTML = inputVal;
        itemsList.appendChild(item);
        input.value = "";

        saveItemsFromLocalStorage();

        item.addEventListener("click", () => {
            itemsList.removeChild(item);
            saveItemsFromLocalStorage();
        });
    });
}

function saveItemsFromLocalStorage() {
    let items = document.querySelectorAll("#items-list li");
    let itemsArray = Array.from(items).map(item => item.innerHTML);
    localStorage.setItem("items", JSON.stringify(itemsArray));
}

function getItemsFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
        items.forEach(item => {
            let listItem = document.createElement("li");
            listItem.innerHTML = item;
            itemsList.appendChild(listItem);
        });
    }
}

window.addEventListener("load", getItemsFromLocalStorage);
add();
