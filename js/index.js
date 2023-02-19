var mail;
var referer=document.referrer;
window.onload=function(){
  mail =prompt("請輸入電子信箱：")
  console.log(referer);
}
function previewFile() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];

    var reader = new FileReader();
  
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.addEventListener("load", () => {
      // convert image file to base64 string
      preview.src = reader.result;
    }, false);
  
}
function upload(){
  alert("開始執行上傳...")
  var result=document.getElementById("result");
  var res=document.getElementById("res");
  var btn=document.getElementById("btn");
  var fileName = document.querySelector('input[type=file]').files[0].name;
  var base64 = document.querySelector('img').src;
  var url='https://script.google.com/macros/s/AKfycbxjPht_lkb_CN7_hikjdQjZh0ru0hfX8xRINC7V8ZwTHvcWBYnHYlvXapHfpXAq76hCtg/exec'
  var formData =new FormData();
  formData.append('base64Str',base64);
  formData.append('fileName',fileName);
  formData.append('mail',mail);
  formData.append('referer',referer);
  var config={
    method:'POST',
    body:formData,
    redirct:'follow'
  }
  fetch(url,config)
  .then(res=>{
    return res.text();
  })
  .then(function(data){
    console.log(data)
    if(!data.includes("'failed upload'")){
      if(data.split("/")[5]!=undefined){   
        res.innerText="https://drive.google.com/uc?id="+data.split("/")[5]
      }
      result.style.display='block';
      btn.style.display='none';
      alert("上傳成功");
    }
    else{
      alert("上傳失敗，請重新上傳")
    }
  })
  .catch(e=>{
    alert("上傳失敗，請重新上傳");
  })
}