/*import {useState, useEffect} from 'react';
import './CountdownTimer.css';
import {getRemainingTimeUntilMsTimestamp} from './utils/CountdownUtil';

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}

const CountdownTimer = ({countdownTimestampMs}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    },[countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return(
        <div className="countdown-timer">
            <span>{remainingTime.days}</span>
            <span>days</span>
            <span className="two-numbers">{remainingTime.hours}</span>
            <span>hours</span>
            <span className="two-numbers">{remainingTime.minutes}</span>
            <span>minutes</span>
            <span className="two-numbers">{remainingTime.seconds}</span>
            <span>seconds</span>
        </div>
    );
}

export default CountdownTimer;*/

// Import necessary dependencies from React and Dayjs library
import { useState, useEffect } from 'react';
import './CountdownTimer.css';
import dayjs from 'dayjs';

// Define the CountdownTimer component which takes a countdownTimestampMs prop
const CountdownTimer = ({ countdownTimestampMs }) => {
    // Define state to hold the remaining time
    const [remainingTime, setRemainingTime] = useState({
        seconds: '00',
        minutes: '00',
        hours: '00',
        days: '00'
    });

    // Effect hook to update the remaining time every second
    useEffect(() => {
        // Set up an interval to update the remaining time every second
        const intervalId = setInterval(() => {
            // Call the updateRemainingTime function to calculate the remaining time
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        // Clean up function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [countdownTimestampMs]); // Dependency array to re-run the effect when the countdownTimestampMs prop changes

    // Function to calculate and update the remaining time
    function updateRemainingTime(countdown) {
        const timestampDayjs = dayjs(countdown); // Convert the countdown timestamp to a Dayjs object
        const nowDayjs = dayjs(); // Get the current time as a Dayjs object

        // Check if the countdown has reached or passed the specified timestamp
        if (timestampDayjs.isBefore(nowDayjs)) {
            // If so, set remaining time to all zeros
            setRemainingTime({
                seconds: '00',
                minutes: '00',
                hours: '00',
                days: '00'
            });
        } else {
            // If not, calculate the remaining time
            setRemainingTime({
                seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
                minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
                hours: getRemainingHours(nowDayjs, timestampDayjs),
                days: getRemainingDays(nowDayjs, timestampDayjs)
            });
        }
    }

    // Helper functions to calculate remaining seconds, minutes, hours, and days
    function getRemainingSeconds(nowDayjs, timestampDayjs) {
        const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60; // Calculate remaining seconds
        return padWithZeros(seconds, 2); // Ensure the result is a two-digit number
    }

    function getRemainingMinutes(nowDayjs, timestampDayjs) {
        const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60; // Calculate remaining minutes
        return padWithZeros(minutes, 2); // Ensure the result is a two-digit number
    }

    function getRemainingHours(nowDayjs, timestampDayjs) {
        const hours = timestampDayjs.diff(nowDayjs, 'hours') % 24; // Calculate remaining hours
        return padWithZeros(hours, 2); // Ensure the result is a two-digit number
    }

    function getRemainingDays(nowDayjs, timestampDayjs) {
        const days = timestampDayjs.diff(nowDayjs, 'days'); // Calculate remaining days
        return days.toString(); // Convert days to string
    }

    // Function to pad a number with zeros to ensure it's a certain length
    function padWithZeros(number, minLength) {
        const numberString = number.toString(); // Convert number to string
        // If the number of digits is already equal to or greater than minLength, return it as is
        if (numberString.length >= minLength) return numberString;
        // Otherwise, prepend zeros to make it minLength digits long
        return "0".repeat(minLength - numberString.length) + numberString;
    }

    // Render the countdown timer with the remaining time
    return (
        <div className="countdown-timer">
            {/* Display remaining days */}
            <div class="title">Countdown Timer</div>
            <span>{remainingTime.days}</span>
            <span>days :</span>
            {/* Display remaining hours */}
            <span className="two-numbers">{remainingTime.hours}</span>
            <span>hours :</span>
            {/* Display remaining minutes */}
            <span className="two-numbers">{remainingTime.minutes}</span>
            <span>minutes :</span>
            {/* Display remaining seconds */}
            <span className="two-numbers">{remainingTime.seconds}</span>
            <span>seconds</span>
        </div>
    );
}

// Export the CountdownTimer component
export default CountdownTimer;
