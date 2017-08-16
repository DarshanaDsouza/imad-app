//alert('in javascript');

  var button = document.getElementById('counter');
  var counter=0;
  button.onclick = function(){
    counter = counter + 1;
    //alert(counter.toString());
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
  };
  
  
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit-btn');
submit.onclick=function(){
    
    var names=['name1', 'name2', 'name3'];
    var list ='';
    for (var i = 0; i < names.length; i++){
        list += '<li>' +names[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    u1.innerHtml=list
}