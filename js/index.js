let mail;
window.onload=function(){
  mail =prompt("請輸入電子信箱：")
}
function previewFile() {
    var state=document.getElementById("state");
    state.innerHTML='<img src="" height="200" alt="Image preview" />';
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
  var state=document.getElementById("state");
  var res=document.getElementById("res");
  var btn=document.getElementById("btn");
  var fileName = document.querySelector('input[type=file]').files[0].name;
  var base64 = document.querySelector('img').src;
  state.innerHTML="資料上傳中..."
  var url='https://script.google.com/macros/s/AKfycbxjPht_lkb_CN7_hikjdQjZh0ru0hfX8xRINC7V8ZwTHvcWBYnHYlvXapHfpXAq76hCtg/exec'
  var formData =new FormData();
  formData.append('base64Str',base64);
  formData.append('fileName',fileName);
  formData.append('mail',mail);
  formData.append('referer',location.origin);
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
    if(!data.includes("failed upload")){
      console.log("成功")
      if(data.split("/")[5]!=undefined){   
        res.innerText="https://drive.google.com/uc?id="+data.split("/")[5]
      }
      state.innerHTML="<div class='result'><div class='msg'><img src='images/icons8-ok-500.png'></div><br/><div class='retext'>上傳成功，請查收郵件</div>";
    }
    else{
      state.innerHTML="<div class='result'><div class='msg'><img src='images/icons8-cancel-500.png'></div><br/><div class='retext'>上傳失敗，請重新上傳</div>";
    }
  })
  .catch(e=>{
    console.log(e)
    state.innerHTML="<div class='result'><div class='msg'><img src='images/icons8-cancel-500.png'></div><br/><div class='retext'>上傳失敗，請重新上傳</div>";
  })
}