// require express and other modules
const express = require('express');
const app = express();
// Express Body Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + '/public'));


/************
 * DATABASE *
 ************/

const db = require('./models');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', (req, res) => {
  // FIXME: Document all your api endpoints below as a simple hardcoded JSON object.
  res.json({
    message: 'Welcome to my app api!',
    documentationUrl: '', //leave this also blank for the first exercise
    baseUrl: '', //leave this blank for the first exercise
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes all available endpoints'},
      {method: 'GET', path: '/api/profile', description: 'Data about me'},
      {method: 'GET', path: '/api/books/', description: 'Get All books information'},
      // FIXME: Write other API end-points description here like above
      {method: 'POST', path: '/api/books', description: 'Add a book information into database'},
      {method: 'PUT', path: '/api/books/:id', description: 'Update a book information based upon the specified ID'},
      {method: 'DELETE', path: '/api/books/:id', description: 'Delete a book based upon the specified ID'}
    ]
  })
});
// FIXME:  Fill the values
app.get('/api/profile', (req, res) => {
  res.json({
    'name': 'Geralt of Rivia',
    'homeCountry': 'Westeros',
    'degreeProgram': 'DEA',//informatics or CSE.. etc
    'email': 'geralt@westeros.com',
    'deployedURLLink': '',//leave this blank for the first exercise
    'apiDocumentationURL': '', //leave this also blank for the first exercise
    'currentCity': 'Rivia',
    'hobbies': ['fighting_monsters', 'rewards']

  })
});
/*
 * Get All books information
 */
app.get('/api/books/', (req, res) => {
  /*
   * use the books model and query to mongo database to get all objects
   */
  db.books.find({}, function (err, books) {
    if (err) throw err;
    /*
     * return the object as array of json values
     */
    res.json(books);
  });
});
/*
 * Add a book information into database
 */
app.post('/api/books/', (req, res) => {

  /*
   * New Book information in req.body
   */
  // console.log(req.body);
  /*
   * FIXME: use the books model and create a new object
   * with the information in req.body
   */
  /*
   * return the new book information object as json
   */
  var newBook = req.body; // FIXME: ; needs to check later

  db.books.create(newBook, function (err, newBook) {
    if (err) throw err;

    res.json(newBook);
  })
  
});

/*
 * Update a book information based upon the specified ID
 */
app.put('/api/books/:id', (req, res) => {
  /*
   * Get the book ID and new information of book from the request parameters
   */
  const bookId = req.params.id;
  const bookNewData = req.body;
  // console.log(`book ID = ${bookId} \n Book Data = ${bookNewData}`);

  /*
   * TODO: use the books model and find using the bookId and update the book information
   */
  /*
   * FIXME: Send the updated book information as a JSON object
   */
  // var updatedBookInfo = bookNewData;

  db.books.findByIdAndUpdate(bookId, bookNewData, {new:true}, function update(err, updatedBookInfo) {
    if (err) throw err;
    res.json(updatedBookInfo);
  })
  
});
/*
 * Delete a book based upon the specified ID
 */
app.delete('/api/books/:id', (req, res) => {
  /*
   * Get the book ID of book from the request parameters
   */
  const bookId = req.params.id;
  /*
   * FIXME: use the books model and find using
   * the bookId and delete the book
   */
  /*
   * Send the deleted book information as a JSON object
   */
  // var deletedBook = {};
  db.books.findByIdAndDelete(bookId, (err, deletedBook) => {
    if (err) throw err;
    res.json(deletedBook);
  })
  
});


app.get('/api/exercise2', (req, res) => {
  res.json({
    'message': 'group 21 application deployed using docker'
  })
});


/**********
 * SERVER *
 **********/

// listen on the port 3000
app.listen(process.env.PORT || 80, () => {
  console.log('Express server is up and running on http://localhost:80/');
});
