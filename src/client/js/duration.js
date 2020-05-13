function duration(dep_date) {

    // Calculate the number of milliseconds per day
    const milliseconds_day = 1000 * 60 * 60 * 24;
    const today = new Date();

    // Convert the daparture date into Date object
    dep_date = new Date(dep_date);

    // Get the format out of the Date object to do math on

    const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const utc2 = Date.UTC(dep_date.getFullYear(), dep_date.getMonth(), dep_date.getDate());
    const period = Math.floor((utc2 - utc1) / milliseconds_day);
    
  return period;
}

export { duration }