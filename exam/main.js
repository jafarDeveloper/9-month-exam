const elTemp = document.querySelector(".js_cart_temp").content;
const filmList = document.querySelector(".carts");
const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
let startIdx = 0;
let endIdx = 20;
let count = 1;
setItem("count", `${count}`);
let filmSlice = films.slice(startIdx, endIdx);

function renderFilms(arr) {
    const docFragment = document.createDocumentFragment();
    arr.forEach(function (film) {
        const clone = elTemp.cloneNode(true);
        let filmImg = clone.querySelector(".film_img");
        filmImg.setAttribute("src", `${film.poster}`);
        let filmTitle = clone.querySelector(".name_film");
        filmTitle.textContent = film.title;
        let year = clone.querySelector(".year")
        let relise_value=`${film.release_date}000`
        
        year.textContent= Math.trunc( (relise_value/60000/60/24/365.25)+1970)
        let filmGenre = clone.querySelector(".genre");
        filmGenre.textContent = film.genres.join(" | ");
        let filmOverview = clone.querySelector(".overview");
        filmOverview.textContent = `${film.overview.slice(0, 135)}...`;
            
    });
    filmList.append(docFragment);
}

renderFilms(filmSlice);




previousBtn.addEventListener("click", function (etv) {
    etv.preventDefault();
    if (getItem("count") == 6) {
        startIdx = 20;
        endIdx = 40;
        count--;
        setItem("count", `${count}`);
    } else if (getItem("count") == 5) {
        startIdx = 0;
        endIdx = 20;
        count--;
        setItem("count", `${count}`);
    }  else if (getItem("count") == 4) {
        startIdx = 0;
        endIdx = 20;
        count--;
        setItem("count", `${count}`);
    }  else if (getItem("count") == 3) {
        startIdx = 0;
        endIdx = 20;
        count--;
        setItem("count", `${count}`);
    }else if (getItem("count") == 2) {
        startIdx = 0;
        endIdx = 20;
        count--;
        setItem("count", `${count}`);
    } else if (getItem("count") == 1) {
        alert("Siz birinchi sahifadasiz!");
        return;
    }

    filmList.innerHTML = "";
    filmSlice = films.slice(startIdx, endIdx);
    renderFilms(filmSlice);
});

nextBtn.addEventListener("click", function (etv) {
    etv.preventDefault()
    if (getItem("count") == 1) {
        startIdx = 20;
        endIdx = 40;
        count++;
        setItem("count", `${count}`);
    } else if (getItem("count") == 2) {
        startIdx = 40;
        endIdx = 60;
        count++;
        setItem("count", `${count}`);
    } else if (getItem("count") == 3) {
        alert("Siz oxirgi sahifadasiz!");
        return;
    }

    filmList.innerHTML = "";
    filmSlice = films.slice(startIdx, endIdx);
    renderFilms(filmSlice);
});

