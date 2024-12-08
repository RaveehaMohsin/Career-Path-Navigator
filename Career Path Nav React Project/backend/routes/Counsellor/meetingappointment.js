const express = require('express');
const mysql = require('mysql'); // Using 'mysql' package
const router = express.Router();
const connection = require('../../database/mysql');

router.get('/', async (req, res) => {
    const { selectedDate, selectedTime } = req.query; // Date and time sent as query params

    try {
        // Combine selectedDate and selectedTime into a single string and create a Date object
        const selectedDateTime = new Date(`${selectedDate}T${selectedTime}:00`);

        // Get the local time zone offset in minutes
        const offset = selectedDateTime.getTimezoneOffset();

        // Adjust the selected date and time by subtracting the time zone offset to convert it to local time
        selectedDateTime.setMinutes(selectedDateTime.getMinutes() - offset);

        console.log('Selected DateTime (local time):', selectedDateTime);

        // Query to get counsellors and their details
        connection.query(`
            SELECT 
                U.userId, 
                U.firstName,  
                U.lastName, 
                U.email, 
                U.role, 
                C.counsellorId, 
                C.expertise, 
                C.noOfDaysAvailable, 
                C.availableDays, 
                C.timeSlots, 
                C.qualifications, 
                C.hourlyRate,
                P.Gender, 
                P.PhoneNo, 
                P.CNIC, 
                P.DOB, 
                P.Address, 
                P.City, 
                P.Country, 
                P.Img
            FROM Users U
            INNER JOIN Counsellor C
                ON U.userId = C.counsellorId
            INNER JOIN Person P
                ON U.userId = P.userId
        `, async (err, result) => {
            if (err) {
                console.error('Error fetching data from MySQL:', err);
                return res.status(500).send('Error fetching data');
            }

            const counsellors = result;

            const statusPromises = counsellors.map(async (counsellor) => {
                const availableDays = counsellor.availableDays.split(','); // e.g., "Monday,Tuesday"
                const timeSlots = counsellor.timeSlots.split('-'); // e.g., "08:00-18:00"

                // Convert timeSlots to minutes since midnight for easy comparison
                const [startTime, endTime] = timeSlots.map(time => {
                    const [hour, minute] = time.split(':').map(Number);
                    return hour * 60 + minute;
                });

                const selectedTimeInMinutes = selectedTime.split(':').map(Number).reduce((acc, time, index) => acc + (index === 0 ? time * 60 : time), 0);

                // Get the time one hour before the selected time
                const previousDateTime = new Date(selectedDateTime);
                previousDateTime.setHours(selectedDateTime.getHours() - 1);

                console.log('One hour before selected date time:', previousDateTime);

                // Query to check if there are any meetings within the time range
                return new Promise((resolve, reject) => {
                    connection.query(`
                        SELECT * 
                        FROM Meeting 
                        WHERE counsellorId = ${counsellor.counsellorId} 
                        AND MeetingDate = '${selectedDate}' 
                        AND MeetingTime BETWEEN '${previousDateTime.toISOString().slice(11, 19)}' AND '${selectedDateTime.toISOString().slice(11, 19)}'
                    `, (err, meetingResultBooking) => {
                        if (err) {
                            console.error('Error checking meeting availability:', err);
                            reject('Error checking meeting availability');
                        }

                        if (meetingResultBooking.length > 0) {
                            counsellor.status = 'Booked';
                        } else if (
                            !availableDays.includes(new Date(selectedDate).toLocaleString('en-US', { weekday: 'long' })) ||
                            selectedTimeInMinutes < startTime ||
                            selectedTimeInMinutes >= endTime
                        ) {
                            counsellor.status = 'Not Available';
                        } else {
                            counsellor.status = 'Available';
                        }

                        resolve(); // Resolve once the status is set
                    });
                });
            });

            // Wait for all status updates to complete
            await Promise.all(statusPromises);

            res.json(counsellors); // Send the final list of counsellors with their status
        });
    } catch (err) {
        console.error('Error processing the request:', err);
        res.status(500).send('Error processing the request');
    }
});

module.exports = router;
