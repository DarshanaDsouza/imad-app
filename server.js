//alert('in javascript');

  var button = document.getElementById('counter');
  var counter=0;
  button.onclick = function(){
    counter = counter + 1;
    //alert(counter.toString());
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
  };
  
  

var submit = document.getElementById('submit-btn');
submit.onclick = function(){
   
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for (var i = 0; i < names.length; i++){
                    list += '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML=list;
            }
        }
    };
    var commentInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET','http://darshanadsouzaj.imad.hasura-app.io/submit-comm?name=' + name, true);
    request.send(null);
};