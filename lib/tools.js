
function cleanDate(dateString) {
//     remove \n
    dateString = dateString.replace(/\n/g, '');

//     remove Closed: or Opened: or Opens: or Closes:
    dateString = dateString.replace(/Closed:|Opened:|Opens:|Closes:/g, '');
//     remove extra spaces around the date
    dateString = dateString.trim();
    return dateString;
}

function convertDate(dateString) {
    return new Date(dateString);
}