//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Implantacion = require('../../models/Implantacion');

router.get('/', function(req, res){
  res.render('index')
});

router.get('/', function(req, res){
  res.render('index')
});
router.route('/insert')
.post(function(req,res) {
 var implantacion = new Implantacion();
  implantacion.description = req.body.desc;
  implantacion.status = req.body.status;
  implantacion.month = req.body.month;
  implantacion.year = req.body.year;
implantacion.save(function(err) {
      if (err)
        res.send(err);
      res.send('Implantacion successfully added!');
  });
})
router.route('/update')
.post(function(req, res) {
 const doc = {
     description: req.body.description,
     status: req.body.status,
     month: req.body.month,
     year: req.body.year
 };
 console.log(doc);
  Implantacion.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Implantacion successfully updated!');
  });
});
router.get('/delete', function(req, res){
 var id = req.query.id;
 Implantacion.find({_id: id}).remove().exec(function(err, implantacion) {
  if(err)
   res.send(err)
  res.send('Implantacion successfully deleted!');
 })
});
router.get('/getAll',function(req, res) {
 var monthRec = req.query.month;
 var yearRec = req.query.year;
 if(monthRec && monthRec != 'All'){
  Implantacion.find({$and: [ {month: monthRec}, {year: yearRec}]}, function(err, implantaciones) {
   if (err)
    res.send(err);
   res.json(implantaciones);
  });
 } else {
  Implantacion.find({year: yearRec}, function(err, implantaciones) {
   if (err)
    res.send(err);
   res.json(implantaciones);
  });
 }
});

module.exports = router;