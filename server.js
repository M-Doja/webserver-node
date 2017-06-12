const express = require('express'),
      hbs = require('hbs'),
      port = process.env.PORT || 3000,
      fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// CREATE LOGGER
app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
   next();
});

// MIDDLEWARE
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    welcomeMsg: 'Welcome to the home page',
    title: 'Home Page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page',
    text: 'Some text here'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    projectMsg: 'Take a look at my projects',
    title: 'Project page'
  })
})
app.get('/bad', (req, res) => {
  res.send({
    error: 'Error! 404 Bad request!'
  });
});


app.listen(port, () => {
  console.log("App listening on port "+port);
});
