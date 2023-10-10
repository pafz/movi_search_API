const btnSubmit = document.getElementById('submit');
const btnReset = document.getElementById('reset');
const container = document.getElementById('film-info');
const titleSearch = document.getElementById('title');

const startAPI = async e => {
  e.preventDefault();

  try {
    const res = await axios.get(
      'https://api.themoviedb.org/3/search/movie?query=' +
        titleSearch.value +
        '&include_adult=false&language=en-US&page=1&api_key=600dc298bedbd11d25118262a343371d'
    );
    console.log(res);
    console.log(res.data.results.length);
    let i = 0;
    while (i < res.data.results.length) {
      const resPoster = res.data.results[i].poster_path;
      const resTitle = res.data.results[i].original_title;
      const resGenre = res.data.results[i].genre_ids;
      const resOverview = res.data.results[i].overview;

      const div = document.createElement('div');
      container.appendChild(div);

      let img = document.createElement('img');
      img.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + resPoster);
      div.appendChild(img);

      let h4 = document.createElement('h4');
      h4.innerHTML = resGenre;
      div.appendChild(h4);

      let h1 = document.createElement('h1');
      h1.innerText = resTitle;
      div.appendChild(h1);

      let p = document.createElement('p');
      p.innerHTML = resOverview;
      div.appendChild(p);
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

btnSubmit.addEventListener('click', startAPI);
btnReset.addEventListener('click', resetApi);
