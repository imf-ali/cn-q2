async function loadData(url) {
  try {
    const data = await fetch(`${url}?ts=1714294973&apikey=5cd82bf37345b780a69ad61949ca3d59&hash=fcb99e606cf4be17aef94d5178123f7b`)
      .then(res => res.json());
    return data;
  } catch (err) {
    console.log('Some error occurred');
  }
}

function setProfile({ thumbnail, name }){
  const porfileDiv = document.getElementById('profile');
  porfileDiv.innerHTML = `
    <img src="${thumbnail.path}.jpg" alt="">
    <h4>${name}</h4>
  `;
}

function setHeroData({ comics, series, stories, events }) {
  const comicsDiv = document.getElementById('comics');
  const seriesDiv = document.getElementById('series');
  const storiesDiv = document.getElementById('stories');
  const eventsDiv = document.getElementById('events');

  comics?.items.forEach(async (comic) => {
    const comicData = await loadData(`${comic.resourceURI}`);
    comicsDiv.innerHTML += `
      <div id="item-name">
        <img src="${comicData.data.results[0].thumbnail.path}.jpg" />
        <div>${comic.name}</div>
      </div>
    `;
  })

  series?.items.forEach(async (comic) => {
    const comicData = await loadData(`${comic.resourceURI}`);
    seriesDiv.innerHTML += `
      <div id="item-name">
        <img src="${comicData.data.results[0].thumbnail.path}.jpg" />
        <div>${comic.name}</div>
      </div>
    `;
  })

  stories?.items.forEach(async (comic) => {
    storiesDiv.innerHTML += `
      <div id="item-name">
        <div>${comic.name}</div>
      </div>
    `;
  })

  events?.items.forEach(async (comic) => {
    const comicData = await loadData(`${comic.resourceURI}`);
    eventsDiv.innerHTML += `
      <div id="item-name">
        <img src="${comicData.data.results[0].thumbnail.path}.jpg" />
        <div>${comic.name}</div>
      </div>
    `;
  })
}


document.addEventListener('DOMContentLoaded', async () => {
  const query = window.location.search;
  const params = new URLSearchParams(query);
  const heroId = params.get('id');
  const masterData = await loadData(`https://gateway.marvel.com/v1/public/characters/${heroId}`);
  setProfile(masterData.data.results[0]);
  setHeroData(masterData.data.results[0]);
})