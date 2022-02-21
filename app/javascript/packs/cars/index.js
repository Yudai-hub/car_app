alert("here is new cars#index!");

var start_btn = document.getElementById("start_btn");
var next_btn = document.getElementById("next_btn");

const xhttp_car = new XMLHttpRequest();
const xhttp_car_image = new XMLHttpRequest();
var isProcessEnd = false;
var car_names = [];
var car_image_urls = [];

start_btn.addEventListener("click", getStart);
next_btn.addEventListener("click", switchNext);

var number = 0;

function switchNext() {
  // current_car set
  var current_car_name = car_names[number];
  var current_car_image_url = car_image_urls[number];
  // image src set
  document.getElementById("car_name").innerHTML = current_car_name;
  document.getElementById("car_image").style = "height:600px;"
  document.getElementById("car_image").src = current_car_image_url;
  // data next unless over 10
  if (number < 9) {
    number = number + 1;
  } else {
    alert("game is over!");
  }
}

// here getStart function

function ajaxFunc1() {
  try {
    xhttp_car.open("GET", `https://my-api--yudai-hub004.herokuapp.com/api/v1/cars`);
    xhttp_car.send();
  } catch {
    alert("here is error");
  }
}

function ajaxFunc2() {
  try {
    let searchParams = new URLSearchParams({ q: car_names[0] });
    let search_params = searchParams.toString();
    xhttp_car_image.open("GET", `https://www.googleapis.com/customsearch/v1?&key=AIzaSyBAulCi8Iz_bsZTF5Yt0B_S3uydgUewL1w&cx=3beab832c371c3ee9&${search_params}&searchType=IMAGE`);
    xhttp_car_image.send();
  } catch {
  }

  //フラグを初期化
  isProcessEnd = false;
}

//タイマー処理
function timerFunc() {
  if (isProcessEnd == false) {
    //1つ目のajax処理が処理中なら1秒後に自関数を呼び出す
    setTimeout(
      function () {
        timerFunc();
      }, 1000
    )
  } else {
    //フラグが処理済みになっていれば、2つ目のajax処理を実行する
    ajaxFunc2();
  }
}

// start (functions after request)

xhttp_car.onreadystatechange = function () {

  if (this.readyState == 4 && this.status == 200) {
    const obj = JSON.parse(this.response)
    var cars = obj.data
    for (let car of cars) {
      car_names.push(`${car.maker} ${car.model} ${car.make_year}`);
    }

    //フラグを処理済みにする
    isProcessEnd = true;
  }
};

xhttp_car_image.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const obj = JSON.parse(this.response)
    var search_results = obj.items

    for (let result of search_results) {
      car_image_urls.push(result.link);
    }
    switchNext();
  }

};

function getStart() {
  // data get
  ajaxFunc1(); // get car data
  timerFunc(); // try ajaxFunc2(); (HTTP request after ajaxFunc1();)
}
// end
