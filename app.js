//#region Introduction
// Author : Gaurav Sahitya
// Subject : Online Book Selling Portal
//#endregion

// Module declaractions

const Server = require('./config');
const LoadENV = require('@book-junction/env-loader');
const fs = require('fs');
const mongoClient = require('mongodb').MongoClient;

const Utilities = require('./utils/');

let bookPicRear, bookPicFront;

const $ENV = LoadENV(['.env.development']);
const PORT = $ENV.PORT ?? 3000;
const HOST = $ENV.HOST ?? 'localhost';

Server.init();
Server.configure();

//Setting up the endpoint

function isValidInpData(data) {
  let isValidData = false;
  let character = '';

  for (let i = 0; i < data.length; i++) {
    if (isNaN(data[i])) {
      character = data[i];

      if (character.toLowerCase().charCodeAt(0) >= 97 && character.toLowerCase().charCodeAt(0) <= 122) {
        isValidData = true;
      } else if (character == '+' || character == '#' || character == '.' || character == '|' || character == ' ') {
        isValidData = true;
      } else {
        isValidData = false;
        break;
      }
    } else if (!isNaN(data[i])) {
      isValidData = true;
    } else {
      isValidData = false;
      break;
    }
  }

  return isValidData;
}

Server.$App.get('/', (req, res) => {
  let queryString = req.query;

  if (queryString.request != 'cp') res.render('login');
  else res.render('cp');
});

// Endpoint for adding the book details

Server.$App.post('/', async (req, res) => {
  let ref;
  try {
    // Putting the received form's data into an array called 'data'.

    let data = [
      req.body.bookName,
      req.body.bookAuthor,
      req.body.pubYear,
      req.body.pubName,
      req.body.edition,
      req.body.price,
      req.body.category,
      req.body.phone,
    ];
    let isValid = false;

    //Validating the received data...

    for (let i = 0; i < data.length; i++) {
      if (isValidInpData(data[i])) {
        isValid = true;
      } else {
        isValid = false;
        break;
      }
    }

    if (isValid && req.body.phone.length >= 10 && req.body.phone.length <= 13) {
      // Connecting with the MongoDB database...
      ref = await Utilities.$DB.connect($ENV.DATABASE_URI);
      const payload = {
        ...req.body,
        bookPic: { front: bookPicFront.name, rear: bookPicRear.name },
      };
      const response = await Utilities.$DB.insert(ref, payload);

      if (response) {
        return res.status(200).send('ok');
      } else {
        return res.status(503).send('Something went wrong while adding a book, please try again after sometime..');
      }
    } else {
      res.send('Invalid data');
    }
  } catch (error) {
    res.send(error.message);
  } finally {
    ref?.close();
  }
});

Server.$App.post('/delete', (req, res) => {
  if (isValidInpData(req.body.booktoDelete)) {
    mongoClient.connect($ENV.DATABASE_URI, (err, db) => {
      if (err) {
        console.log(err);
        res.send('error');
      } else {
        const database = db.db($ENV.DATABASE_NAME);
        const books = database.collection('books');
        let counter = 0;

        books
          .find({ bookName: { $regex: req.body.booktoDelete, $options: 'i' } })
          .toArray()
          .then((ans) => {
            if (Object.entries(ans).length > 0) {
              books.deleteMany({ bookName: { $regex: ans[counter].bookName, $options: 'i' } }, (err, result) => {
                if (err) {
                  console.log(err);
                  res.send('error');
                } else {
                  if (fs.existsSync('./uploads/' + ans[counter].bookPic.front)) {
                    fs.rmSync('./uploads/' + ans[counter].bookPic.front + '/' + ans[counter].bookPic.front);
                    fs.rmSync('./uploads/' + ans[counter].bookPic.front + '/' + ans[counter].bookPic.rear);
                    res.send('deleted');
                    ++counter;
                  } else {
                    fs.rmSync('./uploads/' + ans[counter].bookPic.rear + '/' + ans[counter].bookPic.front);
                    fs.rmSync('./uploads/' + ans[counter].bookPic.rear + '/' + ans[counter].bookPic.rear);
                    res.send('deleted');
                    ++counter;
                  }

                  db.close();
                }
              });
            } else {
              res.send("book doesn't exists");
              db.close();
            }
          })
          .catch((err) => {
            console.log(err);
            res.send('error');
            db.close();
          });
      }
    });
  } else {
    res.send('invalid data');
  }
});

Server.$App.get('/updates', (req, res) => {
  let queryString = req.body.username;

  if (queryString == null || queryString == undefined) {
    res.render('update');
  }
});

Server.$App.post('/updates', async (req, res) => {
  let username = req.body.username;
  let bookObj = [],
    ref = null,
    books = {};
  try {
    ref = await Utilities.$DB.connect($ENV.DATABASE_URI);
    const ans = await Utilities.$DB.find(ref, { addedBy: username });
    if (Object.entries(ans).length > 0) {
      for (let i = 0; i < Object.entries(ans).length; i++) {
        books.bookName = ans[i].bookName;
        books.bookAuthor = ans[i].bookAuthor;
        books.pubName = ans[i].pubName;
        books.pubYear = ans[i].pubYear;
        books.addedOn = ans[i].addedOn;
        books.price = ans[i].price;
        books.category = ans[i].category;
        books.edition = ans[i].edition;

        if (fs.existsSync('static/uploads/' + ans[i].bookPic.rear)) {
          books.bookPicFront = 'static/uploads/' + ans[i].bookPic.rear + '/' + ans[i].bookPic.rear;
          books.bookPicRear = 'static/uploads/' + ans[i].bookPic.rear + '/' + ans[i].bookPic.front;
        } else {
          books.bookPicFront = 'static/uploads/' + ans[i].bookPic.front + '/' + ans[i].bookPic.rear;
          books.bookPicRear = 'static/uploads/' + ans[i].bookPic.front + '/' + ans[i].bookPic.front;
        }

        bookObj.push(books);
        books = {};
      }

      res.send(bookObj);
    } else {
      return res.send('Not found!');
    }
  } catch (error) {
    return res.send(error.message);
  } finally {
    ref?.close();
  }
});

Server.$App.get('/view', (req, res) => {
  res.render('view');
});

Server.$App.post('/check', (req, res) => {
  mongoClient.connect($ENV.DATABASE_URI, (err, db) => {
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      const database = db.db($ENV.DATABASE_NAME);
      const collection = database.collection('users');

      collection
        .find({ username: req.body.username })
        .toArray()
        .then((ans) => {
          if (Object.entries(ans).length > 0) {
            if (ans[0].isLoggedIn == true) {
              res.send('true');
            } else {
              res.send('false');
            }

            db.close();
          } else {
            db.close();
            console.log('false');
            res.send('false');
          }
        })
        .catch((err) => {
          console.log(err);
          res.send('error');
        });
    }
  });
});

Server.$App.post('/logout', async (req, res) => {
  const { username } = req.body;
  const dbUrl = `${$ENV.DATABASE_URI}${$ENV.DATABASE_NAME}`;
  const ref = await Utilities.$DB.connect(dbUrl);
  const updatedDoc = await Utilities.$DB.findAndUpdate(ref, 'users', { username }, { $set: { isLoggedIn: false } });

  if (updatedDoc && !updatedDoc.isLoggedIn) {
    return res.status(200).json({
      message: 'Logout successfull',
      status: true,
      code: 200,
    });
  } else {
    return res.status(503).json({
      message: "We're unable to log you out, please try again",
      status: false,
      code: 503,
    });
  }
});

Server.$App.post('/login', async (req, res) => {
  if (isValidInpData(req.body.username)) {
    const dbUrl = `${$ENV.DATABASE_URI}${$ENV.DATABASE_NAME}`;
    const ref = await Utilities.$DB.connect(dbUrl);
    const document = await Utilities.$DB.findOne(ref, 'users', {
      $and: [{ username: req.body.username }, { password: req.body.password }],
    });

    if (document) {
      const { matchedCount } = await Utilities.$DB.update(
        ref,
        'users',
        { _id: document._id },
        { $set: { isLoggedIn: true } }
      );

      if (matchedCount === 1) {
        return res.status(200).json({
          message: 'Login Successfull',
          status: true,
          code: 200,
        });
      } else {
        return res.status(503).json({
          message: "We're unable to log you in right now, please try again...",
          status: false,
          code: 503,
        });
      }
    } else {
      return res.status(401).json({
        message: 'Invalid credentials',
        status: false,
        code: 401,
      });
    }
  } else {
    return res.status(422).json({
      message: 'Invalid payload',
      status: false,
      code: 422,
    });
  }
});

Server.$App.get('/uploads', (req, res) => {
  res.render(req.url);
});

// Endpoint for handling the uploaded images

Server.$App.post('/upload', (req, res) => {
  // Checking whether the file has arrived or not...

  if (req.files) {
    bookPicRear = req.files.bookPicRear;
    bookPicFront = req.files.bookPicFront;

    console.log(bookPicFront);
    if (!fs.existsSync('uploads/' + bookPicFront.name)) {
      // fs.mkdirSync('uploads/' + bookPicFront.name);

      // Moving the received images into server's directory...

      bookPicFront.mv('/uploads/' + bookPicFront.name);
      bookPicRear.mv('/uploads/' + bookPicFront.name);
      res.send('ok');
    } else {
      res.send('file exists');
    }
  } else {
    console.log("file didn't received..");
    res.send('error');
  }
});

// Starting the server at port 3000

Server.$App.listen(PORT, HOST, () => {
  console.log(`Server started at port ${PORT} 🚀🚀🚀🚀`);
});
