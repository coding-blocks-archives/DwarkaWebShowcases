$(document).ready(() => {

    let currentDirectory = window.location.pathname.split('/').slice(0, -1).join('/');
    let loader = $('#cssloader');
    let content = $('.content');
    let btn = $('#btn');
    let searchInput = $('#city');
    //weather icon
    let icon = $('#icon');
    //result divs
    let coord = $('#coods');
    let humidity = $('#humidity');
    let mintemp = $('#mintemp');
    let maxtemp = $('#maxtemp');
    //api key 
    let appid = "appid=31a08a7db70a2dc1039e7e16aab9f825";
    //variable for changing banner 
    let bannerimg = $('.banner img')
    let bg = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg"];
    let bgcounter = 0;

    let weathericondesc = $('weathericondesc');
    // icon.attr('display','none');
    //hit the api and parse the recrived data 
    let cssloader = $('#cssloader');

    function displaycontent() {
        loader.hide();
        content.show();
    }

    function hidecontent() {
        loader.show();
        content.hide();
    }

    hidecontent();



    let findWeatherDetails = ()=>{
        let cityinput = $('#city');

        let city = cityinput.val().trim;
        console.log(city);
        // console.log(city);
        if (city.length === 0) {
            cssloader.text(`Please enter a city name first`);
            hidecontent();
        } else {
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&${appid}&units=metric`,
                method: 'GET',
                success: (data) => {

                    // let weatherdata = JSON.parse(data);
                    let weatherdata = JSON.parse(JSON.stringify(data));
                    icon.attr('src', "http://openweathermap.org/img/w/" + weatherdata.weather[0].icon + ".png");
                    icon.attr('width', '80px');
                    icon.attr('height', '80px');
                    weathericondesc.text(`${weatherdata.weather.description}`);
                    console.log(weathericondesc);
                    coord.text(`
                                 longitute: ${weatherdata.coord.lon}\n
                                 latitude:  ${weatherdata.coord.lat}`);

                    mintemp.text(`minimum temperature: ${weatherdata.main.temp_min}`);
                    mintemp.append('<span>&#8451</span>');
                    maxtemp.text(`maximum temperature: ${weatherdata.main.temp_max}`);
                    maxtemp.append('<span>&#8451</span>');
                    humidity.text(`humidity: ${weatherdata.main.humidity}%`);
                    icon.attr('display', 'block');
                    displaycontent();

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //if body is empty we end up here
                    cssloader.text(`Sorry that city dosen't exist`);
                    hidecontent();
                    console.log('error');
                }
            })
        }
    }


    btn.bind("click", findWeatherDetails);
    searchInput.bind("keyup", enterPressed);

    function enterPressed(event) {
        if (event.key === "Enter") {
            findWeatherDetails();
        }
    }

    // btn.click(() => {

       

    // })

    // console.log(currentDirectory);
    //change banner at an interval
    setInterval(function () {

        bannerimg.attr('src', `${currentDirectory}/static/${bg[bgcounter]}`);
        bgcounter++;
        if (bgcounter == 4) {
            bgcounter = 0;
        }
    }, 2000);

})