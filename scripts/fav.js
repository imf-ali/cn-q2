let masterData = [];

function setMasterList(dataList) {
  const masterList = document.getElementById('master-list');
  let htmlString = '';
  dataList.forEach((data, index) => {
    htmlString += `
      <div id="hero-item">
        <button id="favorite-btn">Remove favourite</button>
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
      masterData.splice(index, 1);
      localStorage.setItem('favList', JSON.stringify(masterData));
      setMasterList(masterData);
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  masterData = JSON.parse(localStorage.getItem('favList')) || [];
  if(masterData){
    setMasterList(masterData);
  }
})