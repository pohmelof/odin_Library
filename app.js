function Book(obj) {
  this.title = obj.title;
  this.author = obj.author;
  this.numPages = obj.numPages;
  this.read = obj.read;
  this.coverColor = obj.coverColor;
  this.textColor = obj.textColor;
}

// Book.prototype.setRead = () => {
//   this.read = !this.read;
// };

// variables
let myLibrary = [
  {
    title: "Mistborn",
    author: "Brandon Sanderson",
    numPages: 746,
    read: false,
    coverColor: "rgb(180, 74, 12)",
    textColor: "rgb(218, 202, 60)",
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    numPages: 456,
    read: true,
    coverColor: "rgb(53, 114, 29)",
    textColor: "rgb(218, 202, 60)",
  },
  {
    title: "Dandelion Wine",
    author: "Ray Bradbury",
    numPages: 281,
    read: true,
    coverColor: "rgb(69, 104, 121)",
    textColor: "rgb(218, 202, 60)",
  },
];

let myLibraryReset = [
  {
    title: "Mistborn",
    author: "Brandon Sanderson",
    numPages: 746,
    read: false,
    coverColor: "rgb(180, 74, 12)",
    textColor: "rgb(218, 202, 60)",
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    numPages: 456,
    read: true,
    coverColor: "rgb(53, 114, 29)",
    textColor: "rgb(218, 202, 60)",
  },
  {
    title: "Dandelion Wine",
    author: "Ray Bradbury",
    numPages: 281,
    read: true,
    coverColor: "rgb(69, 104, 121)",
    textColor: "rgb(218, 202, 60)",
  },
];

function renderLibrary(arr) {
  const booksHTML = arr.map((item) => {
    return `<div class="book" style='--cover-color: ${
      item.coverColor
    }; --title-text-color: ${item.textColor}'>
                  <div class="cover">
                  <p class="author">${item.author}</p>
                  <h2 class="title">${item.title}</h2>
                  <p class="pages">${item.numPages} pages</p>
                  </div>
                  <div class="pages-right"></div>
                  <div class="pages-bottom"></div>
                  <button class="delete"  data-index="${myLibrary.indexOf(
                    item
                  )}">
                    <img class='trash' src='./delete.svg' alt="">
                  </button>
                  <div class="read">
                  <button class="set-read">
                      ${
                        item.read
                          ? `<span class='read-true'  data-index="${myLibrary.indexOf(
                              item
                            )}">✓</span>`
                          : `<span class='read-false'  data-index="${myLibrary.indexOf(
                              item
                            )}">✕</span>`
                      }
                  </button>
                  <div>READ</div>
                  </div>
              </div>`;
  });
  document.querySelector(".container").innerHTML = booksHTML.join("");

  addButtonsFunc();
}

function addButtonsFunc() {
  const setReadBtns = document.querySelectorAll(".set-read");
  const deleteBtns = document.querySelectorAll(".delete");

  setReadBtns.forEach((item) => {
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (e.target.innerText === "✓") {
        e.target.innerText = "✕";
        e.target.classList = "read-false";
        myLibrary[index].read = false;
        saveToLocalStorage();
      } else if (e.target.innerText === "✕") {
        e.target.innerText = "✓";
        e.target.classList = "read-true";
        myLibrary[index].read = true;
        saveToLocalStorage();
      }
    });
  });

  deleteBtns.forEach((item) => {
    item.addEventListener("click", (e) => {
      const index = e.target.parentElement.dataset.index;
      myLibrary.splice(index, 1);
      saveToLocalStorage();
      renderLibrary(myLibrary);
    });
  });
}

function saveToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getFromLocalStorage() {
  if (localStorage.getItem("myLibrary") === null) return;
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

const addBookForm = document.querySelector(".add-book-form");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    title: addBookForm.querySelector("#bookTitle").value,
    author: addBookForm.querySelector("#author").value,
    numPages: parseInt(addBookForm.querySelector("#numPages").value),
    read: addBookForm.querySelector("#readStatus").checked,
    coverColor: addBookForm.querySelector("#coverColor").value,
    textColor: addBookForm.querySelector("#textColor").value,
  };
  myLibrary.push(new Book(formData));
  saveToLocalStorage();
  renderLibrary(myLibrary);
  addBookForm.reset();
  addBookForm.classList.add("form-hidden");
  document.querySelector(".bg-shield").classList.toggle("off");
});

const addBook = document.querySelector(".new-book");
const closeFormBtn = document.querySelector(".close");
const resetBookshelf = document.querySelector(".reset-bookshelf");

resetBookshelf.addEventListener("click", () => {
  localStorage.removeItem("myLibrary");
  myLibrary = [...myLibraryReset];
  renderLibrary(myLibrary);
});
addBook.addEventListener("click", () => {
  addBookForm.classList.remove("form-hidden");
  document.querySelector(".bg-shield").classList.toggle("off");
});
closeFormBtn.addEventListener("click", () => {
  addBookForm.classList.add("form-hidden");
  document.querySelector(".bg-shield").classList.toggle("off");
});

// filters
const showUnread = document.querySelector(".unread");
const showRead = document.querySelector(".show-read");
const filterBtns = document.querySelectorAll(".filter");

filterBtns.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target === showUnread) {
      if (e.target.classList.contains("btn-active")) {
        e.target.classList.toggle("btn-active");
        renderLibrary(myLibrary);
      } else {
        e.target.classList.toggle("btn-active");
        showRead.classList.remove("btn-active");
        const unreadLibrary = myLibrary.filter((item) => !item.read);
        renderLibrary(unreadLibrary);
      }
    } else if (e.target === showRead) {
      if (e.target.classList.contains("btn-active")) {
        e.target.classList.toggle("btn-active");
        renderLibrary(myLibrary);
      } else {
        e.target.classList.toggle("btn-active");
        showUnread.classList.remove("btn-active");
        const readLibrary = myLibrary.filter((item) => item.read);
        renderLibrary(readLibrary);
      }
    }
  });
});

window.addEventListener("DOMContentLoaded", getFromLocalStorage);

window.addEventListener("DOMContentLoaded", () => renderLibrary(myLibrary));
