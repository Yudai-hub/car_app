alert("here is cars#index!");

var object = document.getElementById("target");
var car = document.getElementById("car");

object.addEventListener("click", loadDoc);
function loadDoc() {
  //test code: car.innerHTML = "click it!!";

  //mandatory code: here
  const xhttp_car = new XMLHttpRequest();
  const xhttp_car_image = new XMLHttpRequest();


  //処理フラグ（true:処理済、false:処理中）
  var isProcessEnd;

  //メイン処理
  isProcessEnd = false;

  //1つ目のajax処理
  ajaxFunc1();
  //2つ目のajax処理を実行するためのタイマー処理
  timerFunc();

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

  //1つ目のajax処理
  function ajaxFunc1() {
    try {
      xhttp_car.open("GET", `https://my-api--yudai-hub004.herokuapp.com/api/v1/cars`);
      xhttp_car.send();
    } catch {
      car.innerHTML = err;
    }
  }

  var car_names = [];

  // after required
  xhttp_car.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const obj = JSON.parse(this.response)
      var cars = obj.data
      for (let car of cars) {
        car_names.push(`${car.maker} ${car.model} ${car.make_year}`);
      }
    }
    document.getElementById("car").innerHTML = this.status + this.readyState + car_names[0];
    //フラグを処理済みにする
    isProcessEnd = true;
  };

  //2つ目のajax処理
  function ajaxFunc2() {
    try {
      let searchParams = new URLSearchParams({ q: car_names[0] });
      let search_params = searchParams.toString();
      xhttp_car_image.open("GET", `https://www.googleapis.com/customsearch/v1?&key=AIzaSyBAulCi8Iz_bsZTF5Yt0B_S3uydgUewL1w&cx=3beab832c371c3ee9&${search_params}&searchType=IMAGE`);
      xhttp_car_image.send();
    } catch {
      car.innerHTML = err;
    }

    //フラグを初期化
    isProcessEnd = false;
  }


  xhttp_car_image.onreadystatechange = function () {
    // document.getElementById("car").innerHTML = this.status + this.readyState + this.responseText;
    if (this.readyState == 4 && this.status == 200) {
      const obj = JSON.parse(this.response)
      var search_results = obj.items
      let car_image_urls = [];
      for (let result of search_results) {
        car_image_urls.push(result.link);
      }
      // document.getElementById("car").innerHTML = car_image_urls;
      document.getElementById("image").style = "height:600px;"
      document.getElementById("image").src = car_image_urls[0];
    }
  };


}
