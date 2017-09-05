var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'darshanadsouzaj',
    database: 'darshanadsouzaj',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
}

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

/*var articles ={
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
                       This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 
                  </p>
                  <p>
                      This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 This is content one for article 3 
                  </p>
                `  
    }
};

*/

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
              ${date.toDateString()}
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
    <script type="text/javascript" src="/ui/mymain.js">
        </script>
  </body>
</html>
`;
return htmlTemplate
}
    
function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input', function(req, res){
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
})

app.post('/create-user', function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.RandomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT into "user" (username,password) VALUES ($1,$2)', [username, dbString], function (err, result){
       if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send('User successfully created' + username);
        }  
    });
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    pool.query('SELECT * from article', function (err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    });
});

var counter=0;
app.get('/counter', function (req ,res) {
    counter = counter + 1;
    res.send(counter.toString());
    
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/mymain.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'mymain.js'));
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



app.get('/articles/:articleName', function (req, res) {
    pool.query("SELECT * from article where title = $1 ", [req.params.articleName], function (err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0) {
                res.status(404).send("Article not found own");
            } else {
                var articleData = result.rows[0];
                res.send(CreatehtmlTemplate(articleData));
            }
        }
    });
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