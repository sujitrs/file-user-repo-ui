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
         for( var i = 0; i < data.length; i++ )
        { console.log(data[i]);
                var o = data[i];
               var tr = document.createElement("tr");
               var td1 = document.createElement("td");
               var td2 = document.createElement("td");
               var td3 = document.createElement("td");
               var td4 = document.createElement("td");
               td1.appendChild(document.createTextNode(o.id));
               //tr.appendChild(td);
               td2.appendChild(document.createTextNode(o.name));
             //  tr.appendChild(td);
               td3.appendChild(document.createTextNode(o.poaFileID));
              // tr.appendChild(td);
               td4.appendChild(document.createTextNode(o.poiFileID));
               tr.appendChild(td1);
                tr.appendChild(td2);
                  tr.appendChild(td3);
                    tr.appendChild(td4);
                
               table.appendChild(tr);
               
               
        }
                
    });
  }
  
  
    
  