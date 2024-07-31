module.exports = {
  // Format the time in a locale-specific format
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  
  // Format the date in MM/DD/YYYY format
  format_date: (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  },
};
