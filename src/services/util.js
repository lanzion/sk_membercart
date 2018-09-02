// 判断数据是否为空

const Toast = function (data) {  
  if (data){
    try{
      var imgObj = JSON.parse(data)[0];
      if (imgObj.FilePath.indexOf('http') !=-1){
        return imgObj.FilePath;
      }else{
        return imgObj.ServerUrl + imgObj.FilePath
      }
     
    } catch (error) {
    }
  }
}

export default Toast
