const btnSubmit = document.getElementById('submit');
const btnReset = document.getElementById('reset');
const container = document.getElementById('film-info');
const titleSearch = document.getElementById('titleSearch');
const btnOptional = document.getElementById('optional');

const startAPI = async e => {
  e.preventDefault();

  try {
    const res = await axios.get(
      'https://api.themoviedb.org/3/search/movie?query=' +
        titleSearch.value +
        '&include_adult=false&language=en-US&page=1&api_key=600dc298bedbd11d25118262a343371d'
    );
    console.log(res);
    let i = 0;
    while (i < res.data.results.length) {
      const resPoster = res.data.results[i].poster_path;
      const resTitle = res.data.results[i].original_title;
      const resGenre = res.data.results[i].genre_ids;
      const resOverview = res.data.results[i].overview;
      const resPopularity = res.data.results[i].popularity;
      let resReleaseDate = res.data.results[i].release_date;
      const resVoteAverage = res.data.results[i].vote_average;

      const div = document.createElement('div');
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

const optional = async e => {
  e.preventDefault();
  const optionalDiv = document.getElementById('optionalDiv');
  optionalDiv.setAttribute('onclick', 'optional()');
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

btnSubmit.addEventListener('click', startAPI);
btnReset.addEventListener('click', resetApi);
btnOptional.addEventListener('click', optional);
