var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles ={
    Article1 : {
        title: 'Title Article 1 - dd',
        heading:'Heading Article 1',
        date:'22 Oct 2003',
        content:` <p>
                       This is content one for article 1 This is content one for article 1 This is content one for article 1 This is content one for article 1 This is content one for article 1 This is content one for article 1 This is content one for article 1 This is content one for article 1 This is content one for article 1
                  </p>
                  <p>
                      This is content one for article 1 This is content one for article 1 This is content one for article 1 This is content one for article 1 This is content one for article 1 This is content one for article 1 This is content one for article 1 This is content one for article 1 This is content one for article 1This is content one for article 1
                  </p>
                `  
        
    },
    Article2 :{
        title: 'Title Article 2 - dd',
        heading:'Heading Article 2',
        date:'23 Oct 2003',
        content:` <p>
                       This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 
                  </p>
                  <p>
                      This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 
                  </p>
                `  
    },
    Article3:{
        title: 'Title Article 2 - dd',
        heading:'Heading Article 2',
        date:'23 Oct 2003',
        content:` <p>
                       This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 
                  </p>
                  <p>
                      This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 This is content one for article 2 
                  </p>
                `  
    }
};

function CreatehtmlTemplate(data){
var title=data.title;
var heading=data.heading;
var date=data.date;
var content=data.content;


    var htmlTemplate=`
    <html>
  <head>
      <title>
           ${title}
      </title>
      <meta name='viewport' content='width-devive-width, initial-scale=1'/>
      <link href="/ui/style.css" rel="stylesheet" />
  </head>
  <body>
      <div class='container'>
          <div>
              <a href='/'> Home</a>
          </div>
          <hr/>
          <h3>
              ${heading}
          </h3>
          <div>
              ${date}
          </div>
      
          <div>
             ${content}
          </div>
          <hr/>
          <h3>
            Comments
          </h3>
          <div>
                <input type="text" id="comment"  placeholder="comment"></input>
                <input type="submit"  id ="submitcomm" value="submit" </input>
                <ul id = 'commlist'>
                    <l1>list1</l1>
                </ul> 
        </div>
    </div>
    <script type="text/javascript" src="/ui/main.js">
        </script>
  </body>
</html>
`;
return htmlTemplate
}
    



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter', function (req ,res) {
    counter = counter + 1;
    res.send(counter.toString());
    
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var names=[];
app.get('/submit-name', function (req, res) {
    var name = req.query.name;
    names.push(name);
    //JSON - Javascript object notification
    res.send(JSON.stringify(names));
});

var comments=[];
app.get('/submit-comm', function (req, res) {
    var comment = req.query.comment;
    comments.push(comment);
    //JSON - Javascript object notification
    res.send(JSON.stringify(comments));
});



app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
    res.send(CreatehtmlTemplate(articles[articleName]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});