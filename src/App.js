import { useEffect, useState } from 'react';
import InfoContainer from './Component/InfoContainer';
import Loader from './Component/Loader';
import './style/style.css';

function App() {
  const [data, setData] = useState([])
  const [dataAvailable, setDataAvailable] = useState(false)
  useEffect(() => {

    navigator.geolocation.getCurrentPosition((position) => {
      // setLocation({
      //   lat: position.coords.latitude,
      //   lon: position.coords.longitude,
      // });
      fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.aeebe5b1021eaf94b37fbeddaef781f0&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)
        .then(response => response.json())
        .then(Locationdata => {
          console.log("location data", Locationdata)
          console.log("aa", Locationdata.address.postcode)
          fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
            .then(responsestate => responsestate.json())
            .then(StateList => {
              console.log(StateList)
              StateList.states.map(state => {
                if (state.state_name === Locationdata.address.state) {
                  console.log("state_id is ", state.state_id)
                  fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state.state_id}`)
                    .then(responsedistrict => responsedistrict.json())
                    .then(DistrictData => {
                      console.log(DistrictData)
                      DistrictData.districts.map(district => {
                        if (district.district_name === Locationdata.address.city) {
                          console.log("district_id is ", district.district_id)
                          fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district.district_id}&date=04-05-2021`)
                            .then(response => response.json())
                            .then(data => {
                              setData(data)
                              setDataAvailable(true)
                              console.log("Main data", data)
                            })
                        }
                      })

                    })
                }
              })
            })

          // fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${data.address.postcode}&date=04-05-2021`)
          //   .then(response => response.json())
          //   .then(data => {
          //     setData(data)
          //     setDataAvailable(true)
          //     console.log(data)
          //   })
        })

    })
    console.log("app")
    // fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=461331&date=04-05-2021')
    //   .then(response => response.json())
    //   .then(data => {
    //     setData(data)
    //     setDataAvailable(true)
    //     console.log(data)
    //   })
  }, [])
  return (
    <div className="app">
      {!dataAvailable ? <Loader /> : <InfoContainer data={data} />}
    </div>
  );
}

export default App;
