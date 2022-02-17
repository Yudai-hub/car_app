alert("here is cars#index!");

var object = document.getElementById("target");
var car = document.getElementById("car");

object.addEventListener("click", loadDoc);
function loadDoc() {
  //test code: car.innerHTML = "click it!!";

  //mandatory code: here
  const xhttp_car = new XMLHttpRequest();

  // after required
  xhttp_car.onreadystatechange = function () {
    document.getElementById("car").innerHTML = this.status + this.readyState;
    if (this.readyState == 4 && this.status == 200) {
      const obj = JSON.parse(this.response)
      // var number = `${obj.weather[0].icon}`

      document.getElementById("car").innerHTML = "hogehoge";
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
    xhttp_car.open("GET", `https://my-api--yudai-hub004.herokuapp.com/api/v1/cars`);
    xhttp_car.send();
  }
}
