
import { useEffect, useState } from 'react';
import Footer from './Component/Footer';
import LocationWaiting from './Component/LocationWaiting';
import MainContainer from './Component/MainContainer';
import './style/style.css';
import ReactGA from 'react-ga';
ReactGA.initialize('G-06LKF4JYKS');

function App() {
  const [stateList, setStateList] = useState('')
  const [locationCheck, setLocationChek] = useState(false)
  const [locationAvailable, setLocationAvailable] = useState(false)
  useEffect(() => {
    fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
      .then(responsestate => responsestate.json())
      .then(StateList => {
        console.log(StateList)
        setStateList(StateList)
      })
    navigator.geolocation.watchPosition(function (position) {
      console.log("i'm tracking you!", position);
      setLocationChek(true)
      setLocationAvailable(true)
    },
      function (error) {
        if (error.code === error.PERMISSION_DENIED)
          console.log("you denied me :-(");
        setLocationChek(true)

      });
  }, [])
  return (
    <div className="app">
      {locationAvailable ? (stateList && <MainContainer stateList={stateList} />) : <LocationWaiting locationCheck={locationCheck} setLocationAvailable={setLocationAvailable} />}
    </div>
  );
}

export default App;
