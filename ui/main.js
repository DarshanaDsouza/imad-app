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
        var nameInput = document.getElementById('name');
        var name = nameInput.value;
        if (request.readystate === XMLHttpRequest.DONE){
            if (request.status === 200){
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for (var i = 0; i < names.length; i++){
                    list += '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML=list;
            };
        };
    };
    request.open('GET','http://darshanadsouzaj.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
};