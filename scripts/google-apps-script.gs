// Casa de Nabais — Lead Capture
// Google Apps Script Web App
//
// SETUP:
// 1. Abre script.google.com → New project
// 2. Cola este código (substitui o código existente)
// 3. Edita SHEET_NAME e EMAIL_NOTIFICACAO abaixo
// 4. Deploy > New deployment > Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copia o URL e adiciona no Vercel como NEXT_PUBLIC_APPS_SCRIPT_URL

var SHEET_NAME = 'Leads';
var EMAIL_NOTIFICACAO = 'SEU_EMAIL@gmail.com'; // email que recebe notificação quando chega um lead

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Cria a folha "Leads" com cabeçalhos se não existir
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Data',
        'Nome',
        'Email',
        'Telefone',
        'Check In',
        'Check Out',
        'Hóspedes',
        'Mensagem'
      ]);
      // Formata cabeçalhos
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    var agora = new Date();
    var dataFormatada = Utilities.formatDate(agora, 'Europe/Lisbon', 'dd/MM/yyyy HH:mm');

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

    // Envia email de notificação
    if (EMAIL_NOTIFICACAO && data.email) {
      var assunto = '🏡 Novo pedido de reserva — Casa de Nabais';
      var corpo = 'Novo pedido recebido em ' + dataFormatada + '\n\n'
        + 'Nome: ' + (data.nome || '—') + '\n'
        + 'Email: ' + (data.email || '—') + '\n'
        + 'Telefone: ' + (data.telefone || '—') + '\n'
        + 'Check In: ' + (data.checkIn || '—') + '\n'
        + 'Check Out: ' + (data.checkOut || '—') + '\n'
        + 'Hóspedes: ' + (data.pessoas || '—') + '\n'
        + 'Mensagem: ' + (data.mensagem || '—') + '\n';

      MailApp.sendEmail(EMAIL_NOTIFICACAO, assunto, corpo);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Necessário para que o browser aceite a resposta (CORS preflight)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
