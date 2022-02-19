alert("here is cars#index!");

var object = document.getElementById("target");
var car = document.getElementById("car");

object.addEventListener("click", loadDoc);
function loadDoc() {
  //test code: car.innerHTML = "click it!!";

  //mandatory code: here
  const xhttp_car = new XMLHttpRequest();
  const xhttp_car_image = new XMLHttpRequest();

  // after required
  // xhttp_car.onreadystatechange = function () {
  //   document.getElementById("car").innerHTML = this.status + this.readyState;
  //   if (this.readyState == 4 && this.status == 200) {
  //     const obj = JSON.parse(this.response)
  //     var cars = obj.data
  //     let cars_name = [];
  //     for (let car of cars) {
  //       cars_name.push(car.maker + " " + car.model + " " + car.make_year);
  //     }
  //     document.getElementById("car").innerHTML = cars_name;
  //   }
  // };
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

  navigator.geolocation.getCurrentPosition(success)
  try {
    navigator.geolocation.getCurrentPosition(success);
  } catch {
    car.innerHTML = err;
  }

  // navigator.geolocation.getCurrentPosition(success);
  function success(position) {
    // xhttp_car.open("GET", `https://my-api--yudai-hub004.herokuapp.com/api/v1/cars`);
    // xhttp_car.send();
    xhttp_car_image.open("GET", `https://www.googleapis.com/customsearch/v1?&key=AIzaSyBAulCi8Iz_bsZTF5Yt0B_S3uydgUewL1w&cx=3beab832c371c3ee9&q=toyota+camry&searchType=IMAGE`);
    xhttp_car_image.send();
  }
}
