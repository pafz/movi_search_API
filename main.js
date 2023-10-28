const form = document.getElementById('form');
const submitBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('reset');
const containerInfo = document.getElementById('film-info');
const titleSearch = document.getElementById('titleSearch');
const optionalBtn = document.getElementById('optional');
const optionalDiv = document.getElementById('optionalDiv');
const yyyy = document.getElementById('yyyy');
const search = document.getElementById('search');
const topBtn = document.getElementById('topBtn');

let nextBtnPrinted = false;
let count = 0;
let page = 1;

const toggleFilters = async e => {
  e.preventDefault();
  try {
    if (optionalDiv.style.display !== 'block') {
      optionalDiv.style.display = 'block';
    } else {
      optionalDiv.style.display = 'none';
    }
  } catch (err) {
    console.log(err);
  }
};

const searchMovies = async () => {
  try {
    const res = await axios.get(
      'https://api.themoviedb.org/3/search/movie?' +
        'query=' +
        titleSearch.value +
        '&year=' +
        yyyy.value +
        '&page=' +
        page +
        '&api_key=600dc298bedbd11d25118262a343371d' +
        '&with_genres=35|37|80'
    );
    console.log(res);

    let i = 0;

    res.data.results.forEach(
      ({
        poster_path,
        original_title,
        genre_ids,
        overview,
        popularity,
        release_date,
        vote_average,
      }) => {
        let divContainer = document.createElement('div');
        containerInfo.appendChild(divContainer);

        let img = document.createElement('img');
        img.setAttribute(
          'src',
          'https://image.tmdb.org/t/p/w500/' + poster_path
        );
        divContainer.appendChild(img);
        let h4 = document.createElement('h4');
        h4.innerHTML = genre_ids + ' genre/s';
        divContainer.appendChild(h4);
        let h1 = document.createElement('h1');
        h1.innerText = original_title;
        divContainer.appendChild(h1);
        let pOverview = document.createElement('p');
        pOverview.innerHTML = overview;
        divContainer.appendChild(pOverview);
        let pPopularity = document.createElement('p');
        pPopularity.innerHTML = popularity + ' popularity';
        divContainer.appendChild(pPopularity);
        let pReleaseDate = document.createElement('p');
        const reverseDate = release_date => {
          return release_date.split('-').reverse().join('-');
        };
        release_date = reverseDate(release_date);
        pReleaseDate.innerHTML = release_date;
        divContainer.appendChild(pReleaseDate);
        let pVoteAverage = document.createElement('p');
        pVoteAverage.innerHTML = vote_average + ' average vote';
        divContainer.appendChild(pVoteAverage);
      }
    );

    const totalPages = res.data.total_pages;

    if (totalPages > 1) {
      if (page <= totalPages) {
        if (!nextBtnPrinted) {
          nextBtnPrinted = true;

          let previousBtn = document.createElement('button');
          previousBtn.setAttribute('id', 'previousBtn');
          previousBtn.setAttribute('type', 'button');
          previousBtn.innerText = 'previous';
          optionalBtn.after(previousBtn);

          let nextBtn = document.createElement('button');
          nextBtn.setAttribute('id', 'nextBtn');
          nextBtn.setAttribute('type', 'button');
          nextBtn.innerText = 'next page 2';
          optionalBtn.after(nextBtn);

          nextBtn.addEventListener('click', () => {
            containerInfo.innerHTML = '';
            nextBtn.innerText = 'next page ' + (page + 2);
            page++;
            searchMovies();
            if (page == totalPages) {
              let nextBtn = document.getElementById('nextBtn');
              nextBtn.setAttribute('disabled', 'disabled');
            }
          });
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const resetApi = async e => {
  e.preventDefault();
  try {
    const empty = e => {
      while (e.firstElementChild) {
        e.firstElementChild.remove();
      }
    };
    let parent = document.getElementById('film-info');
    empty(parent);

    let nextBtn = document.getElementById('nextBtn');
    nextBtn?.remove();
    nextBtnPrinted = false;
    page = 1;
    titleSearch.value = '';
    yyyy.value = '';
  } catch (err) {
    console.error(err);
  }
};

const goTop = async e => {
  e.preventDefault();
  try {
    document.documentElement.scrollTop = 0;
  } catch (err) {
    console.error(err);
  }
};

submitBtn.addEventListener('click', () => {
  searchMovies();
});
resetBtn.addEventListener('click', resetApi);
optionalBtn.addEventListener('click', toggleFilters);
topBtn.addEventListener('click', goTop);
