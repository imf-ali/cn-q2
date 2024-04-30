let favList = [];

async function loadData(url) {
  try {
    const data = await fetch(`${url}?ts=1714294973&apikey=5cd82bf37345b780a69ad61949ca3d59&hash=fcb99e606cf4be17aef94d5178123f7b&limit=100`)
      .then(res => res.json());
    return data;
  } catch (err) {
    console.log('Some error occurred');
  }
}

function setMasterList(dataList) {
  const masterList = document.getElementById('master-list');
  let htmlString = '';
  dataList.forEach((data, index) => {
    htmlString += `
      <div id="hero-item">
        <button id="favorite-btn">Add to favourite</button>
        <img src="${data.thumbnail.path}.jpg" alt="">
        <div id="hero-name">
          <h4>${data.name}</h4>
        </div>
      </div>
    `;
  });
  masterList.innerHTML = htmlString;

  const btnList = masterList.querySelectorAll('button');
  btnList.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      favList.push(dataList[index]);
      localStorage.setItem('favList', JSON.stringify(favList));
    });
  });

  const heroItemList = masterList.querySelectorAll('#hero-item');
  heroItemList.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href= `template/hero.html?id=${dataList[index].id}`;
    });
  });
}

function searchBarFunc(dataList) {
  const inputBox = document.getElementById('input-box');
  inputBox.addEventListener('change', (e) => {
    const inputValue = e.target.value;
    const subIndex = dataList.findIndex(data => data.name.toLowerCase().includes(inputValue.toLowerCase()));
    if (subIndex !== -1) {
      const item = document.getElementById('search-result');
      item.innerHTML = `
        <div>${dataList[subIndex].name}</div>
      `;
      item.style.display = 'block';
      item.querySelector('div').addEventListener('click', () => {
        e.target.value = dataList[subIndex].name;
        item.style.display = 'none';
      })
    }
  })
}

document.addEventListener('DOMContentLoaded', async () => {
  favList = JSON.parse(localStorage.getItem('favList')) || [];
  const masterData = await loadData('https://gateway.marvel.com/v1/public/characters');
  setMasterList(masterData.data.results);
  searchBarFunc(masterData.data.results);
})