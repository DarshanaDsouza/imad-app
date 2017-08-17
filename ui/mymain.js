
//alert("new javascript");
var submitcomm = document.getElementById('submitcomm');
submitcomm.onclick = function(){
   
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var comments = request.responseText;
                comments = JSON.parse(comments);
                var list = '';
                for (var i = 0; i < comments.length; i++){
                    list += '<li>' + comments[i] + '</li>';
                }
                var ul = document.getElementById('commlist');
                ul.innerHTML=list;
            }
        }
    };
    var commentInput = document.getElementById('comment');
    var comment = commentInput.value;
    request.open('GET','http://darshanadsouzaj.imad.hasura-app.io/submit-comm?comment=' + comment, true);
    request.send(null);
};
