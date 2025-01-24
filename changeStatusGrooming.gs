function changeStatusGrooming() {
  // Get the active cell, sheet, column, row, and value
  var activeCell = SpreadsheetApp.getActiveRange();
  var activeSheet = activeCell.getSheet();
  var activeColumn = activeCell.getColumn();
  var activeRow = activeCell.getRow();
  var activeValue = activeCell.getValue(); // Value of the dropdown
  
  var startDateCol = 2; // Start Date column
  var startTimeCol = 3; // Start Time column
  var endDateCol = 4;   // End Date column
  var endTimeCol = 5;   // End Time column
  var lastUpdateCol = 10; // Last Update column
  var taskStatusCol = 8; // Task Status column

  const TARGET_SHEET_ID = "2142475228"; // The GID of the target sheet


  // Check if the active sheet matches the target sheet
  if (activeSheet.getSheetId().toString() === TARGET_SHEET_ID) {
    // Check if the edited column is COL_TASK_STATUS
    if (activeColumn === taskStatusCol) {
      var now = new Date(); // Current date and time
      var dateFormat = "M/d/yyyy"; // Short date format
      var timeFormat = "HH:mm:ss"; // Time format
      var formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), dateFormat);
      var formattedTime = Utilities.formatDate(now, Session.getScriptTimeZone(), timeFormat);

      // Check the dropdown value and update corresponding columns
      if (activeValue === "On-Going") {
        // Set Start Date and Start Time
        activeSheet.getRange(activeRow, lastUpdateCol).setValue(new Date()); // Set Last Update
        activeSheet.getRange(activeRow, startDateCol).setValue(formattedDate); // Set Start Date
        activeSheet.getRange(activeRow, startTimeCol).setValue(formattedTime); // Set Start Time
      } else if (activeValue === "Completed") {
        // Set End Date and End Time
        activeSheet.getRange(activeRow, lastUpdateCol).setValue(new Date()); // Set Last Update
        activeSheet.getRange(activeRow, endDateCol).setValue(formattedDate); // Set End Date
        activeSheet.getRange(activeRow, endTimeCol).setValue(formattedTime); // Set End Time
      } else if (activeValue === "Backjob") {
        // Set Backjob Date to Last Update column
        activeSheet.getRange(activeRow, lastUpdateCol).setValue(new Date());
      }
    }
  }
}