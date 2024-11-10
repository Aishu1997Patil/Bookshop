let url = "https://books-backend.p.goit.global/books/top-books";
let url2 = "https://books-backend.p.goit.global/books/category-list";
let categoryUrl = "https://books-backend.p.goit.global/books/category?category=";

const API_BASE_URL = "https://books-backend.p.goit.global/books";
const TOP_BOOKS_URL = `${API_BASE_URL}/top-books`;
const CATEGORY_LIST_URL = `${API_BASE_URL}/category-list`;
const CATEGORY_URL = `${API_BASE_URL}/category?category=`;

const categoriesContainer = document.querySelector("#type");
const booksContainer = document.querySelector(".all-book");

// Fetch Data Function
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Display Book Categories
function displayCategories(categories) {
    categoriesContainer.innerHTML = "";
    categories.forEach(category => {
        const categoryElement = document.createElement("p");
        categoryElement.textContent = category.list_name;
        categoriesContainer.appendChild(categoryElement);
    });
}

// Display Top Books
function displayTopBooks(bookArray) {
    booksContainer.innerHTML = "";
    bookArray.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("book-container");
        categoryDiv.innerHTML = `
            <h2>${category.list_name}</h2>
            <div class="book-card"></div>
            <button class="see-more" data-category="${category.list_name}">See more</button>
        `;
        booksContainer.appendChild(categoryDiv);

        const bookCard = categoryDiv.querySelector(".book-card");
        category.books.forEach(book => {
            const bookItem = `
                <div class="book-item">
                    <img src="${book.book_image}" alt="${book.title}" width="200" height="250" />
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                </div>
            `;
            bookCard.innerHTML += bookItem;
        });

        const seeMoreButton = categoryDiv.querySelector(".see-more");
        seeMoreButton.addEventListener("click", () => handleSeeMore(category.list_name));
    });
}

// Handle "See More" Button Click
async function handleSeeMore(category) {
    const formattedCategory = encodeURIComponent(category);
    try {
        const booksByCategory = await fetchData(CATEGORY_URL + formattedCategory);
        displayBooksByCategory(booksByCategory);
    } catch (error) {
        console.error("Error fetching category books:", error);
    }
}

// Display Books for Selected Category
function displayBooksByCategory(bookArray) {
    booksContainer.innerHTML = "";
    bookArray.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book-card2");
        bookDiv.innerHTML = `
            <div>
                <img src="${book.book_image}" alt="${book.title}" width="200" height="250" />
                <h3>${book.title}</h3>
                <p>${book.author}</p>
            </div>
        `;
        booksContainer.appendChild(bookDiv);
    });
}

// Dark Mode Toggle
document.querySelector(".toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Initialize
(async function initialize() {
    const categories = await fetchData(CATEGORY_LIST_URL);
    if (categories) displayCategories(categories);

    const topBooks = await fetchData(TOP_BOOKS_URL);
    if (topBooks) displayTopBooks(topBooks);
})();
