# Sending chapter-download sign-ups to a Google Sheet

When a visitor fills in the "Download Full Chapter" form, the site sends their
name and email to a small script attached to your Google Sheet, which adds a row.

## 1. Create the sheet

1. Create a new Google Sheet (for example "Chapter Five downloads").
2. In row 1, type these headings: `Date`, `Name`, `Email`, `Chapter`.

## 2. Add the script

1. In the sheet, open **Extensions → Apps Script**.
2. Delete whatever is there and paste this:

```js
// Choose any long random phrase and use the same one in Vercel (step 4).
const SECRET = "change-me-to-a-long-random-phrase";

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.secret !== SECRET) {
    return ContentService.createTextOutput("forbidden");
  }
  SpreadsheetApp.getActiveSpreadsheet()
    .getSheets()[0]
    .appendRow([new Date(), data.name, data.email, data.chapter]);
  return ContentService.createTextOutput("ok");
}
```

3. Change `SECRET` to your own phrase and click **Save**.

## 3. Publish the script

1. Click **Deploy → New deployment**.
2. Click the gear icon and choose **Web app**.
3. Set **Execute as** to *Me* and **Who has access** to *Anyone*.
4. Click **Deploy**, approve the permission prompt, and copy the **Web app URL**
   (it ends in `/exec`).

## 4. Tell the website about it

In Vercel, open the project → **Settings → Environment Variables** and add:

| Name | Value |
|---|---|
| `GOOGLE_SHEET_WEBHOOK_URL` | the Web app URL from step 3 |
| `GOOGLE_SHEET_WEBHOOK_SECRET` | the same phrase you put in `SECRET` |

Then **Redeploy** the latest deployment so the settings take effect.

## Notes

- Until these are set, the chapter still downloads but sign-ups are **not saved**.
- If you edit the script later, use **Deploy → Manage deployments → Edit → New
  version**, otherwise the old version keeps running.
- To replace the chapter file, overwrite `private/chapter-five.pdf` and redeploy.
