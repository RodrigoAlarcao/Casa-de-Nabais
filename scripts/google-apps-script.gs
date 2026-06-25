// Casa de Nabais — Lead Capture
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
// 5. Copia o URL e adiciona no Vercel como NEXT_PUBLIC_APPS_SCRIPT_URL

var SHEET_ID = 'COLE_AQUI_O_ID_DA_GOOGLE_SHEET';
var SHEET_NAME = 'Leads';
var EMAIL_NOTIFICACAO = 'reservasnabais@gmail.com';

function doPost(e) {
  try {
    var data = e.parameter;

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Data', 'Nome', 'Email', 'Telefone', 'Check In', 'Check Out', 'Hóspedes', 'Mensagem']);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var dataFormatada = Utilities.formatDate(new Date(), 'Europe/Lisbon', 'dd/MM/yyyy HH:mm');

    sheet.appendRow([
      dataFormatada,
      data.nome || '',
      data.email || '',
      data.telefone || '',
      data.checkIn || '',
      data.checkOut || '',
      data.pessoas || '',
      data.mensagem || ''
    ]);

    MailApp.sendEmail(
      EMAIL_NOTIFICACAO,
      '🏡 Novo pedido de reserva — Casa de Nabais',
      'Novo pedido recebido em ' + dataFormatada + '\n\n'
        + 'Nome: '      + (data.nome || '—')     + '\n'
        + 'Email: '     + (data.email || '—')    + '\n'
        + 'Telefone: '  + (data.telefone || '—') + '\n'
        + 'Check In: '  + (data.checkIn || '—')  + '\n'
        + 'Check Out: ' + (data.checkOut || '—') + '\n'
        + 'Hóspedes: '  + (data.pessoas || '—')  + '\n'
        + 'Mensagem: '  + (data.mensagem || '—') + '\n'
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
