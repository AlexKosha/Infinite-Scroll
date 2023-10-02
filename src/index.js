// 92a9a9e3708a3e9451b7037d5906879a
// https://api.themoviedb.org/3
// /trending/movie/

const refs = {
  list : document.querySelector('.list'),
  LoadMore : document.querySelector('.js-load-more')
}

let page = 1;

refs.LoadMore.addEventListener('click', onLoadMore)

serviceMovie()
.then(data => {
  console.log(data);
  refs.list.insertAdjacentHTML('beforeend', createMarkup(data.results))
  if(data.page < data.total_pages){
refs.LoadMore.classList.replace('hidden', 'load-more')
  }
}).catch(err => console.log(err))

function serviceMovie (page = 1){
  const API_KEY = '92a9a9e3708a3e9451b7037d5906879a'
  const BASE_URL = 'https://api.themoviedb.org/3'
  const END_POINT = 'trending/movie/week'

  const params = new URLSearchParams ({
    api_key : API_KEY,
    page,
  })

  return fetch(`${BASE_URL}/${END_POINT}?${params}`).then(res => {
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`)
    }
     return res.json();
  })
}

function onLoadMore({target}) {
  page += 1.
  target.disabled = true;

  serviceMovie(page)
    .then(data => {

      refs.list.insertAdjacentHTML('beforeend', createMarkup(data.results))
      
      if(data.page >= data.total_pages){
        refs.LoadMore.classList.replace('load-more' , 'hidden')
      }
    })
    .catch(err => console.log(err))
    .finally(()=> (target.disabled = false))
}

function createMarkup(arr){
  return arr.map(({poster_path, original_title,release_date, vote_average })=>
  `<li class='items'>
    <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title}">
      <div>
        <h2>${original_title}</h2>
        <p>${release_date}</p>
        <p>${vote_average}</p>
      </div>
  </li>`)
  .join('')
}