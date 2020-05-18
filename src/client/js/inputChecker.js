// Check whether the city field is not empty
function checkInput(inputCity) {
    console.log(": Running checkInput :", inputCity);
    if(inputCity === '') {
        alert("The input is empty, enter a valid city!")
        return false;
    }
}
// Check whether the departure date is within 16 days.
function checkDate(today, inputDate) {
    const duration = Client.duration(today, inputDate);
    if (duration > 16 || duration < 0) {
        alert ('For the date chosen you will receive the historic weather.')
        return false;
    }
}

// Check whether the return date is more than the departure date
function checkTripLength(departure_date, return_date) {
    const length = Client.duration(departure_date, return_date);
    if (length < 0) {
        alert ('Enter a valid return date!');
    }
}


export { checkInput,
        checkDate,
        checkTripLength }
