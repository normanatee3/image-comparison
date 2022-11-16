import React, { useState } from 'react'
import deepai from "deepai"

function ImageComparison({ APIkey }) {

    const [first, setFirst] = useState("")
    const [second, setSecond] = useState("")
    const [url, setUrl] = useState(true)
    const [confirmed, setConfirmed] = useState(false)
    const [result, setResult] = useState(null)

    const handleFirstChange = (e) => {
        setFirst(e.target.value)
    }
    const handleSecondChange = (e) => {
        setSecond(e.target.value)
    }
    const handleFirstUp = (e) => {
        setFirst(URL.createObjectURL(e.target.files[0]))
        
    }
    const handleSecondUp = (e) => {
        setSecond(URL.createObjectURL(e.target.files[0]))
    }
    const goBack = () => {
        setFirst('')
        setSecond('')
        setResult(null)
        setConfirmed(false)
    }


    deepai.setApiKey(APIkey);
    // console.log(deepai.apiKey);

    const submitUrl = async (e) => {
        e.preventDefault()
        const res = await deepai.callStandardApi("image-similarity", {
            image1: first,
            image2: second,
        });
        // console.log("distance: ", res.output.distance);
        setResult(res.output.distance)
    }
    const submitFile = async (e) => {
        e.preventDefault()
        const res = await deepai.callStandardApi("image-similarity", {
            image1: document.getElementById('firstFile'),
            image2: document.getElementById('secondFile'),
        });
        // console.log("distance: ", res.output.distance);
        setResult(res.output.distance)
    }
    return (
        <div>
            <hr />
            <h1>IMAGE COMPARISON</h1>
            <button className='customButton' onClick={() => console.log(deepai.apiKey)}>key check</button>
            <button onClick={() => setUrl(!url)}>Change Input</button>

            <form onSubmit={url ? 
                submitUrl 
                : 
                submitFile
                }>
                <h1>INPUT {url ? "URLS" : "FILES"}</h1>
                    {url ? null :
                    <>
                    <input
                        type="file"
                        id='firstFile'
                        accept="image/png, image/jpeg"
                        name="first"
                        onChange={(e) => { handleFirstUp(e) }}
                    />
                    <br />
                    <input
                        type="file"
                        id='secondFile'
                        accept="image/png, image/jpeg"
                        name="second"
                        onChange={(e) => { handleSecondUp(e) }}
                    />

                </>}
                {confirmed ?
                    <>
                        {url ? null : <h4>WARNING: <br /> since you are uploading files, it may take <br /> some time to deliver a result after pressing submit.</h4> }
                        <h4>Everything looking good?</h4>
                        <button onClick={goBack}>Go Back</button>
                        <br />
                        <button type='submit'>Submit</button>
                        <div className='picContainer'>
                            <img className='picFrame' style={{}} src={first} alt="Invalid Image" />
                            <img className='picFrame' style={{}} src={second} alt="Invalid Image" />
                        </div>
                        {result === null ? null : <h3>Your Images have a similary score of: {result} <br /> (a lower score means more similar)</h3>}
                    </>
                    : <>
                        {url ?
                            <>
                                <input
                                    type="url"
                                    name="first"
                                    onChange={(e) => { handleFirstChange(e) }}
                                />
                                <br />
                                <input
                                    type="url"
                                    name="second"
                                    onChange={(e) => { handleSecondChange(e) }}
                                />
                            </>
                            :
                            null
                        }
                        <br />
                        <button onClick={() => setConfirmed(true)}>Confirm Images</button>
                        <br />
                    </>}

            </form>

        </div>
    )
}

export default ImageComparison