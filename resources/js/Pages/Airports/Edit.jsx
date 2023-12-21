import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "@/Layouts/Layout.jsx";
import {useCookies} from "react-cookie";
const Edit = ({item_id }) => {
    const [airportData, setAirportData] = useState({
        name: '',
        iata_code: '',
        city: '',
        country_id: ''
    });

    useEffect(() => {
        axios.get(`/api/airport/${item_id}`, {})
            .then(response => {
                const { name, iata_code, city, country_id } = response.data;
                setAirportData({ name, iata_code, city, country_id });
            })
            .catch(error => {
                console.error('Error fetching airport data:', error);
            });
    }, [item_id]);

    const handleChange = event => {
        const { name, value } = event.target;
        setAirportData(prevData => ({
            ...prevData,
            [name]: value
        }));

    };
    const [cookies] = useCookies(["access_token"]);

    const handleSubmit = event => {

        const access_token = cookies.access_token;

        console.log("access_token", access_token);


        event.preventDefault();
        // Implement logic to update the airport data using axios PUT request
        axios.put(`/api/airport/${item_id}`, airportData,
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            })
            .then(response => {
                console.log('Airport data updated:', response.data);
                // Perform additional actions upon successful update
            })
            .catch(error => {
                console.error('Error updating airport data:', error);
            });
    };
    useEffect(() => {
        console.log('Updated airport data:', airportData);
    }, [airportData]);


    return (
        <Layout>
            <div className="p-4 sm:p-8 bg-gray-200 mx-auto shadow sm:rounded-lg custom-margins text-center">

                <h2>Edit Airport {item_id}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={airportData.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        IATA Code:
                        <input
                            type="text"
                            name="iata_code"
                            value={airportData.iata_code}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={airportData.city}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Country ID:
                        <input
                            type="text"
                            name="country_id"
                            value={airportData.country_id}
                            onChange={handleChange}
                        />
                    </label>
                    <button className="adminButton" type="submit">Update Airport</button>
                </form>
            </div>
        </Layout>
    );
};

export default Edit;
