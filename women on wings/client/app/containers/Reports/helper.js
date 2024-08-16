import html2pdf from "html2pdf.js";
import { ORG_NAME } from "./constants";

export const dateFormatter = (datetime) => {
  const dateObj = new Date(datetime);

  const formattedDate = dateObj.toLocaleDateString();
  const formattedTime = dateObj.toLocaleTimeString();

  return formattedDate + " " + formattedTime;
};

export const handleDownload = (id, _title, margin = 1) => {
  // Get the table element
  const table = document.getElementById(id);

  // Get the table's width and height
  const tableWidth = table.offsetWidth;
  const tableHeight = table.offsetHeight;

  // Set the options for the PDF generation
  const options = {
    margin: margin,
    filename: "report.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    enableLinks: true,
  };

  const report = document.createElement("report");

  // create the header element
  const header = document.createElement("header");

  // create the title element with Bootstrap classes
  const title = document.createElement("h1");
  title.classList.add("navbar-brand");
  title.textContent = report_title;

  //create subtitle div
  const subdiv = document.createElement("div");
  subdiv.classList.add("row");
  subdiv.classList.add("mx-2");
  subdiv.classList.add("justify-content-between");

  // create the organization name element with Bootstrap classes
  const orgName = document.createElement("span");
  orgName.classList.add("navbar-text");
  orgName.textContent = ORG_NAME;

  // create the date and time element with Bootstrap classes and update its content
  const dateTime = document.createElement("span");
  dateTime.classList.add("navbar-text", "ml-auto");
  dateTime.textContent = new Date().toLocaleString();

  // append the elements to the header element
  header.appendChild(title);
  subdiv.appendChild(orgName);
  subdiv.appendChild(dateTime);
  header.appendChild(subdiv);

  report.prepend(header);
  report.append(table.cloneNode(true));

  // Generate the PDF using html2pdf.js
  //   html2pdf()
  //     .set(options)
  //     .from(table)
  //     .toPdf()
  //     .get("pdf")
  //     .then((pdf) => {
  //       // Save the PDF file
  //       pdf.save(options.filename);
  //     });

  //open pdf in new tab
  html2pdf().using(options).from(report).toPdf().output("dataurlnewwindow");

  // delete elements
  report.remove();
};


export const QtoM = (q) => {
  switch (q) {
    case "Q1":
      return "Jan-Mar";
    case "Q2":
      return "April-Jun";
    case "Q3":
      return "July-Sept";
    case "Q4":
      return "Aug-Dec";
    default:
      break;
  }
}