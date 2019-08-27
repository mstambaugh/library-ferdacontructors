// Business Logic for Library
function Library() {
  this.books = [];
  this.currentId = 0;
}

Library.prototype.addBook = function(book) {
  book.id = this.assignId();
  this.books.push(book);
}

Library.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

Library.prototype.findBook = function(id) {
  for (var i = 0; i < this.books.length; i++) {
    if (this.books[i]) {
      if (this.books[i].id == id) {
        return this.books[i];
      }
    }
  };
  return false;
}

Library.prototype.deleteBook = function(id) {
  for (var i = 0; i < this.books.length; i++) {
    if (this.books[i]) {
      if (this.books[i].id == id) {
        delete this.books[i];
        return true;
      }
    }
  };
  return false;
}


// Business Logic for Books

function Book(title, author, genre, rating, available = true) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.rating = rating;
  this.available = available;
  // this.id = id;
}

Book.prototype.work = function() {
  return this.title + " By: " + this.author
}


// User Interface Logic

var library = new Library();

function displayWorkDetails(libraryToDisplay) {
  var booksList = $("ul#books");
  var htmlForBooks = "";
  libraryToDisplay.books.forEach(function(book) {
    htmlForBooks += "<li id=" + book.id + ">" + book.title + "</li>";
  });
  booksList.html(htmlForBooks);
};

function showBook(bookId) {
  var book = library.findBook(bookId);
  $("#show-book").show();
  $(".title").html(book.title)
  $(".author").html(book.author)
  $(".genre").html(book.genre)
  $(".rating").html(book.rating)
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + book.id + ">Delete</button>");
  if (book.available = false) {
    $("#show-book").addClass("notavailable")
    $("#show-book").removeClass("inLibrary")
  } else if (book.available = true){
    $("#show-book").addClass("inLibrary")
    $("#show-book").removeClass("notavailable")
  }
}

function attachBookListeners() {
  $("ul#books").on("click", "li", function() {
    showBook(this.id);
  });
    $("#buttons").on("click", ".deleteButton", function() {
    library.deleteBook(this.id);
    $("#show-book").hide(library);
    displayWorkDetails(library);
  });
};

$(document).ready(function() {
  attachBookListeners();
  $("form#new-book").submit(function(event) {
    event.preventDefault();
    var inputtedTitle = $("input#new-title").val();
    var inputtedAuthor = $("input#new-author").val();
    var inputtedGenre = $("input#new-genre").val();
    var inputtedRating = $("input#new-rating").val();
    var newBook = new Book(inputtedTitle, inputtedAuthor, inputtedGenre, inputtedRating);
    library.addBook(newBook);
    displayWorkDetails(library);
  })
})
