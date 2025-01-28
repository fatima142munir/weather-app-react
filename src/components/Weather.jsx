import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { FaTemperatureLow } from "react-icons/fa";
import { MdWindPower } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { FaLocationCrosshairs } from "react-icons/fa6";

const Weather = () => {
    const [weatherData, setWeatherData] = useState(false)
    const [cityName, setCityName] = useState("")
    const [loader, setLoader] = useState(false)
    const [showError, setShowError] = useState("")


    const API = "f0376b6deb36067898020a8b7253fbdf"
    const search = async (cityName) => {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API}`
        setLoader(true)
        setShowError("")

        try {
            const res = await fetch(URL);
            const data = await res.json();
            if (res.status === 200) {
                
                setLoader(false)
                // console.log(data, cityName)
                setWeatherData({
                    humidity: data.main.humidity,
                    temperature: Math.floor(data.main.temp),
                    windSpeed: data.wind.speed,
                    location: data.name
                })

            }

        } catch (error) {
            if (res.status !== 200) {
                setLoader(false)
                setShowError("Error in Loading")
                console.log(error)
            }
        }
        setLoader(false)
        setCityName("")
    }

    const handleSearch = () => {
        if (cityName.length > 0) {
            search(cityName);
            // console.log(cityName)
        } else {
            setShowError("Kindly enter a city name.");
        }  
    };


    return (
        <>
            <div className='text-white shadow-lg shadow-white/50 bg-linear-to-t from-sky-500 to-indigo-500 md:w-[30vw] md:h-[80vh] w-full h-[100vh] rounded-lg py-20 md:py-10 mx-auto md:my-[50px]'>
                <h1 className='text-center p-5 text-4xl font-bold'>Weather App</h1>
                <div className='sm:flex-row flex gap-3 flex-wrap justify-center p-5'>
                    <div>
                        <input onChange={(e) => {
                            setCityName(e.target.value)
                        }} value={cityName} className='bg-amber-50 outline-none p-2 text-black rounded-lg' type="text" placeholder='Search' />
                    </div>
                    <button type='submit' onClick={handleSearch}  >
                        <IoSearch className='cursor-pointer h-[40px] w-[40px]' />
                    </button>
                </div>
                {loader && <p className='text-3xl text-center p-1'>Loading...</p>}
                {/* {showError && <p className='text-3xl text-center p-1'>error..</p>} */}
                <p className='text-3xl text-center p-1'>{showError}</p>
                <div className='w-[150px] text-3xl m-auto text-center'>
                    <div className='flex gap-2'>
                        <FaTemperatureLow className='w-[40px] h-[50px]' /> <p>{weatherData.temperature}</p>
                    </div>
                    <div className='flex gap-2'>
                        <MdWindPower className='w-[40px] h-[50px]' /> <p>{weatherData.windSpeed}</p>
                    </div>
                    <div className='flex gap-2'>
                        <WiHumidity className='w-[40px] h-[50px]' /> <p>{weatherData.humidity}</p>
                    </div>
                    <div className='flex gap-2'>
                        <FaLocationCrosshairs className='w-[40px] h-[50px]' /> <p>{weatherData.location}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Weather