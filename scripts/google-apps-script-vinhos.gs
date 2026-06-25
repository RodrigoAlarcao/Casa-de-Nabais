// Casa de Nabais — Lead Capture: Comprar Vinho
// Google Apps Script Web App
//
// SETUP:
// 1. Abre script.google.com → New project
// 2. Cola este código (substitui o código existente)
// 3. Edita SHEET_ID e EMAIL_NOTIFICACAO abaixo
//    SHEET_ID: o ID da Google Sheet no URL (docs.google.com/spreadsheets/d/ESTE_ID/edit)
// 4. Deploy > New deployment > Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copia o URL e adiciona no Vercel como NEXT_PUBLIC_APPS_SCRIPT_URL_VINHOS

var SHEET_ID = '1mE3SlDRzSq2jvnOdkMXp5Y_BGpj0jKvsVmmOyadeKYo';
var SHEET_NAME = 'Leads_compras de vinhos';
var EMAIL_NOTIFICACAO = 'reservasnabais@gmail.com';

function doPost(e) {
  try {
    var data = e.parameter;

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Data', 'Nome', 'Email', 'Vinho', 'Caixas (6 garrafas)', 'Morada de Entrega']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var dataFormatada = Utilities.formatDate(new Date(), 'Europe/Lisbon', 'dd/MM/yyyy HH:mm');

    sheet.appendRow([
      dataFormatada,
      data.nome   || '',
      data.email  || '',
      data.vinho  || '',
      data.caixas || '',
      data.morada || ''
    ]);

    MailApp.sendEmail(
      EMAIL_NOTIFICACAO,
      '🍾 Nova intenção de compra de vinho — Casa de Nabais',
      'Nova intenção de compra recebida em ' + dataFormatada + '\n\n'
        + 'Nome: '             + (data.nome   || '—') + '\n'
        + 'Email: '            + (data.email  || '—') + '\n'
        + 'Vinho: '            + (data.vinho  || '—') + '\n'
        + 'Caixas (6 garf.): ' + (data.caixas || '—') + '\n'
        + 'Morada: '           + (data.morada || '—') + '\n'
    );

    return ContentService
      .createTextOutput('ok')
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    return ContentService
      .createTextOutput('error: ' + err.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('ok')
    .setMimeType(ContentService.MimeType.TEXT);
}
