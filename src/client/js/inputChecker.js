function checkInput(inputCity) {
    console.log(": Running checkInput :", inputCity);
    if(inputCity === '') {
        alert("The input is empty, enter a valid city!")
        return false;
    }
}

function checkDate(inputDate) {
    const duration = Client.duration(inputDate);
    if (duration > 16) {
        console.log('The date of your trip is more than 16 days away.')
        console.log('No weather forecast is available for such a distant date.')
        console.log('Please come back closer to your departure date.')
        return duration
    }
}

export { checkInput,
        checkDate }
