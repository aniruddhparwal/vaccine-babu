import React from 'react'
import { useEffect, useState } from 'react';
import Loader from './Loader';
import InfoContainer from './InfoContainer'
import { InputLabel, MenuItem, Select } from '@material-ui/core';


function MainContainer({ stateList }) {
    const [data, setData] = useState([])
    const [state, setState] = useState('')

    const [district, setDistrict] = useState('')
    const [districtList, setDistrictList] = useState('')
    const [dataAvailable, setDataAvailable] = useState(false)

    const getDistrict = (stateid) => {
        fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateid}`)
            .then(responsedistrict => responsedistrict.json())
            .then(DistrictData => {
                console.log(DistrictData)
                setDistrictList(DistrictData.districts)
            })
    }
    const getData = (districtid) => {
        fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtid}&date=05-05-2021`)
            .then(response => response.json())
            .then(data => {
                setData(data)
                setDataAvailable(true)
                console.log("Main data", data)
            })
    }
    useEffect(() => {

        navigator.geolocation.getCurrentPosition((position) => {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&language=en&key=AIzaSyAlELmqkRobpn26ReMLLTirp7GHsaW8vy0`)
                .then(response => response.json())
                .then(Locationdata => {
                    console.log("location data", Locationdata)
                    console.log("nn", Locationdata.results[0].address_components.length - 3);
                    stateList.states.map(state => {
                        if (state.state_name === Locationdata.results[0].address_components[Locationdata.results[0].address_components.length - 3].long_name) {
                            console.log("state_id is ", state.state_id)
                            setState(state.state_id)
                            fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state.state_id}`)
                                .then(responsedistrict => responsedistrict.json())
                                .then(DistrictData => {
                                    console.log(DistrictData)
                                    setDistrictList(DistrictData.districts)
                                    DistrictData.districts.map(district => {
                                        if (district.district_name === Locationdata.results[0].address_components[Locationdata.results[0].address_components.length - 4].long_name) {
                                            setDistrict(district.district_id)
                                            console.log("district_id is ", district.district_id)
                                            console.log("district_name is ", district)
                                            fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district.district_id}&date=05-05-2021`)
                                                .then(response => response.json())
                                                .then(data => {
                                                    setData(data)
                                                    setDataAvailable(true)
                                                    console.log("Main data", district, state, data)
                                                })
                                        }
                                    })
                                })
                        }
                    })
                })
        })
        console.log("app")
    }, [])
    const handleChangeState = (event) => {
        setState(event.target.value);
        getDistrict(event.target.value)
    };
    const handleChangeDistrict = (event) => {
        setDistrict(event.target.value);
        // getDistrict(event.target.value)
        setDataAvailable(false)
        getData(event.target.value)
    };
    return (
        <div className="mainContainer">
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state}
                onChange={handleChangeState}
            >
                {stateList.states.map(state => (
                    <MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>
                ))}

            </Select>
            {districtList && <>
                <InputLabel id="demo-simple-select-label">District</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={district}
                    onChange={handleChangeDistrict}
                >
                    {districtList.map(district => (
                        <MenuItem key={district.district_id} value={district.district_id}>{district.district_name}</MenuItem>
                    ))}

                </Select>
            </>}

            {!dataAvailable ? <Loader district={district} /> : <InfoContainer data={data} />}
        </div>
    )
}

export default MainContainer








// useEffect(() => {

//     navigator.geolocation.getCurrentPosition((position) => {
//         // setLocation({
//         //   lat: position.coords.latitude,
//         //   lon: position.coords.longitude,
//         // });
//         //   fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.aeebe5b1021eaf94b37fbeddaef781f0&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)
//         //     .then(response => response.json())
//         //     .then(Locationdata => {
//         //       console.log("location data", Locationdata)
//         //       console.log("aa", Locationdata.address.postcode)
//         //       fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
//         //         .then(responsestate => responsestate.json())
//         //         .then(StateList => {
//         //           console.log(StateList)
//         //           StateList.states.map(state => {
//         //             if (state.state_name === Locationdata.address.state) {
//         //               console.log("state_id is ", state.state_id)
//         //               fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state.state_id}`)
//         //                 .then(responsedistrict => responsedistrict.json())
//         //                 .then(DistrictData => {
//         //                   console.log(DistrictData)
//         //                   DistrictData.districts.map(district => {
//         //                     if (district.district_name === Locationdata.address.city) {
//         //                       console.log("district_id is ", district.district_id)
//         //                       fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district.district_id}&date=04-05-2021`)
//         //                         .then(response => response.json())
//         //                         .then(data => {
//         //                           setData(data)
//         //                           setDataAvailable(true)
//         //                           console.log("Main data", data)
//         //                         })
//         //                     }
//         //                   })

//         //                 })
//         //             }
//         //           })
//         //         })

//         //       // fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${data.address.postcode}&date=04-05-2021`)
//         //       //   .then(response => response.json())
//         //       //   .then(data => {
//         //       //     setData(data)
//         //       //     setDataAvailable(true)
//         //       //     console.log(data)
//         //       //   })
//         //     })

//         // })


//         fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&language=en&key=AIzaSyAlELmqkRobpn26ReMLLTirp7GHsaW8vy0`)
//             .then(response => response.json())
//             .then(Locationdata => {
//                 console.log("location data", Locationdata)
//                 console.log("nn", Locationdata.results[0].address_components.length - 3);
//                 // console.log("aa", Locationdata.address.postcode)
//                 fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
//                     .then(responsestate => responsestate.json())
//                     .then(StateList => {
//                         console.log(StateList)
//                         StateList.states.map(state => {
//                             if (state.state_name === Locationdata.results[0].address_components[Locationdata.results[0].address_components.length - 3].long_name) {
//                                 console.log("state_id is ", state.state_id)
//                                 setState(state.state_name)
//                                 fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state.state_id}`)
//                                     .then(responsedistrict => responsedistrict.json())
//                                     .then(DistrictData => {
//                                         console.log(DistrictData)
//                                         setDistrictList(DistrictData.districts)
//                                         DistrictData.districts.map(district => {
//                                             if (district.district_name === Locationdata.results[0].address_components[Locationdata.results[0].address_components.length - 4].long_name) {
//                                                 console.log("district_id is ", district.district_id)
//                                                 setDistrict(district.district_name)
//                                                 fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district.district_id}&date=04-05-2021`)
//                                                     .then(response => response.json())
//                                                     .then(data => {
//                                                         setData(data)
//                                                         setDataAvailable(true)
//                                                         console.log("Main data", data)
//                                                     })
//                                             }
//                                         })

//                                     })
//                             }
//                         })
//                     })

//                 // fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${data.address.postcode}&date=04-05-2021`)
//                 //   .then(response => response.json())
//                 //   .then(data => {
//                 //     setData(data)
//                 //     setDataAvailable(true)
//                 //     console.log(data)
//                 //   })
//             })

//     })




//     console.log("app")
//     // fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=461331&date=04-05-2021')
//     //   .then(response => response.json())
//     //   .then(data => {
//     //     setData(data)
//     //     setDataAvailable(true)
//     //     console.log(data)
//     //   })
// }, [])