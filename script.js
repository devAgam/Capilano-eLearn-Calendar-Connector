// quiz dates are in a div with attribute data-region with the value of activity-dates

//get that div
const dates = document.querySelector('[data-region="activity-dates"]');

// Get the child elements within the main element
const childElements = dates.getElementsByTagName("div");

// Loop through the child elements and extract the date values
let openedDate, closesDate;

for (let i = 0; i < childElements.length; i++) {
  const childElement = childElements[i];

  // Check if the element contains the "Opened" or "Closes" text
  if (childElement.textContent.includes("Open")) {
    //     check both Opens and Opened
    openedDate = childElement.textContent.split("Opened:");
    if (openedDate.length < 2) {
      openedDate = childElement.textContent.split("Opens:");
    }
  } else if (childElement.textContent.includes("Close")) {
    //     check both Closes and Closed
    closesDate = childElement.textContent.split("Closed:");
    if (closesDate.length < 2) {
      closesDate = childElement.textContent.split("Closes:");
    }
  }
}
//generate ics file with the dates
function generateICSFile() {
  //     new var dStart should be 2 hours before the closes date
  const dStart = new Date(convertDate(cleanDate(closesDate[1])));
  dStart.setHours(dStart.getHours() - 2);

  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${dStart.toISOString().replace(/-|:|\.\d\d\d/g, "")}
DTEND:${convertDate(cleanDate(closesDate[1]))
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, "")}
SUMMARY:${getAllTextInOl()}
DESCRIPTION:Quiz Due in 2 hours @ ${getCurrentUrl()} 
LOCATION:Capilano eLearn
END:VEVENT
END:VCALENDAR`;
}

function convertIcsFileToBlob() {
  return new Blob([generateICSFile()], {
    type: "text/calendar;charset=utf-8",
  });
}

function downloadIcsFile() {
  const blob = convertIcsFileToBlob();
  const downloadUrl = URL.createObjectURL(blob);
  window.open(downloadUrl, "_blank");
}

function addBt() {
  if (dates) {
    //     add bt to class name activity-header div
    const activityHeader = document.querySelector(".activity-header");
    const bt = document.createElement("button");
    bt.innerHTML = "Add to Calendar";
    bt.style.marginTop = "10px";
    bt.style.marginBottom = "10px";
    bt.style.padding = "10px";
    bt.style.borderRadius = "5px";
    bt.style.backgroundColor = "#4CAF50";
    bt.style.color = "white";
    bt.style.border = "none";
    bt.style.cursor = "pointer";
    bt.addEventListener("click", downloadIcsFile);
    activityHeader.appendChild(bt);
  }
}

if (dates) {
  addBt();
}
function getAllTextInOl() {
  //     breadcrumb is the ol element with classname breadcrumb get only the text
  const breadcrumb = document.querySelector(".breadcrumb");
  let breadcrumbText = breadcrumb.textContent;
  // remove extra spaces
  breadcrumbText = breadcrumbText
    .replace(/^\s+|\s+$/g, "")
    .replace(/\s+/g, " ");

  return breadcrumbText;
}
getAllTextInOl();

function getCurrentUrl() {
  return window.location.href;
}
