function doPost(e) {
  var all =e.parameter;
  var base64Str =all.base64Str;
  var fileName=all.fileName;
  var mail=all.mail;
  var id = create(fileName,base64Str);
  var url=getFileUrl(id);
  sendInfo(mail,url);
  return ContentService.createTextOutput(url)
    .setMimeType(ContentService.MimeType.JSON);
}
function create(fileName,base64Str){
var mimeType=base64Str.split(";")[0].split(":")[1];
var base64=base64Str.split(",")[1];
var blob = Utilities.newBlob(Utilities.base64Decode(base64),mimeType, fileName);
var file = getFolder().createFile(blob);
return file.getId();
}
function getFileUrl(id){
var file = DriveApp.getFileById(id);
file.setSharing(DriveApp.Access.ANYONE,DriveApp.Permission.VIEW);
return file.getUrl();
}

function getFolder(){
var folders=DriveApp.getFoldersByName("upload");
while(folders.hasNext()){
  var folder=folders.next();
  return folder;
}
}
function sendInfo(mail,url){
try{
  MailApp.sendEmail(mail,'[通知]上傳圖片成功！','您的圖片連結：'+url,{noReply:true});
}catch(e){
  
}
}