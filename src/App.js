import React, { useState } from "react";
import Footer from "./components/Footer";
import SearchBox from "./components/SearchBox";
import { useFetch } from "./hooks/useFetch";
require("dotenv").config();

// <==== ALL FIRST NOTES are on (16.05.2022) =====> //
const UNSAPIKEY = process.env.REACT_APP_UNSPLASH_API_KEY;
const openAPIKEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

function App() {
  const [query, setQuery] = useState("");
  // <== this state is responsible to get the value from input that
  //  the user have written and pass it to the next operations on
  //  the app to get the weather based on the value that use provided
  const [weather, setWeather] = useState({});
  // <== based on the value that the user provided now we get a data
  // from out API for the respected city name that we have.and now we
  //  can access our weather data through this object
  const [image, setImage] = useState("");
  // <== also we get a data from our unsplash API based on the value
  //  that user provided and also we store it here to use to change
  //  the background of the app

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // <--- we need to write down the months names because the values that
  //  we get from(new Date()) are only in numbers and we need these month
  // names to assign them based on the respected recived number from that function

  const d = new Date();
  let month = months[d.getMonth()];

  // console.log(process.env.REACT_APP_UNSPLASH_API_KEY);

  //so this constant just gets the image that we want to pass it to
  //  image state from unsplash API based on users input ===>
  const imageAPIUrl = `https://api.unsplash.com/photos/random/?client_id=${UNSAPIKEY}&query=${query}&orientation=portrait&content_filter=high`;

  const imageURLForBackend = `http://localhost:8080/unsplash?query=${query}`;

  // i declared this function because i wanted to use it in more than
  //  one occassion, both when the user presses enter button and also
  // when hits or clicks the search button.so in order to keep my code
  //  short and DRY, i declared it here to use it in those several occasions ====>
  const fetchings = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${openAPIKEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });
    fetch(imageURLForBackend)
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      });
    setQuery("");
  };

  // this is one of those situations that the fetching function
  //  gets triggered by presssing enter button on user's keyboard ->
  const search = (pressedKey) => {
    if (pressedKey.key === "Enter") {
      fetchings();
    }
  };
  console.log(image);
  function firstProfilePicture() {
    if (image) {
      return { backgroundImage: `url(${image})` };
    } else {
      return {
        backgroundImage: `url('https://images.unsplash.com/photo-1572787514629-72872e4fc123?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMjIzNzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTA4MzczMjU&ixlib=rb-1.2.1&q=85')`,
      };
    }
  }

  // this is a function that looks to weather state and if any data
  // from api have been stored there, then it looks for type of the data
  //  in weather.main.if its not undefined(meaning there is no data) then
  //  it will get an image from our image state that has a image link
  // from unsplash APi -- >
  // SECOND NOTE (17.5.2022)===>
  const backgroundUrl =
    typeof weather.main !== "undefined"
      ? firstProfilePicture()
      : {
          backgroundImage: `url('https://images.unsplash.com/photo-1572787514629-72872e4fc123?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMjIzNzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTA4MzczMjU&ixlib=rb-1.2.1&q=85')`,
        };
  // <-- TODO=> i think when this backgroundUrl tries to get a link from
  // our image state, sometimes it may fail, so maybe i should add another
  // operation that only does that if the state have some data, and if
  // there is no data stored on image state, then it should have another
  //  random or specific picture in order to our app not fail
  // <== SECOND NOTE (17.05.2022)==> i added a function that will look to image state and if any data have been stored there, it will get image link from the data and if it doenst have any data, then it just gets back to the first image (TODO==> maybe i should make it in a way that if the data is not provided or the input is not relevant, the image remains as it is. and i doesnt get back to the first image of the app )

  const backgroundStyle = {
    ...backgroundUrl,
    backgroundSize: "cover",
    backgroundPosition: "top",
    maxWidth: "100%",
    // minHeight: "100vh",
    borderRadius: "15px",
    backgroundRepeat: "no-repeat",
  };

  // <-- this is the style that our background picture will have
  // every time any new serach triggered.i learned it from ninja net
  //  from his toturial in his youtube channel and definetly we can
  // do it another way.so probably will try to do it another way in future

  // TODO==>
  // const wholePageBackgroundStyle = {
  //   ...backgroundUrl,
  //   backgroundSize: "cover",
  //   backgroundPosition: "top",
  //   maxWidth: "100%",
  //   backdropFilter: "blur(10px)",
  //   backgroundRepeat: "no-repeat",
  //   background:'rgba(255,255,255,0.4)'
  // };
  // <==TODO  i wanted to add a background to the whole page that would
  //  be the blury form of the App background that we get from APi.
  // but i realized that this blurry background isnt supported in
  // raect app and also i couldnt handle backdrop npm package and couldnt
  //  make it work. (i only spent 10 minutes on that, so prabably it will
  //  work but because i had to wrap everything around that, i didnt want
  //  to spent too much time on that)

  return (
    <div className="whole-page">
      <div className="App" style={backgroundStyle}>
        <SearchBox
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          query={query}
          search={search}
          searchButtonClick={fetchings}
          value={query}
        />
        {/* Beginning of the Ternary Operator ==> */}
        {typeof weather.main !== "undefined" ? (
          <div
            className={
              typeof weather.main !== "undefined"
                ? "container show"
                : "container not-show"
            }
          >
            <div className="location-info">
              <div className="info city">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="info date">
                {`${d.getDate()}. ${month}  ${d.getFullYear()}`}
              </div>
            </div>
            <div className="weather-info">
              <div className="info degree">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="info sky">{weather.weather[0].main}</div>
              <div className="info sky-description">
                {weather.weather[0].description}
              </div>
              <img
                className="weather-icon"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=""
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {/* <== End of Ternary Operator */}
        <Footer>
          <p>
            <a href="https://github.com/comendrun" className="github-link">
              comendrun@{d.getFullYear()}
            </a>
          </p>
        </Footer>
        {/* end of App div ==> */}
      </div>
      {/* end of whole-page div ==>  */}
    </div>
  );
}

export default App;
