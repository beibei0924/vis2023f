const jsonUrl02 = '../json/AerobicData.json';

function loadjson() {
  fetch(jsonUrl02)
    .then(response => response.json())
    .then(data => {
      calorieData = data;
      if (calorieIndex < calorieData.length) {
        const point = calorieData[calorieIndex];
        updateIconPosition(point.X, point.Y);
        updateInfo(point.Time, point.Floor, point.Distance, point.Calorie);
        calorieIndex++;
      } else {
        calorieIndex = 0;
      }
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

// 新增一個函數用來更新資訊
function updateInfo(time, floor, distance, calorie) {
  const timeInfo = document.getElementById('time-info');
  const distanceInfo = document.getElementById('distance-info');
  const calorieInfo = document.getElementById('calories-info');

  const speed = distance / time;

  timeInfo.textContent = `Time: ${time} seconds`;
  distanceInfo.textContent = `Distance: ${distance} meters`;
  calorieInfo.textContent = `Calories: ${calorie} calories`;
}

let calorieIndex = 0;
let calorieData = null;

// 初始加載icon位置
loadjson();

// 每秒更新一次位置
setInterval(loadjson, 1000);