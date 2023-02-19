function doPost(e) {
  var all =e.parameter;
  var base64Str =all.base64Str;
  var fileName=all.fileName;
  var mail=all.mail;
  var referer=all.referer;
  var id;
  var url;
  if(referer.includes("sc1314520.github.io")){
    try{
        id = create(fileName,base64Str);
        url= getFileUrl(id);
        sendInfo(mail,url);
    }catch(e){
        return ContentService.createTextOutput('failed upload with mail address')
        .setMimeType(ContentService.MimeType.JSON);
    } 
        return ContentService.createTextOutput(url)
          .setMimeType(ContentService.MimeType.JSON);
    }
  else{
    return ContentService.createTextOutput('failed upload with referer')
        .setMimeType(ContentService.MimeType.JSON);
  }
  
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
var src = getSrc(url);
MailApp.sendEmail(mail,'[通知]上傳圖片成功！','您的圖片原始檔：'+url+"，您的圖片轉換連結："+src,{noReply:true});
}
function getSrc(url){
if(url.split("/")[5]!=undefined){   
      url="https://drive.google.com/uc?id="+url.split("/")[5]
}
return url;
}