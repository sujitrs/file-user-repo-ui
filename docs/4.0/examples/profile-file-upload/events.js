if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('poiFile').addEventListener('change', processFile, false);
    document.getElementById('poaFile').addEventListener('change', processFile, false);
  
    document.getElementById('downloadPoiFile').addEventListener('click', function(){downloadFile('poiFile')}, false);
    document.getElementById('downloadPoaFile').addEventListener('click', function(){downloadFile('poaFile')}, false);
  
    document.getElementById('deletePoiFile').addEventListener('click', function(){deleteFile('poiFile')}, false);
    document.getElementById('deletePoaFile').addEventListener('click', function(){deleteFile('poaFile')}, false);
    document.getElementById('save').addEventListener('click', saveme, false);
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }
  

  function saveme(){
    alert("hi");
    var id=document.getElementById("id").value;
    var poaFileId=document.getElementById("poaFile").dataset.refid;
    var poiFileId=document.getElementById("poiFile").dataset.refid;
    
    fetch('http://localhost:9000/updateUser/'+id, {
            method: 'PATCH',
            body: JSON.stringify({
              poiFileID: poiFileId,// Had to add 1 to get actual index
              poaFileID:poaFileId
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => alert(json));
   // };
  }
  
  function downloadFile(file){
    var fileField=document.getElementById(file).dataset.refid;
    fetch('http://localhost:8000/getFile/'+fileField)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      var blob = b64toBlob(myJson.fileContent,myJson.fileType);
      let objectURL = window.URL.createObjectURL(blob);
      let anchor = document.createElement('a');
      anchor.href = objectURL;
      anchor.download = name;
      anchor.click();
      URL.revokeObjectURL(objectURL);
    });
  }
  
  function deleteFile(file){
    var fileField=document.getElementById(file).dataset.refid;
    fetch('http://localhost:8000/removeFile/'+fileField,{method: 'PATCH'}).then(function(response) {
      return response.json();
    }).then(function(myJson) {alert(myJson)});
    
  }
  //image/jpeg;base64,
  function processFile(){
    var f = this.files[0]; // FileList object
    var att=this.id;
    var reader = new FileReader();
  
    // Closure to capture the file information.
  
    reader.onload = (function(theFile,myFile) {
    return function(e) {
    var base64Data = e.target.result;
    //console.log(base64Data);
    var metaDataIndex=base64Data.indexOf(",");
    document.getElementById(myFile).dataset.base=base64Data;
    fetch('http://localhost:8000/addFile', {
            method: 'POST',
            body: JSON.stringify({
              fileContent: base64Data.substring(metaDataIndex+1),// Had to add 1 to get actual index
              fileType:f.type
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(json => document.getElementById(myFile).dataset.refid=json);
    };
  
    })(f,att);
    reader.readAsDataURL(f);
  }
  
  
    
     
           function b64toBlob(b64Data, contentType, sliceSize) {
              contentType = contentType || '';
              sliceSize = sliceSize || 512;
  
              var byteCharacters = atob(b64Data);
              var byteArrays = [];
  
              for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);
  
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                  byteNumbers[i] = slice.charCodeAt(i);
                }
  
                var byteArray = new Uint8Array(byteNumbers);
  
                byteArrays.push(byteArray);
              }
                
              var blob = new Blob(byteArrays, {type: contentType});
              return blob;
            }