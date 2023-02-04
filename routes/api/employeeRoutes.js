app.get('/api/employee', (req, res) => {
   //start updating here
  db.query("SELECT * FROM movie_db.movies;", function (err, results) {
    console.log(results)
    res.json(results);
  })
});

app.post('/api/add-employee', (req, res) => {
   //start updating here
  let insert = "INSERT INTO movies (movie_name) VALUES ('Get Out')";
  db.query(insert, function (err, results) {
    console.log("1 movie added")
    res.json(results);
  })
});

app.put('/api/update-employee', (req, res) => {
  //start updating here
  let insert = "INSERT INTO movies (movie_name) VALUES ('Get Out')";
  db.query(insert, function (err, results) {
    console.log("1 movie added")
    res.json(results);
  })
});