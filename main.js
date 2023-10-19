const submitBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('reset');
const container = document.getElementById('film-info');
const titleSearch = document.getElementById('titleSearch');
const optionalBtn = document.getElementById('optional');

const div = document.createElement('div');
const search = document.getElementById('search');

const yyyy = document.getElementById('yyyy');
const adult = document.getElementById('adult');

let nextBtnPrinted = false;
let i = 0;

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

const searchMovies = async (page = 1) => {
  try {
    const res = await axios.get(
      'https://api.themoviedb.org/3/search/movie?' +
        'query=' +
        // titleSearch.value +
        'club' +
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

    let count = 0;
    res.data.results.length;

    while (count < 20) {
      if (i < res.data.total_results) {
        console.log(i + ' i');
        console.log(res.data.total_results + ' total');
        console.log(count + ' count');
        const resPoster = res.data.results[i].poster_path;
        const resTitle = res.data.results[i].original_title;
        const resGenre = res.data.results[i].genre_ids;
        const resOverview = res.data.results[i].overview;
        const resPopularity = res.data.results[i].popularity;
        let resReleaseDate = res.data.results[i].release_date;
        const resVoteAverage = res.data.results[i].vote_average;
        const resAdult = res.data.results[i].adult;
        let iPages = res.data.page;

        container.appendChild(div);

        let img = document.createElement('img');
        img.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + resPoster);
        div.appendChild(img);

        let h4 = document.createElement('h4');
        h4.innerHTML = resGenre + ' genre/s';
        div.appendChild(h4);

        let h1 = document.createElement('h1');
        h1.innerText = resTitle;
        div.appendChild(h1);

        let pOverview = document.createElement('p');
        pOverview.innerHTML = resOverview;
        div.appendChild(pOverview);

        let pPopularity = document.createElement('p');
        pPopularity.innerHTML = resPopularity + ' popularity';
        div.appendChild(pPopularity);

        let pReleaseDate = document.createElement('p');
        const reverseDate = resReleaseDate => {
          return resReleaseDate.split('-').reverse().join('-');
        };
        resReleaseDate = reverseDate(resReleaseDate);
        pReleaseDate.innerHTML = resReleaseDate;
        div.appendChild(pReleaseDate);

        let pVoteAverage = document.createElement('p');
        pVoteAverage.innerHTML = resVoteAverage + ' average vote';
        div.appendChild(pVoteAverage);

        i++;
        count++;
      }
    }

    const totalPages = res.data.total_pages;
    if (totalPages > 1) {
      console.log(totalPages);
      let ppage = document.createElement('p');
      ppage.innerHTML = page;
      search.appendChild(ppage);
      console.log(ppage);

      if (!nextBtnPrinted) {
        nextBtnPrinted = true;
        let nextBtn = document.createElement('button');
        nextBtn.setAttribute('id', 'nextBtn');
        nextBtn.innerText = 'next';
        search.appendChild(nextBtn);
      }

      nextBtn.addEventListener('click', () => {
        div.innerHTML = '';
        ppage.innerHTML = '';
        page++;
        searchMovies(page);
      });
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
