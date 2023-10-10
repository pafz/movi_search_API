const btnSubmit = document.getElementById('submit');
const btnReset = document.getElementById('reset');
const container = document.getElementById('film-info');
console.log(container);

const startAPI = async e => {
  e.preventDefault();

  let res = [];
  console.log('hi');

  try {
    res = await axios.get(
      'https://api.themoviedb.org/3/movie/550?api_key=600dc298bedbd11d25118262a343371d'
    );

    const resPoster = res.data.poster_path;
    const resTitle = res.data.original_title;
    const resGenre = res.data.genres[0].name;
    const resOverview = res.data.overview;

    const div = document.createElement('div');
    console.log(container);
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
  } catch (err) {
    console.error(err);
  }
};

const resetApi = async e => {
  e.preventDefault();
  console.log('hi');
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
