import React from 'react'
import Lottie from 'react-lottie';
import StateWait from './../Lottie Files/StateWaitLoader.json';

function StateWaitLoader() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: StateWait,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className="stateWaitLoader">
            <Lottie
                options={defaultOptions}
                height={200}
                width={200}
            />
            <h1>Wait, We are build something amazing!!</h1>
        </div>
    )
}

export default StateWaitLoader
