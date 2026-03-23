// Green Dev — Shopify Training NL
// Google Apps Script — Waitlist form handler
//
// Setup:
//   1. Open your Google Sheet
//   2. Extensions → Apps Script → paste this file
//   3. Deploy → New deployment → Web app
//      - Execute as: Me
//      - Who has access: Anyone
//   4. Copy the web app URL into src/public/submit.php (APPS_SCRIPT_URL)

const SHEET_NAME = 'Aanmeldingen';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.token !== 'gd-training-2026') {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet + header row on first run
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Tijdstip', 'Naam', 'E-mail', 'Stad', 'Niveau']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' }),
      data.name  || '',
      data.email || '',
      data.city  || '',
      data.level || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test via GET — visit the web app URL in your browser to verify it's live
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Green Dev submit endpoint is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
