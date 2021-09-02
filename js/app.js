
const searchField = document.getElementById('search-field');
const totalResults = document.getElementById('results-found');
const emptyError = document.getElementById('empty-input');
const searchResult = document.getElementById('search-result');
const notFound = document.getElementById('not-found');
const hrLine = document.getElementById('hr-line');

const searchBook = () => {

    const searchText = searchField.value;
    searchField.value = '';
    totalResults.innerText = '';
    if (searchText === '') {
        searchResult.textContent = '';
        hrLine.classList.remove('d-none');
        //error message
        notFound.classList.add('d-none');
        emptyError.classList.remove('d-none');
    }
    else {
        emptyError.classList.add('d-none');
        //get input to search
        const url = (`https://openlibrary.org/search.json?q=${searchText}`);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));

    }

}

const displaySearchResult = booklist => {
    searchResult.textContent = '';
    // console.log(booklist);
    totalResults.innerText = `About ${booklist.numFound} results found.`
    const books = booklist.docs;
    /* console.log(books); */
    if (booklist.numFound === 0) {
        //Error Message
        hrLine.classList.remove('d-none');
        notFound.classList.remove('d-none');
    }
    else {
        hrLine.classList.remove('d-none');
        notFound.classList.add('d-none');

        //get 40 book from total books
        books.slice(0, 40).forEach(book => {

            //error handling defult img  
            book?.cover_i
                ? (imgUrl = `https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`) : (imgUrl = "image/img-error.png");
            //error handling and defult value
            book?.publisher
                ? (publisher = book?.publisher[0]) : (publisher = "not available");
            //error handling and defult value   
            book?.author_name
                ? (authorName = book?.author_name[0]) : (authorName = "not available");
            // create grid card
            const div = document.createElement('div')
            div.classList.add('col');
            div.innerHTML = ` <div class="card shadow h-100">
            <img height="400" src="${imgUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title fs-4 mb-2">${book.title}</h5>
                <p class="fs-6 card-text mb-0"><span class="fw-bold fs-6">Author Name :</span> ${authorName} </p>
                <p class="fs-6 card-text mb-0"><span class="fw-bold fs-6">Publisher :</span> ${publisher} </p>
                <p class="fs-6"><span class="fw-bold fs-6">First Published :</span> ${book?.first_publish_year} </p> 
            </div>
            </div> `;

            searchResult.appendChild(div);
        });
    }

}
