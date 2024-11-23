export function GetCurrentDate() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  //var hour = now.getHours();
  //var minute = now.getMinutes();
  //var second = now.getSeconds();
  if (month.toString().length == 1) {
    var month = "0" + month;
  }
  if (day.toString().length == 1) {
    var day = "0" + day;
  }

  var CurrentDate = `${year}-${month}-${day} 00:00:00`;
  return CurrentDate;
}

export function formatDateTime(inputDate) {
  const date = new Date(inputDate);

  // Helper function to pad numbers to two digits
  const pad = (num) => num.toString().padStart(2, "0");

  // Extract components
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Months are 0-indexed
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12; // Convert '0' to '12' for midnight
  const formattedHours = pad(hours);

  // Format the date
  const formattedDate = `${day}-${month}-${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  return formattedDate;
}

export function formatDate(inputDate) {
  const date = new Date(inputDate);

  // Helper function to pad numbers to two digits
  const pad = (num) => num.toString().padStart(2, "0");

  // Extract components
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Months are 0-indexed
  const year = date.getFullYear();

  // Format the date
  const formattedDate = `${year}-${month}-${day} 00:00:00`;
  return formattedDate;
}

export function getformatedCurDate() {
  const date = new Date();

  // Helper function to pad numbers to two digits
  const pad = (num) => num.toString().padStart(2, "0");

  // Extract components
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Months are 0-indexed
  const year = date.getFullYear();

  // Format the date
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}
