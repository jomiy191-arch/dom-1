const input = document.getElementById("inputText");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const count = document.getElementById("count");

let students = JSON.parse(localStorage.getItem("students")) || [];

function saveLocal() {
    localStorage.setItem("students", JSON.stringify(students));
}

function updateCount() {
    const total = students.length;
    const present = students.filter(s => s.status === "Present").length;
    const absent = total - present;
    count.textContent = `Number of people: ${total}, ✅ ${present}, ❌ ${absent}`;
}

function renderList() {
    list.innerHTML = "";
    students.forEach((student, index) => {
        const item = document.createElement("div");
        item.className = "item";

        const span = document.createElement("span");
        span.textContent = student.name;

        const statusBtn = document.createElement("button");
        statusBtn.textContent = student.status;
        statusBtn.className = "statusBtn";
        statusBtn.style.background = student.status === "Present" ? "rgb(67, 255, 67)" : "rgb(255, 67, 67)";
        statusBtn.addEventListener("click", () => {
            student.status = student.status === "Present" ? "Absent" : "Present";
            saveLocal();
            renderList();
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "editBtn";
        editBtn.addEventListener("click", () => {
            const newName = prompt("Enter name:", student.name);
            if(newName) {
                student.name = newName;
                saveLocal();
                renderList();
            }
        });

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

function addItem() {
    const name = input.value.trim();
    if(!name) {
        alert("Please enter a name!");
        return;
    }
    students.push({name: name, status: "Absent"});
    saveLocal();
    renderList();
    input.value = "";
}

addBtn.addEventListener("click", addItem);
input.addEventListener("keydown", e => {
    if(e.key === "Enter") addItem();
});

renderList();
