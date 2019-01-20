const express = require('express');
      bodyParser = require('body-parser');
      methodOverride = require('method-override');
      mongoose = require('mongoose');
      port = process.env.PORT || 3020;
      app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine','ejs');



// mongoose connection
mongoose.connect('mongodb://abdullah:abdullah123@ds121999.mlab.com:21999/devconnect',{ useNewUrlParser: true },(err) => {
    if (err) throw err;
    else console.log(`DB Connected succesfully`);
})
//mongodb://abdullah:abdullah123@ds155864.mlab.com:55864/crud


//mongooseSchema

var dataSchema= new mongoose.Schema({
    name: String,
    age: Number
});

var data = mongoose.model('data',dataSchema);

app.get('/',(req,res)=>{
    data.find({},(err, allData) => {
        if(err) throw err;
        else res.render('index',{ allData })
        
    })
})

app.post('/add',(req, res) => {
    data.create(req.body, (err, formData) => {
        if (err) throw err;
        else res.redirect('/');
    })
});

app.get('/update/:id', (req,res) => {
    data.findById(req.params.id, (err, data) => {
        if (err) throw err;
        else res.render('update',{ d:data});
    })
})

app.put('/update/:id', (req,res) => {
    let formData = req.body;
    data.updateOne({_id: req.params.id},{name: formData.name, age: formData.age}, err => {
        if (err) throw err;
        else res.redirect('/')
    })
})

app.delete('/delete/:id', (req, res) => {
    data.findByIdAndRemove(req.params.id, err => {
        if (err) throw err
        else res.redirect('/')
    })
})

app.listen(port,(err) => {
    if (err) throw err;
    else console.log(`App is running on port-${port}`);
})