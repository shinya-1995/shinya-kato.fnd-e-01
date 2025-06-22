// 初期サインアップデータダミー
if (!localStorage.getItem("AllRecords")) {
  const dammyUser = {
    uesrname: "shinya",
    password: "abcdabcd",
    retypePass: "abcdabcd",
  };
  const dammyData = [
    { name: "shinya", day: "2025-06-01", type: "weight", record: "60" },
    { name: "shinya", day: "2025-06-02", type: "weight", record: "60" },
    { name: "shinya", day: "2025-06-03", type: "weight", record: "61" },
    { name: "shinya", day: "2025-06-04", type: "weight", record: "60" },
    { name: "shinya", day: "2025-06-05", type: "weight", record: "62" },
    {
      name: "shinya",
      day: "2025-06-06",
      type: "exercise",
      record: "ジョギング",
      time: "30",
    },
    {
      name: "shinya",
      day: "2025-06-07",
      type: "exercise",
      record: "筋トレ",
      time: "45",
    },
    { name: "shinya", day: "2025-06-08", type: "weight", record: "61" },
    {
      name: "shinya",
      day: "2025-06-09",
      type: "exercise",
      record: "筋トレ",
      time: "60",
    },
    { name: "shinya", day: "2025-06-10", type: "weight", record: "64" },
    {
      name: "shinya",
      day: "2025-06-11",
      type: "exercise",
      record: "筋トレ",
      time: "40",
    },
    { name: "shinya", day: "2025-06-12", type: "weight", record: "65" },
    {
      name: "shinya",
      day: "2025-06-13",
      type: "exercise",
      record: "サイクリング",
      time: "50",
    },
    { name: "shinya", day: "2025-06-14", type: "weight", record: "66" },
    {
      name: "shinya",
      day: "2025-06-15",
      type: "exercise",
      record: "ランニング",
      time: "30",
    },
    { name: "shinya", day: "2025-06-16", type: "weight", record: "63" },
    { name: "shinya", day: "2025-06-17", type: "weight", record: "62" },
    {
      name: "shinya",
      day: "2025-06-18",
      type: "exercise",
      record: "筋トレ",
      time: "45",
    },
    { name: "shinya", day: "2025-06-19", type: "weight", record: "65" },
    {
      name: "shinya",
      day: "2025-06-20",
      type: "exercise",
      record: "ランニング",
      time: "60",
    },
    { name: "shinya", day: "2025-06-21", type: "weight", record: "64" },
  ];

  localStorage.setItem("shinya", JSON.stringify(dammyUser));
  localStorage.setItem("AllRecords", JSON.stringify(dammyData));
}

window.addEventListener("DOMContentLoaded", function () {
  const logInUser = sessionStorage.getItem("logInUsername");
  const firstTodayRecord = document.querySelector("#todayRecord");
  firstTodayRecord.style.backgroundColor = "#ffd650";
  firstTodayRecord.style.color = "white";

  if (!logInUser) {
    alert("ログインしてください");
    location.href = "./DIG/logIn/logIn.html";
  } else {
    const welcome = document.querySelector("#js-welcome-message");
    welcome.innerHTML = `ようこそ！ ${logInUser}`;
  }

  const logOutBtn = document.querySelector("#js-logOut-button");

  logOutBtn.addEventListener("click", function () {
    sessionStorage.clear("logInUsername");
    alert("ログアウトしました。");
    location.href = "./DIG/logIn/logIn.html";
  });
});

const user = sessionStorage.getItem("logInUsername");
const inputDay = document.querySelector("#entry-day");
const inputWeight = document.querySelector("#entry-exercise-day");
let graphToday;
let recordToday;

const getToday = (function () {
  const today = new Date();
  today.setDate(today.getDate());
  const yyyy = today.getFullYear();
  const mm = ("0" + (today.getMonth() + 1)).slice(-2);
  const dd = ("0" + today.getDate()).slice(-2);
  graphToday = yyyy + "-" + mm + "-" + dd;
  inputDay.value = yyyy + "-" + mm + "-" + dd;
  inputWeight.value = yyyy + "-" + mm + "-" + dd;
  recordToday = yyyy + "/" + mm + "/" + dd;
})();

// セクション　今日の記録
const todayWeightSpan = document.querySelector("#today-weight");
const todayExerciseSpan = document.querySelector("#today-exercise");
const todayRecordTitle = document.querySelector("#today-record-title");
todayRecordTitle.innerHTML = recordToday;

const todayDate = new Date()
  .toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replaceAll("/", "-");
const thisMonth = todayDate.split("-")[1];
const thisDate = todayDate.split("-")[2];
const allRecordsdata = JSON.parse(localStorage.getItem("AllRecords"));

// 今月の最後の体重測定結果を表示
if (allRecordsdata) {
  const todayLastWeigthData = allRecordsdata.findLast((dataObj) => {
    if (dataObj.type === "weight") {
      console.log(dataObj.day.split("-")[2], thisDate);
      return (
        dataObj.day.split("-")[2] === thisDate &&
        dataObj.day.split("-")[1] === thisMonth
      );
    }
  });

  // 本日のすべての運動を記録
  const todayExerciseData = [];
  const todayAllexerciseData = allRecordsdata.filter(
    (record) =>
      record.type === "exercise" &&
      record.day.split("-")[2] === graphToday.split("-")[2]
  );
  todayAllexerciseData.forEach((exerciseData) => {
    const event = exerciseData.record;
    const exerciseTime = exerciseData.time;
    const ExerciseObj = {};
    ExerciseObj[event] = exerciseTime;
    todayExerciseData.push(ExerciseObj);
  });

  if (
    todayLastWeigthData &&
    todayLastWeigthData.day.split("-")[2] === graphToday.split("-")[2]
  ) {
    todayWeightSpan.innerHTML = todayLastWeigthData.record + "Kg";
  } else {
    todayWeightSpan.innerHTML = "<br>" + "本日の測定結果は入力されていません";
  }
  let todayALL;
  if (todayExerciseData.length !== 0) {
    todayExerciseData.forEach((exercise) => {
      const keyAndVlaue = Object.entries(exercise);
      todayALL
        ? (todayALL +=
            "<br>" +
            "<br>" +
            "  " +
            keyAndVlaue[0][0] +
            "：" +
            keyAndVlaue[0][1].toString() +
            "分")
        : (todayALL =
            "<br>" +
            keyAndVlaue[0][0] +
            "：" +
            keyAndVlaue[0][1].toString() +
            "分");

      todayExerciseSpan.innerHTML = todayALL;
    });
  } else {
    todayExerciseSpan.innerHTML = "本日の運動記録は入力されていません";
  }
}

// セクション新規記録

const todayRecord = document.querySelector(".today-record");
const newRecord = document.querySelector(".new-record");
const graph = document.querySelector(".graph");
const calendar = document.querySelector(".calendar");
const sidebar = document.querySelector(".sidebar-list");
const sidebarList = document.querySelectorAll(".sidebar-list > li");

const sections = {
  todayRecord: todayRecord,
  newRecord: newRecord,
  graph: graph,
  calendar: calendar,
};

sidebar.addEventListener("click", function (e) {
  sidebarList.forEach((list) => {
    list.style.backgroundColor = "white";
    list.style.color = "black";
  });
  for (const section in sections) {
    sections[section].classList.add("hidden");
  }
  e.target.style.backgroundColor = "#ffd650";
  e.target.style.color = "#fff";

  sections[e.target.id].classList.remove("hidden");
});

const recordButtons = document.querySelectorAll(".entry-category_button");
const allRecords = JSON.parse(localStorage.getItem("AllRecords")) || [];

// 体重測定結果
function getData(name, day, type, record, time) {
  if (type === "weight") {
    const recordData = {
      name,
      day,
      type,
      record,
    };
    allRecords.push(recordData);
  } else {
    if (type === "exercise") {
      const recordData = {
        name,
        day,
        type,
        record,
        time,
      };
      allRecords.push(recordData);
    }
  }
  localStorage.setItem("AllRecords", JSON.stringify(allRecords));
}

Object.values(recordButtons).forEach((recordButton) => {
  recordButton.addEventListener("click", function () {
    const entryForms = document.querySelectorAll(".entry-form");

    Object.values(entryForms).forEach((entryForm) => {
      entryForm.classList.add("hidden");
    });

    const targetId = recordButton.getAttribute("data-target");
    const displayForm = document.querySelector("#" + targetId);
    displayForm.classList.remove("hidden");
  });
});

const entryButtons = document.querySelectorAll(".entry-form");

Object.values(entryButtons).forEach((entryButton) => {
  entryButton.addEventListener("submit", (e) => {
    e.preventDefault();

    const targetData = e.target.getAttribute("data-target");

    switch (targetData) {
      case "weight-form":
        const entryDay = e.target["entry-day"];
        const entryWeight = e.target["entry-weight"];
        getData(user, entryDay.value, "weight", entryWeight.value);
        entryDay.value = "";
        entryWeight.value = "";
        location.reload();
        break;

      case "exercise-form":
        const entryExerciseDay = e.target["entry-exercise-day"];
        const entryExerciseEvent = e.target["entry-exercise-event"];
        const entryExercisetime = e.target["entry-exercise-time"];
        getData(
          user,
          entryExerciseDay.value,
          "exercise",
          entryExerciseEvent.value,
          entryExercisetime.value
        );
        entryExerciseDay.value = "";
        entryExerciseEvent.value = "";
        entryExercisetime.value = "";
        location.reload();
        break;

      default:
        break;
    }
  });
});

// グラフ表示
const exerciseChart = document.querySelector("#exercise-chart");
const weightChart = document.querySelector("#weight-chart");

let lineCtx = document.getElementById("weight-chart");
// 線グラフの設定
let lineConfig = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "体重の推移",
        data: [],
        borderColor: "#f88",
      },
    ],
  },
  options: {
    scales: {
      // Y軸の最大値・最小値、目盛りの範囲などを設定する
      y: {
        suggestedMin: 40,
        suggestedMax: 60,
        ticks: {
          stepSize: 20,
        },
      },
    },
  },
};

// すべてのlocalStrageのデータから今月の体重情報を抽出(user, 月（今月））
const filteredData = allRecords.filter((data) => {
  const dataMonth = data.day.split("-")[1];
  return (
    user === data.name &&
    dataMonth === graphToday.split("-")[1] &&
    data.type === "weight"
  );
});

// 体重グラフに反映
const weigthByDate = {};
filteredData.forEach((dataObj) => {
  console.log(dataObj.record);

  if (!lineConfig.data.labels.includes(dataObj.day)) {
    lineConfig.data.labels.push(dataObj.day);
  }
  weigthByDate[dataObj.day]
    ? weigthByDate[dataObj.day].push(JSON.parse(dataObj.record))
    : (weigthByDate[dataObj.day] = [JSON.parse(dataObj.record)]);
});

const dayOfWeightDatas = Object.values(weigthByDate);
dayOfWeightDatas.forEach((datas) => {
  const averageData =
    datas.reduce((accu, curr) => accu + curr, 0) / datas.length;
  lineConfig.data.datasets[0].data.push(averageData);
});

let lineChart = new Chart(lineCtx, lineConfig);
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

// 運動グラフ
let barCtx = document.getElementById("exercise-chart");
// 棒グラフの設定
let barConfig = {
  type: "bar",
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },

      y: {
        suggestedMin: 0,
        suggestedMax: 200,
        ticks: {
          stepSize: 50,
        },
        stacked: true,
      },
    },
  },
};

const filteredExerciseData = allRecords.filter((data) => {
  const dataMonth = data.day.split("-")[1];
  return (
    user === data.name &&
    dataMonth === graphToday.split("-")[1] &&
    data.type === "exercise"
  );
});

const exerciseUniqueDate = new Set();
const exerciseUniqueTypes = new Set();
filteredExerciseData.forEach((obj) => {
  exerciseUniqueDate.add(obj.day);
  exerciseUniqueTypes.add(obj.record);
});

barConfig.data.labels.push(...exerciseUniqueDate);
exerciseUniqueTypes.forEach((type) => {
  const typeObject = {};
  typeObject["label"] = type;
  typeObject["data"] = [];
  typeObject["backgroudColor"] = null;
  barConfig.data.datasets.push(typeObject);
});

Array.from(exerciseUniqueDate).forEach((exerciseDate, k) => {
  filteredExerciseData.forEach((dataObj, i) => {
    if (dataObj.day === exerciseDate) {
      barConfig.data.datasets.forEach((typeObj) => {
        if (typeObj.label === dataObj.record) {
          typeObj.data.push(dataObj.time);
        }
      });
    }

    if (i === filteredExerciseData.indexOf(filteredExerciseData.at(-1))) {
      barConfig.data.datasets.forEach((typeObj) => {
        if (typeObj.data.length < k + 1) {
          typeObj.data.push(null);
        }
      });
    }
  });
});

const ExerciseByDate = {};
filteredExerciseData.forEach((dataObj) => {
  ExerciseByDate[dataObj.day]
    ? ExerciseByDate[dataObj.day].push(dataObj.record)
    : (ExerciseByDate[dataObj.day] = [dataObj.record]);
});
let barChart = new Chart(barCtx, barConfig);

const graphButtons = document.querySelectorAll(".graph-toggle");
Object.values(graphButtons).forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const charts = document.querySelectorAll(".canvas-cahrt");
    Object.values(charts).forEach((chart) => {
      chart.classList.add("hidden");
    });
    const targetId = button.getAttribute("data-target");
    const displayForm = document.querySelector("#" + targetId);
    displayForm.classList.remove("hidden");
  });
});

// ==================================================================================

// カレンダーセクション

const weeks = ["日", "月", "火", "水", "木", "金", "土"];
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
const config = {
  show: 3,
};

function showCalendar(year, month) {
  for (i = 0; i < config.show; i++) {
    const calendarHtml = createCalendar(year, month);
    const sec = document.createElement("section");
    sec.innerHTML = calendarHtml;
    document.querySelector("#calendar-format").appendChild(sec);

    month++;
    if (month > 12) {
      year++;
      month = 1;
    }
  }
}

const dailyData = {};
if (allRecordsdata) {
  allRecordsdata.forEach((data) => {
    dailyData[data.day]
      ? dailyData[data.day].push(data)
      : (dailyData[data.day] = [data]);
  });
}

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;
function createCalendar(year, month) {
  const weeks = ["日", "月", "火", "水", "木", "金", "土"];
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  const endDayCount = endDate.getDate();
  const lastMonthEndDate = new Date(year, month - 1, 0);
  const lastMonthEndDayCount = lastMonthEndDate.getDate();
  const startDay = startDate.getDay();
  let dayCount = 1;
  let calendarHtml = "";
  calendarHtml += `<h3>${year}/${month}</h3>`;
  calendarHtml += `<table><tr>`;

  // 曜日の行を作成

  for (let i = 0; i < weeks.length; i++) {
    if (i === 0 || i === 6) {
      calendarHtml += `<td class="week holiday">${weeks[i]}</td>`;
    } else {
      calendarHtml += `<td class="week">${weeks[i]}</td>`;
    }
  }
  calendarHtml += `</tr>`;
  for (let w = 0; w < 6; w++) {
    calendarHtml += `<tr>`;
    for (let d = 0; d < 7; d++) {
      // 前月分を表示させる処理
      if (w === 0 && d < startDay) {
        let num = lastMonthEndDayCount - startDay + d + 1;
        if (d === 0 || d === 6) {
          calendarHtml += `<td class="is-disabled holiday">${num}</td>`;
        } else {
          calendarHtml += `<td class="is-disabled">${num}</td>`;
        }
        // 来月分を表示させる処理
      } else if (dayCount > endDayCount) {
        let num = dayCount - endDayCount;
        if (d === 0 || d === 6) {
          calendarHtml += `<td class="is-disabled holiday">${num}</td>`;
        } else {
          calendarHtml += `<td class="is-disabled">${num}</td>`;
        }
        dayCount++;
        //今月分を表示させる処理
      } else {
        const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
          dayCount
        ).padStart(2, "0")}`;
        const entries = dailyData[dateStr];
        let cellContent;
        if (d === 0 || d === 6) {
          cellContent = `<div class="main-date holiday">${dayCount}</div>`;
        } else {
          cellContent = `<div class="main-date">${dayCount}</div>`;
        }
        if (entries) {
          entries.forEach((entry) => {
            if (entry.type === "weight") {
              cellContent += `<div class="sub">体重：${entry.record}kg</div>`;
            } else if (entry.type === "exercise") {
              cellContent += `<div class="sub">${entry.record}：${entry.time}分</div>`;
            }
          });
        }
        calendarHtml += `<td>${cellContent}</td>`;
        dayCount++;
      }
    }
    calendarHtml += `</tr>`;
    if (dayCount > endDayCount) {
      break;
    }
  }
  calendarHtml += `</table>`;
  return calendarHtml;
}
function showCalendar(year, month) {
  const calendarHtml = createCalendar(year, month);
  document.querySelector("#calendar-format").innerHTML = calendarHtml;
}
function moveCalendar(e) {
  if (e.target.id === "prev") {
    currentMonth--;
    if (currentMonth < 1) {
      currentYear--;
      currentMonth = 12;
    }
  }
  if (e.target.id === "next") {
    currentMonth++;
    if (currentMonth > 12) {
      currentYear++;
      currentMonth = 1;
    }
  }
  showCalendar(currentYear, currentMonth);
}
document.querySelector("#prev").addEventListener("click", moveCalendar);
document.querySelector("#next").addEventListener("click", moveCalendar);
// 初期表示
showCalendar(currentYear, currentMonth);
