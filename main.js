const submitBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('reset');
const containerInfo = document.getElementById('film-info');
const titleSearch = document.getElementById('titleSearch');
const optionalBtn = document.getElementById('optional');

const search = document.getElementById('search');

const yyyy = document.getElementById('yyyy');
const adult = document.getElementById('adult');

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
        // 'club' +
        '&year=' +
        yyyy.value +
        '&page=' +
        page +
        // '&year=1984' +
        // '&include_adult=' +
        // adult.checked +
        '&api_key=600dc298bedbd11d25118262a343371d'
      // +
      // '&include_adult=false&language=en-US&page=1&api_key=600dc298bedbd11d25118262a343371d' +
      // yyyy.value +
      // adult.value
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
        let img = document.createElement('img');
        img.setAttribute(
          'src',
          'https://image.tmdb.org/t/p/w500/' + poster_path
        );
        containerInfo.appendChild(img);
        let h4 = document.createElement('h4');
        h4.innerHTML = genre_ids + ' genre/s';
        containerInfo.appendChild(h4);
        let h1 = document.createElement('h1');
        h1.innerText = original_title;
        containerInfo.appendChild(h1);
        let pOverview = document.createElement('p');
        pOverview.innerHTML = overview;
        containerInfo.appendChild(pOverview);
        let pPopularity = document.createElement('p');
        pPopularity.innerHTML = popularity + ' popularity';
        containerInfo.appendChild(pPopularity);
        let pReleaseDate = document.createElement('p');
        const reverseDate = release_date => {
          return release_date.split('-').reverse().join('-');
        };
        release_date = reverseDate(release_date);
        pReleaseDate.innerHTML = release_date;
        containerInfo.appendChild(pReleaseDate);
        let pVoteAverage = document.createElement('p');
        pVoteAverage.innerHTML = vote_average + ' average vote';
        containerInfo.appendChild(pVoteAverage);
      }
    );

    const totalPages = res.data.total_pages;

    if (totalPages > 1 && page <= totalPages) {
      if (!nextBtnPrinted) {
        nextBtnPrinted = true;
        let nextBtn = document.createElement('button');
        nextBtn.setAttribute('id', 'nextBtn');
        nextBtn.innerText = 'next page 2';
        search.appendChild(nextBtn);

        nextBtn.addEventListener('click', () => {
          containerInfo.innerHTML = '';
          nextBtn.innerText = 'next page' + (page + 2);
          page++;
          searchMovies();
        });
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
  } catch (err) {
    console.error(err);
  }
};

submitBtn.addEventListener('click', () => {
  searchMovies();
});
resetBtn.addEventListener('click', resetApi);
optionalBtn.addEventListener('click', toggleFilters);
