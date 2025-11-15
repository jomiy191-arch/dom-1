const input = document.getElementById("inputText");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const count = document.getElementById("count");

// LocalStorage dan yuklash
let students = JSON.parse(localStorage.getItem("students")) || [];

function saveLocal() {
    localStorage.setItem("students", JSON.stringify(students));
}

// Counterni yangilash
function updateCount() {
    const total = students.length;
    const present = students.filter(s => s.status === "Kelgan").length;
    const absent = total - present;
    count.textContent = ` Odamlar soni: ${total} ta, ✅ ${present}, ❌ ${absent}`;
}

// Item yaratish
function renderList() {
    list.innerHTML = "";
    students.forEach((student, index) => {
        const item = document.createElement("div");
        item.className = "item";

        const span = document.createElement("span");
        span.textContent = student.name;

        // Status tugmasi
        const statusBtn = document.createElement("button");
        statusBtn.textContent = student.status;
        statusBtn.className = "statusBtn";
        statusBtn.style.background = student.status === "Kelgan" ? "rgb(67, 255, 67)" : "rgb(255, 67, 67)";
        statusBtn.addEventListener("click", () => {
            student.status = student.status === "Kelgan" ? "Kelmagan" : "Kelgan";
            saveLocal();
            renderList();
        });

        // Edit tugmasi
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "editBtn";
        editBtn.addEventListener("click", () => {
            const newName = prompt("Ismni kiriting:", student.name);
            if(newName) {
                student.name = newName;
                saveLocal();
                renderList();
            }
        });

        // Delete tugmasi
        const del = document.createElement("button");
        del.textContent = "Delete";
        del.className = "deleteBtn";
        del.addEventListener("click", () => {
            students.splice(index, 1);
            saveLocal();
            renderList();
        });

        item.appendChild(span);
        item.appendChild(statusBtn);
        item.appendChild(editBtn);
        item.appendChild(del);
        list.appendChild(item);
    });

    updateCount();
}

// Item qo‘shish
function addItem() {
    const name = input.value.trim();
    if(!name) {
        alert("Iltimos, ism kiriting!");
        return;
    }
    students.push({name: name, status: "Kelmagan"});
    saveLocal();
    renderList();
    input.value = "";
}

// Eventlar
addBtn.addEventListener("click", addItem);
input.addEventListener("keydown", e => {
    if(e.key === "Enter") addItem();
});

// Dastlabki render
renderList();
