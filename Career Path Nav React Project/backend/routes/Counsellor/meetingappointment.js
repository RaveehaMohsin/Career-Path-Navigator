const express = require('express');
const sql = require('mssql');
const router = express.Router();

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

        const pool = await sql.connect();
        const result = await pool.request().query(`
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
        `);
        
        const counsellors = result.recordset;

        for (let counsellor of counsellors) {
            const availableDays = counsellor.availableDays.split(','); // e.g., "Monday,Tuesday"
            const timeSlots = counsellor.timeSlots.split('-'); // e.g., "08:00-18:00"
            
            // Get the time one hour before the selected time
            const previousDateTime = new Date(selectedDateTime);
            previousDateTime.setHours(selectedDateTime.getHours() - 1);

            console.log('One hour before selected date time:', previousDateTime);

            // Query to check if there are any meetings within the time range
            const meetingResultBooking = await pool.request().query(`
                SELECT * 
                FROM Meeting 
                WHERE counsellorId = ${counsellor.counsellorId} 
                AND MeetingDate = '${selectedDate}' 
                AND MeetingTime BETWEEN '${previousDateTime.toISOString().slice(11, 19)}' AND '${selectedDateTime.toISOString().slice(11, 19)}'
            `);

            if (meetingResultBooking.recordset.length > 0) {
                counsellor.status = 'Booked';
            } else if (
                !availableDays.includes(new Date(selectedDate).toLocaleString('en-US', { weekday: 'long' })) ||
                selectedTime < timeSlots[0] ||
                selectedTime >= timeSlots[1]
            ) {
                counsellor.status = 'Not Available';
            } else {
                counsellor.status = 'Available';
            }
        }

        res.json(counsellors);
    } catch (err) {
        console.error('Error fetching users and counsellors:', err);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;
