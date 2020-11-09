const express = require("express");
const app = express();
const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


/* CONEXIÓN CON LA BASE DE DATOS */
let db;
MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  if (err !== null) {
    console.log(err);
  } else {
    db = client.db("series");
  }
});


/* TODAS LAS SERIES DE LA COLECCION*/
app.get("/api/series", function (req, res) {
  db.collection("series")
    .find()
    .toArray(function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});


/* DEVOLVER LA INFORMACIÓN DE UNA SERIE SOLICITADA */
app.get("/api/serie", function (req, res) {
  let tituloSolicitado = req.body.titulo

 
    db.collection("series")
        .find({ "titulo" : tituloSolicitado})
        .toArray(function (err, datos) {
        if(err!=null) {
            console.log(err);
            res.send(err);
        } else {
            console.log(datos);
            res.send(datos);
        }
    });
});


/* AÑADIR UNA SERIE A LA COLECCIÓN */
app.post("/api/nuevaSerie", function (req, res) {
  let serie = {
    titulo: req.body.titulo,
    plataforma: req.body.plataforma,
    puntuacion: req.body.puntuacion,
  };

  db.collection("series")
    .insertOne(serie, function (err, datos) {
    if (err !== null) {
      res.send(err);
    } else {
      db.collection("series")
        .find()
        .toArray(function (err, data) {
          if (err !== null) {
            res.send(err);
          } else {
            res.send(data);
          }
        });
    }
  });
});



app.listen(3000, function() {
  console.log('Escuchando puerto 3000');
})          
