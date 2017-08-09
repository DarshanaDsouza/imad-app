var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var article1 = {
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
    </div>
  </body>
</html>
`;
return htmpTemplate
}
    



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/Article1', function (req, res) {
  res.send(CreatehtmlTemplate(article1));
});

app.get('/Article2', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Article2.html'));
});

app.get('/Article3', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Article3.html'));
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
