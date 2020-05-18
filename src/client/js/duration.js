// Calculate the number of days between two dates

function duration(date1, date2) {

    // Calculate the number of milliseconds per day
    const milliseconds_day = 1000 * 60 * 60 * 24;
    date1 = new Date(date1);

    // Convert the daparture date into Date object
    date2 = new Date(date2);    

    // Get the format out of the Date object to do math on

    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const period = Math.floor((utc2 - utc1) / milliseconds_day);
    
  return period;
}

export { duration }