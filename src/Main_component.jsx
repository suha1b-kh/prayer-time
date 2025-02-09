import React, { useState, useEffect } from "react";
import "./style.css";

const Main = () => {
    const [prayerTimes, setPrayerTimes] = useState({});
    const [city, setCity] = useState("Amman");
    const [country, setCountry] = useState("Jo");
    const date = (() => {
        const date = new Date();
        return `${String(date.getDate()).padStart(2, "0")}-${String(
            date.getMonth() + 1
        ).padStart(2, "0")}-${date.getFullYear()}`;
    })();
    useEffect(() => {
        const fetchPrayerTime = async () => {
            const date = (() => {
                const date = new Date();
                return `${String(date.getDate()).padStart(2, "0")}-${String(
                    date.getMonth() + 1
                ).padStart(2, "0")}-${date.getFullYear()}`;
            })();
            let url =
                "https://api.aladhan.com/v1/timingsByCity/" +
                date +
                "?" +
                "city" +
                "=" +
                country +
                "&country=" +
                city;
            try {
                const response = await fetch(url);
                const dataPrayer = await response.json();
                setPrayerTimes(dataPrayer.data.timings);
                console.log(url);
            } catch (error) {
                alert("error");
            }
        };

        fetchPrayerTime();
    }, [city, country]);
    const handleCityChange = (event) => {
        setCity(event.target.value);
        const selectedCountry = event.target.value;

        setCountry(selectedCountry);
    };

    return (
        <section>
            <div className="main">
                <h1>مواقيت الصلاة</h1>
                <div className="country-date">
                    <select value={city} onChange={handleCityChange}>
                        <option value="JO">الاردن</option>
                        <option value="PS">فلسطين</option>
                        <option value="SA">السعودية</option>
                        <option value="SY">سوريا</option>
                        <option value="EG">مصر</option>
                    </select>
                    <h3>{date}</h3>
                </div>
                <hr />
                <div className="times">
                    <div className="time">
                        <h4>الفجر</h4>
                        <h4>{prayerTimes.Fajr}</h4>
                    </div>
                    <div className="line"></div>
                    <div className="time">
                        <h4>الظهر</h4>
                        <h4>{prayerTimes.Dhuhr}</h4>
                    </div>
                    <div className="line"></div>
                    <div className="time">
                        <h4>العصر</h4>
                        <h4>{prayerTimes.Asr}</h4>
                    </div>
                    <div className="line"></div>
                    <div className="time">
                        <h4>المغرب</h4>
                        <h4>{prayerTimes.Maghrib}</h4>
                    </div>
                    <div className="line"></div>
                    <div className="time">
                        <h4>العشاء</h4>
                        <h4>{prayerTimes.Isha}</h4>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;
