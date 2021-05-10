import React from 'react'
import { useEffect, useState } from 'react';
import Loader from './Loader';
import InfoContainer from './InfoContainer'
import { InputLabel, makeStyles, MenuItem, Modal, Select } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Footer from './Footer';
import { CancelPresentation, CheckBoxOutlineBlank, CheckBoxOutlineBlankOutlined, ConfirmationNumberRounded, EmojiPeople, EventAvailable, Help } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: "50%",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
const useStylesSelect = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
function rand() {
    return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `41%`,
        left: `15%`,
        // transform: `translate(-${top}%, -${left}%)`,
    };
}
function MainContainer({ stateList, todayDate }) {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [state, setState] = useState('')
    const [filterValue, setFilterValue] = useState('0');
    const [district, setDistrict] = useState('')
    const [districtList, setDistrictList] = useState('')
    const [dataAvailable, setDataAvailable] = useState(false)
    const classes = useStyles();
    const classesSelect = useStylesSelect();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h3 id="simple-modal-title">Let's Understand</h3>
            <p id="simple-modal-description">
                <div className="HelpDivMain">
                    <div className="HelpDiv"><CheckBoxOutlineBlank style={{ "background": "#C4C27A" }} /> For Age 45+</div>
                    <div className="HelpDiv"><CheckBoxOutlineBlank style={{ "background": "#ECFEAA" }} /> For Age 18+</div>
                    <div className="HelpDiv"><EventAvailable /> Date</div>
                    <div className="HelpDiv"><ConfirmationNumberRounded /> Doses Available</div>
                    <div className="HelpDiv"><CancelPresentation /> Fully Booked</div>
                    <div className="HelpDiv"><EmojiPeople /> Age</div>
                </div>
            </p>
            {/* <SimpleModal /> */}
        </div>
    );
    const getDistrict = (stateid) => {
        fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateid}`)
            .then(responsedistrict => responsedistrict.json())
            .then(DistrictData => {
                console.log(DistrictData)
                setDistrictList(DistrictData.districts)
            })
    }
    const getData = (districtid) => {
        fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=${districtid}&date=${todayDate}`)
            .then(response => response.json())
            .then(data => {
                setData(data)
                // setFilteredData(data)

                setDataAvailable(true)
                console.log("Main data set", data)
            })
    }
    useEffect(() => {

        console.log("Date= ", todayDate);
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
                                            console.log("Date2= ", todayDate);

                                            fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=${district.district_id}&date=${todayDate}`)
                                                .then(response => response.json())
                                                .then(data => {
                                                    setData(data)
                                                    setFilteredData(data)
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
        setFilterValue('0')
        getData(event.target.value)
    };
    // const handleChangeFilter = (event) => {
    //     setFilterValue(event.target.value);

    //     setFilterValue((state) => {
    //         console.log(state); // "React is awesome!"

    //         return state;
    //     });
    //     console.log(event.target.value, "filtered called", filterValue, data)
    //     setFilteredData(data)
    //     console.log(filterValue, "filtered data Before:", filteredData);
    //     {
    //         if (filterValue != '0') {

    //             filteredData.centers.map(center => {
    //                 var temp = center.sessions.filter(session => session.min_age_limit == { filterValue })
    //                 center.sessions = temp
    //             })


    //         }
    //     }
    //     setFilteredData(filteredData)
    //     console.log("filtered data:", filteredData);
    // };

    useEffect(() => {
        var dataStore = data
        { district && getData(district) }
        console.log("filter value changed:", filterValue, dataStore)
        setFilteredData(dataStore)
        console.log(filterValue, "filtered data Before:", filteredData);
        {
            if (filterValue != '0') {

                dataStore.centers.map(center => {
                    var temp = center.sessions.filter(session => session.min_age_limit == String(filterValue))
                    center.sessions = temp
                    console.log("temp", temp)
                })


            }
        }
        setFilteredData(dataStore)
        console.log("filtered data:", filteredData);
    }, [filterValue, data])


    return (
        <div className="mainContainer">
            <div className="mainContainer__option">
                <div className="mainContainer__option--div">
                    <FormControl className={classesSelect.formControl}>

                        <InputLabel id="demo-simple-select-label"
                            style={{
                                "color": "#0D3B66",
                                "margin": "20px",
                                "font-size": "1.5rem"
                            }}
                        >State</InputLabel>
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
                    </FormControl>
                </div>
                {districtList && <div className="mainContainer__option--div">
                    <FormControl className={classesSelect.formControl}>

                        <InputLabel id="demo-simple-select-label"
                            style={{
                                "color": "#0D3B66",
                                "margin": "20px",
                                "font-size": "1.5rem"
                            }}>District</InputLabel>
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
                    </FormControl>
                </div>}
                {districtList && <FormControl component="fieldset">
                    {/* <FormLabel component="legend">Filter</FormLabel> */}
                    <RadioGroup className="option" color={"626267"} aria-label="gender" name="gender1" value={filterValue} onChange={(e) => { setFilterValue(e.target.value) }}>
                        <FormControlLabel style={{ "color": "#000" }} value='0' control={<Radio />} label="All" />
                        <FormControlLabel style={{ "color": "#000" }} value='18' control={<Radio />} label="18+" />
                        <FormControlLabel style={{ "color": "#000" }} value='45' control={<Radio />} label="45+" />
                    </RadioGroup>
                </FormControl>}
            </div>
            <div className="mainContainer__data">
                {!dataAvailable ? <Loader district={district} /> : <div className="mainContainer__table">
                    {/* <p>You are seeing data of {districtList.map(each => { if (each.district_id == district) { return each.district_name } })} district in {stateList.states.map(each => { if (each.state_id == state) { return each.state_name } })}</p> */}
                    <InfoContainer data={filteredData} />
                </div>}
            </div>
            <div className="mainContainer__help">
                {/* <button type="button" onClick={handleOpen}>
                    Open Modal
                </button> */}
                <Help onClick={handleOpen} fontSize="large" style={{ "color": "#F95738" }} />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </div>
            <Footer />

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