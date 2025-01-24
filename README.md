# Network Infrastructure Workbook Documentation

This documentation serves as a guide for maintaining and implementing features in the **Network Infrastructure Workbook**, specifically focusing on use cases like capturing change status with time and updating column selectors when the Google Sheet structure changes.

---

## **Table of Contents**
- [Network Infrastructure Workbook Documentation](#network-infrastructure-workbook-documentation)
  - [**Table of Contents**](#table-of-contents)
  - [**Use Case Scenarios**](#use-case-scenarios)
  - [**Setup Instructions**](#setup-instructions)
    - [1. **Access the Google Sheet**](#1-access-the-google-sheet)
    - [2. **Open Apps Script**](#2-open-apps-script)
    - [3. **Global Configuration File**](#3-global-configuration-file)
      - [What you need to do](#what-you-need-to-do)
    - [**4. Creating a Function for a Target Sheet**](#4-creating-a-function-for-a-target-sheet)
    - [**5. Target Sheet Identification**](#5-target-sheet-identification)
    - [**6. Condition Statement for Status Updates**](#6-condition-statement-for-status-updates)
    - [**4. Save and Deploy**](#4-save-and-deploy)
  - [**Trigger Setup**](#trigger-setup)
    - [1. **Create a Trigger**](#1-create-a-trigger)
    - [2. **Save and Test**](#2-save-and-test)
  - [**Concepts of the Code**](#concepts-of-the-code)
    - [Change Status with Time Capture](#change-status-with-time-capture)
    - [Dynamic Column Selector](#dynamic-column-selector)

---

## **Use Case Scenarios**
**When to Use This Documentation:**
1. **Change Status with Time Capture**:  
   If you need to implement a feature to record status changes along with timestamps in the Google Sheet, refer to this guide for instructions.
   
2. **Updating Column Selectors**:  
   Whenever there are changes to the columns in the Google Sheet (e.g., new columns added, column order modified), you will need to update the column selector variables within the scripts to reflect the new structure.

---

## **Setup Instructions**

### 1. **Access the Google Sheet**
- Contact the admin to gain access to the Google Sheet titled **"Network Infrastructure"**.  
- Ensure you have edit permissions to use Google Apps Script.

### 2. **Open Apps Script**
- Open the **Network Infrastructure** Google Sheet.  
- Navigate to `Extensions` > `Apps Script`.  
- Create a new script file.

### 3. **Global Configuration File**
- The global configuration object has already been set up in the file `config.gs`. It defines default column indices used throughout the scripts:

```javascript
// Global Configuration Object
var CONFIG = {
  COL_START_DATE: 10,  // Default Start Date column
  COL_START_TIME: 11,  // Default Start Time column
  COL_END_DATE: 12,    // Default End Date column
  COL_END_TIME: 13,    // Default End Time column
  COL_LAST_UPDATE: 22, // Default Last Update column
  COL_TASK_STATUS: 17  // Default Task Status column
};
```
#### What you need to do
1. **Verify Column Indices:**
   
   Check that the indices in the Google Sheet match those defined in the `CONFIG` object. If they align, no changes are needed.

**Example:**
```js
function changeStatusInitTesting() {
    // Get the active cell, sheet, column, row, and value
    var activeCell = SpreadsheetApp.getActiveRange();
    var activeSheet = activeCell.getSheet();
    var activeColumn = activeCell.getColumn();
    var activeRow = activeCell.getRow();
    var activeValue = activeCell.getValue(); // Value of the dropdown
    
    var startDateCol = CONFIG.COL_START_DATE; // Start Date column
    var startTimeCol = CONFIG.COL_START_TIME; // Start Time column
    var endDateCol = CONFIG.COL_END_DATE;   // End Date column
    var endTimeCol = CONFIG.COL_END_TIME;   // End Time column
    var lastUpdateCol = 22; // Last Update column
    var taskStatusCol = CONFIG.COL_TASK_STATUS; // Task Status column 
```

2. **Adjust When Necessary:**
   
   If the column structure in the Google Sheet changes (e.g., columns are added, removed, or reordered), do the following:
   - Directly input the updated column selector values inside the `changeStatus` function.

**Example:**
```js
function changeStatusWapTermination() {
  // Get the active cell, sheet, column, row, and value
  var activeCell = SpreadsheetApp.getActiveRange();
  var activeSheet = activeCell.getSheet();
  var activeColumn = activeCell.getColumn();
  var activeRow = activeCell.getRow();
  var activeValue = activeCell.getValue(); // Value of the dropdown
  
  var startDateCol = 8; // Start Date column
  var startTimeCol = 9; // Start Time column
  var endDateCol = 10;   // End Date column
  var endTimeCol = 11;   // End Time column
  var lastUpdateCol = 18; // Last Update column
  var taskStatusCol = 15; // Task Status column   
```

### **4. Creating a Function for a Target Sheet**
When working with a specific sheet, you need to create a dedicated function, This section outlines the steps to create a function that corresponds to a specific sheet.

**Example Function**
For the sheet named "Tagging", create a function called `changeStatusTagging`. This will ensure proper handling of status updates for the "Tagging" sheet

```js
function changeStatusTagging() {
  // Script logic for handling status updates on the "Tagging" sheet
}
```
### **5. Target Sheet Identification**
The `TARGET_SHEET_ID` is used to specify the GID *(Google Sheet ID)* of the target sheet. This ensures that the script only executes for the intended sheet. Here's how to set it up:

```js
const TARGET_SHEET_ID = "1086098120"; // The GID of the target sheet
```

> **Key Notes:**
>
> - Replace `1086098120` with the actual GID of the desired sheet. You can find the GID in the URL of the Google Sheet (after `gid=`).
> - This constant will be referenced in your function to ensure the script targets the correct sheet.

### **6. Condition Statement for Status Updates**
The following condition statement is used to update column values for Start Date, Start Time, End Date, End Time, and Last Update, based on the dropdown value in the Task Status column:

```js
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
```

> **Key Points:**
>
> - The `Last Update` column (`lastUpdateCol)` is always updated with the current timestamp whenever the status changes.
> - The `Start Date` and `Start Time` columns are set when the status is changed to **On-Going**.
> - The `End Date` and `End Time` columns are set when the status is changed to **Completed**.
> - The `Last Update` column is used to log **On-going**,**Backjob**, and **Completed**.
>
> **Notes:**
> 
>  Ensure that the `formattedDate` and `formattedTime` variables are defined in your script to correctly format the current date and time before updating the cells.
>
> Always test the script in a good controlled environment to verify proper behavior after making changes.

### **4. Save and Deploy**
- Save the script project after making necessary changes.

## **Trigger Setup**

### 1. **Create a Trigger**
- Open the **Triggers** tab in the Apps Script editor.
- Selectee the function name that you created.
- Configure the following:
  - **Frequency:** Weekly notifications.
  - **Immediate Notifications:** Enable instant notifications for changes.
  - **Event Source:** `onChange`.

### 2. **Save and Test**
- Save the trigger configuration.
- Run the script manually to test functionality and make adjustments as necessary.

## **Concepts of the Code**

### Change Status with Time Capture
- This feature monitors changes in specific columns of the Google Sheet and appends a timestamp whenever a status update is made.
- Use Apps Script's `onChange` trigger to automate this process.

### Dynamic Column Selector
` The script uses the `CONFIG` global object to reference specific columns indices in the sheet.
- If the structure of the sheet changes:
  - Identify the new column positions.

> **Notes**
> - Ensure all scripts are tested before deploying them to production.
> - Any changes to the columns in the Google Sheet require manual updates to `config.gs` to avoid errors.
>
> For further assistance or troubleshooting, contact the administrator.
>
> This update integrates the `config.gs` file into the documentation while explaining its purpose and use. Let me know if anything else needs refinement!