const input = document.getElementById("inputText");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");

function addItem() {
    const text = input.value.trim();
    if (text === "") return;

    const item = document.createElement("div");
    item.className = "item";

    const span = document.createElement("span");
    span.textContent = text;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "deleteBtn";

    del.addEventListener("click", () => {
        item.style.transform = "scale(0.9)";
        item.style.opacity = "0";
        setTimeout(() => item.remove(), 200);
    });

    item.appendChild(span);
    item.appendChild(del);
    list.appendChild(item);

    input.value = "";
}

addBtn.addEventListener("click", addItem);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addItem();
    }
});
