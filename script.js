const input = document.querySelector("input");
const addBtn = document.querySelector("button");
const inputContainer = document.querySelector(".input-container");
const noteContainer = document.querySelector(".note-container");
const resetBtn = document.getElementById("reset");
const sort = document.querySelector("#sort");
let notes = [];
let isInputVisible = true;
let dragStartIndex;

addBtn.addEventListener("click", () => {
  if (isInputVisible) {
    if (input.value.trim() !== "") {
      notes.push(input.value);
      addNote(notes);
      input.value = "";
      isInputVisible = false;
      inputContainer.style.display = "none";
    } else {
      alert("Please fill the input!");
    }
  } else {
    inputContainer.style.display = "flex";
    isInputVisible = true;
  }
});

function addNote(arr) {
  noteContainer.innerHTML = "";
  let startIndex = 0;
  arr.forEach((element, index) => {
    startIndex++;
    let noteDiv = document.createElement("div");
    noteDiv.draggable = "true";
    noteDiv.classList.add("note");
    let note = document.createElement("p");
    note.textContent = `${startIndex}) ${element}`;
    noteDiv.setAttribute("data-index", index);
    let removeBtn = document.createElement("i");
    removeBtn.classList.add("ri-close-line");
    noteDiv.append(note, removeBtn);
    noteContainer.append(noteDiv);

    noteDiv.addEventListener("dragstart", dragStart);
    noteDiv.addEventListener("dragover", dragOver);
    noteDiv.addEventListener("drop", drop);
    noteDiv.addEventListener("dragenter", dragEnter);
    noteDiv.addEventListener("dragleave", dragLeave);

    removeBtn.addEventListener("click", () => {
      notes = notes.filter((value, elementIndex) => elementIndex !== index);
      addNote(notes);
      if (notes.length === 0) {
        noteContainer.style.borderColor = "transparent";
        inputContainer.style.display = "flex";
      }
    });
  });
  noteContainer.style.borderColor = "#c4c4c4";
}

resetBtn.addEventListener("click", () => {
  input.value = "";
});

let isSorted = false;
sort.addEventListener("click", () => {
  if (notes.length) {
    if (!isSorted) {
      notes.sort((a, b) => (a > b ? -1 : 1));
      isSorted = true;
      sort.style.transform = "rotate(180deg)";
    } else {
      notes.sort((a, b) => (a > b ? 1 : -1));
      sort.style.transform = "rotate(0deg)";
      isSorted = false;
    }
    addNote(notes);
  } else {
    alert("There is no any note!");
  }
});

function dragStart(e) {
  dragStartIndex = +this.getAttribute("data-index");
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add("drag-over");
}

function dragLeave() {
  this.classList.remove("drag-over");
}

function dragOver(e) {
  e.preventDefault();
}

function drop() {
  this.classList.remove("drag-over");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  addNote(notes);
}

function swapItems(fromIndex, toIndex) {
  const itemOne = notes[fromIndex];
  notes[fromIndex] = notes[toIndex];
  notes[toIndex] = itemOne;
}
