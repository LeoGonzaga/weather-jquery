function postAPI() {
  let city = $("input").val();
  console.log(city);
  try {
    return new Promise(function (resolve, reject) {
      let res = $.getJSON(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=d61b5afa26273829e14eb97cdcc78997",
        resolve,
        reject
      )
        .then(function (e) {
          console.log(e);
          if (e) {
            console.log("existe");
            let semana = [
              "Domingo",
              "Segunda-Feira",
              "Terça-Feira",
              "Quarta-Feira",
              "Quinta-Feira",
              "Sexta-Feira",
              "Sábado",
            ];

            let day = new Date();

            $(".day").html(semana[day.getDay()]);
            var time = day.getHours() + ":" + day.getMinutes();
            $(".hour").html(time);
            configureIconAndBGDays(e.weather[0], day.getHours());

            let temp = convertTemp(e.main.temp);
            let maxTemp = convertTemp(e.main.temp_max);
            let minTemp = convertTemp(e.main.temp_min);

            $(".temp").html(temp.toFixed(2) + " ºC");
            $(".max").html("Max: " + maxTemp.toFixed(2) + " ºC");
            $(".min").html("Main: " + minTemp.toFixed(2) + " ºC");
            $(".weather").html(e.weather[0].description);
            $(".city").html(e.name);
          }
        })
        .catch((eer) => alert("Algo de errado acontecer. Tente novamente!"));
    });
  } catch (error) {
    alert("Algo de errado acontecer. Tente novamente!");
  }
}

$("button").click(postAPI);

const convertTemp = (temp) => {
  return temp - 273.15;
};

const configureIconAndBGDays = (desc, hour) => {
  console.log(hour);
  $("img").attr(
    "src",
    "http://openweathermap.org/img/wn/" + desc.icon + "@2x.png"
  );

  if (hour < 18) {
    $("body").attr("class", "sun");
  } else {
    $("body").attr("class", "night");
  }
};
