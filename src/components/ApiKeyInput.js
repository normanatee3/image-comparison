import React, { useState, useEffect } from 'react'
import ImageComparison from './ImageComparison'

function ApiKeyInput() {
    const [key, setKey] = useState(null)
    const [activeKey, setActiveKey] = useState('quickstart-QUdJIGlzIGNvbWluZy4uLi4K')
    const [show, setShow] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const keyCheck = async () => {
        const existingKey = localStorage.getItem("ISAkey")
        if (!existingKey) {
            return null
        } else {
            // console.log(existingKey)
            setActiveKey(existingKey)
            return (existingKey)
        }
    }
    const displayKey = () => {
        setShow(!show)
    }
    const resetKey = () => {
        localStorage.removeItem("ISAkey")
        setActiveKey(null)
    }

    useEffect(() => {
        keyCheck()
    }, [refresh])

    const handleKeyChange = (e) => {
        setKey(e.target.value)
    }
    const handleFormSubmission = (e) => {
        e.preventDefault()
        // console.log(key);
        localStorage.setItem("ISAkey", key)
        setRefresh(!refresh)
    }

    return (
        <div>
            {activeKey === null
                ?
                <>
                    <h4>No key found. Please submit a valid key.</h4>
                    <form onSubmit={handleFormSubmission}>
                        <input required type="text" name="apiKey" onChange={(e) => { handleKeyChange(e) }} />
                        <button type='submit'>Submit</button>
                    </form>
                </>
                :
                <>
                    <h4>Key found.</h4>
                    <button onClick={resetKey}>reset key</button>
                    {show?
                    <>
                    <button onClick={displayKey}>hide</button>
                    <h4>{activeKey}</h4>
                    </>
                    :
                    <>
                    <button onClick={displayKey}>show</button>
                    </>
                    }
                    <ImageComparison APIkey={activeKey}/>
                </>
            }
        </div>
    )
}

export default ApiKeyInput