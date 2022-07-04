import React, { useState } from "react";
import Footer from "./components/Footer";
import HideButton from "./components/HideButton";
import SearchBox from "./components/SearchBox";
require("dotenv").config();

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [hideBackground, setHideBackground] = useState(false);

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
  const d = new Date();
  let month = months[d.getMonth()];

  // new: now we get information from backend
  const imageURLForBackend = `https://weather-app-servers.herokuapp.com/unsplash?query=${query}`;
  const weatherURLForBackend = `https://weather-app-servers.herokuapp.com/weather?q=${query}`;

  const fetchings = async () => {
    setError(null);

    try {
      await fetch(weatherURLForBackend)
        .then(setIsPending(true))
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === 200) {
            setWeather(data);
          } else {
            setError(data.message);
            setWeather({});
          }
        });
    } catch (err) {
      console.log(err);
    }

    await fetch(imageURLForBackend)
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      });
    setIsPending(false);
    setQuery("");
  };

  // this is one of those situations that the fetching function
  //  gets triggered by presssing enter button on user's keyboard ->
  const search = (pressedKey) => {
    if (pressedKey.key === "Enter") {
      // setIsPending(true);
      fetchings();
      // setIsPending(false);
    }
  };

  function firstProfilePicture() {
    if (image) {
      return { backgroundImage: `url(${image})` };
    } else {
      return {
        backgroundImage: `url('https://images.unsplash.com/photo-1572787514629-72872e4fc123?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMjIzNzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTA4MzczMjU&ixlib=rb-1.2.1&q=85')`,
      };
    }
  }

  const backgroundUrl =
    typeof weather.main !== "undefined"
      ? firstProfilePicture()
      : {
          backgroundImage: `url('https://images.unsplash.com/photo-1572787514629-72872e4fc123?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMjIzNzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTA4MzczMjU&ixlib=rb-1.2.1&q=85')`,
        };

  const backgroundStyle = {
    ...backgroundUrl,
    backgroundSize: "cover",
    backgroundPosition: "top",
    maxWidth: "100%",
    borderRadius: "15px",
    backgroundRepeat: "no-repeat",
  };

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
        {isPending && (
          <p className="pending">
            <i>Loading...</i>
          </p>
        )}
        {error && <p className="error">{error}</p>}
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
                {/* end of info city div */}
              </div>
              <div className="info date">
                {`${d.getDate()}. ${month}  ${d.getFullYear()}`}
                {/* end of info date div */}
              </div>
              {/* end of location-info div */}
            </div>

            <div className={`weather-info ${hideBackground ? "hide" : ""}`}>
              <div className="info degree">
                {Math.round(weather.main.temp)}°C
                {/* end of info degree div */}
              </div>

              <div className="info sky">
                {weather.weather[0].main}
                {/* end of info sky div */}
              </div>

              <img
                className="weather-icon"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=""
              />

              <div className="info sky-description">
                {weather.weather[0].description}
                {/* end of info sky-description div */}
              </div>

              <HideButton
                onClick={() => setHideBackground((preValue) => !preValue)}
              />
              {/* end of weather-info div  */}
            </div>
            {/* end of container div */}
          </div>
        ) : (
          ""
        )}
        {/* <== End of Ternary Operator */}
        <Footer>
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://comendrun.com"
              className="github-link"
            >
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

// <-- TODO=> i think when this backgroundUrl tries to get a link from
// our image state, sometimes it may fail, so maybe i should add another
// operation that only does that if the state have some data, and if
// there is no data stored on image state, then it should have another
//  random or specific picture in order to our app not fail
// <== SECOND NOTE (17.05.2022)==> i added a function that will look to image state and if any data have been stored there, it will get image link from the data and if it doenst have any data, then it just gets back to the first image (TODO==> maybe i should make it in a way that if the data is not provided or the input is not relevant, the image remains as it is. and i doesnt get back to the first image of the app )
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
