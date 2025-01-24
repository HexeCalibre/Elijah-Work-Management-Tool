# Network Infrastructure Workbook Documentation

This documentation serves as a guide for maintaining and implementing features in the **Network Infrastructure Workbook**, specifically focusing on use cases like capturing change status with time and updating column selectors when the Google Sheet structure changes.

---

## **Use Case Scenarios**
### When to Use This Documentation:
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
- Create a file named `config.gs` in the Apps Script project.
- Add the following global configuration object to define default column indices:

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
- Use these configuration variables throughout your scripts to reference column indices.
- If columns are added, removed, or reordered in the Google Sheet, update the values in `config.gs`.

### 4. Save and Deploy
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
  - Update the values in config.gs to reflect the changes.

### **Notes**
- Ensure all scripts are tested before deploying them to production.
- Any changes to the columns in the Google Sheet require manual updates to `config.gs` to avoid errors.

> For further assistance or troubleshooting, contact the administrator.
>
> This update integrates the `config.gs` file into the documentation while explaining its purpose and use. Let me know if anything else needs refinement!