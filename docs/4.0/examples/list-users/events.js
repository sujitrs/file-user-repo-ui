if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('show').addEventListener('click', processSave, false);
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }
  
  
  function processSave(){
    fetch('http://localhost:9000/getAllUsers/')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      var data =myJson; 
      console.log(data);


      


      var table = document.getElementById("tab");
      var tr = document.createElement("tr");
      var td1 = document.createElement("th");
      var td2 = document.createElement("th");
      var td3 = document.createElement("th");
      var td4 = document.createElement("th");
      var td5 = document.createElement("th");
      var td6 = document.createElement("th");
      
      td1.appendChild(document.createTextNode("ID"));
      td2.appendChild(document.createTextNode("Name"));
      td3.appendChild(document.createTextNode("POA File ID"));
      td4.appendChild(document.createTextNode("POI File ID"));
      td5.appendChild(document.createTextNode("Created at"));
      td6.appendChild(document.createTextNode("Modified at"));

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6); 
      table.appendChild(tr);
      
      tr = document.createElement("tr");
      td1 = document.createElement("td");
      td2 = document.createElement("td");
      td3 = document.createElement("td");
      td4 = document.createElement("td");
      td5 = document.createElement("td");
      td6 = document.createElement("td");
      var dateFormatter;         
      var o;
      var a = document.createElement('a');
      var linkText = document.createTextNode("File");
         for( var i = 0; i < data.length; i++ )
        { console.log(data[i]);
               o = data[i];
               td1.appendChild(document.createTextNode(o.id));
               td2.appendChild(document.createTextNode(o.name));
               
               a = document.createElement('a');
                if(o.poaFileID!==null){
                  linkText = document.createTextNode("File");
                  a.title = "File";
                  a.href = "http://localhost:8000/getFile/"+o.poaFileID;
                }else{
                  linkText = document.createTextNode("File not present");
                  a.title = "File not present";
                }
                a.appendChild(linkText);
                
               td3.appendChild(a);
               
               a = document.createElement('a');
                if(o.poaFileID!==null){
                  linkText = document.createTextNode("File");
                  a.title = "File";
                  a.href = "http://localhost:8000/getFile/"+o.poiFileID;
                }else{
                  linkText = document.createTextNode("File not present");
                  a.title = "File not present";
                }
                a.appendChild(linkText);

               td4.appendChild(a);

               dateFormatter=new Date(o.createdAt);
               td5.appendChild(document.createTextNode(dateFormatter));
               dateFormatter=new Date(o.updatedAt);
               td6.appendChild(document.createTextNode(dateFormatter));
               tr.appendChild(td1);
               tr.appendChild(td2);
               tr.appendChild(td3);
               tr.appendChild(td4);
               tr.appendChild(td5);
               tr.appendChild(td6); 
               table.appendChild(tr);
               tr = document.createElement("tr");
               td1 = document.createElement("td");
               td2 = document.createElement("td");
               td3 = document.createElement("td");
               td4 = document.createElement("td");
               td5 = document.createElement("td");
               td6 = document.createElement("td");
               
        }
                
    });
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
  
    
  