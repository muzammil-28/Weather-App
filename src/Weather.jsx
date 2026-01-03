import Style from './Weather.module.css'
import { useState } from 'react'
import axios from "axios"

function Weather() {

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState('');

    const fetchWeather = async () => {
        if(city === '') return;
        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'4aeab6b6dfe83bfa096fe801e0b35822'}`);
            // console.log(response);
            setWeather(response.data);
        }
        catch(error)
        {
            console.log("Error is = ", error);
        }
    }
    
    const handleSubmit = (data) => {
        data.preventDefault();
        fetchWeather();
    }
    return (
        <div>
            <div className={Style.container}>
                <h2>Check Weather</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder='Enter City' 
                        value={city} onChange={(e) => setCity(e.target.value)} 
                    />
                    <input type="submit" value="Check Weather" />
                </form>
                {weather && (
                    <>
                        <div className={Style.weatherContent}>
                            <h3>{weather.name}</h3>
                            <h4>{weather.main.temp} °C</h4>
                            <p>{weather.weather[0].description}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
  )
}

export default Weather