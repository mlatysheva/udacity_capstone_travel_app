// Check whether the city field is not empty
function checkInput(inputCity) {
    console.log(": Running checkInput :", inputCity);
    if(inputCity === '') {
        alert("The input is empty, enter a valid city!")
        return false;
    }
}
// Check whether the departure date is within 16 days.
function checkDate(inputDate) {
    const duration = Client.duration(inputDate);
    if (duration > 16 || duration < 0) {
        alert ('For the date chosen you will receive the historic weather.')
        return false;
    }
}

export { checkInput,
        checkDate }
