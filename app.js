const express = require('express');
const mongoose = require('mongoose');

//importation des models
const Project = require('./models/project');
const Product = require('./models/product');

const app = express();

mongoose.connect('mongodb+srv://Elokil:Silbena87@cluster0.cmgmjbc.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser:true,
useUnifiedTopology: true}).then(()=>console.log('Connexion à MongoDB réussi !!')).catch(()=> console.log('Connexion à mongoDb échouée !!'));

app.use(express.json());

//midleware servant à gérer CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/project', (req, res, next) => {
  const project = new Project({
    ...req.body 
  });
  project.save().then(()=> res.status(201).json({message: 'projet bien ajouté' })).catch(error => res.status(400).json({ error }));
});

app.put('/api/project/:id', (req, res, next) => {
  Project.updateOne({ _id : req.params.id }, { ...req.body, _id:req.params.id }).then(()=> res.status(201).json({message: 'projet bien modifié' })).catch(error => res.status(400).json({ error }));
});

app.delete('/api/project/:id', (req, res, next) => {
  Project.deleteOne({ _id : req.params.id }).then(()=> res.status(201).json({message: 'projet bien supprimé' })).catch(error => res.status(400).json({ error }));
});

app.get('/api/project/:id', (req, res, next) => {
  Project.findOne({ _id: req.params.id }).then(project => res.status(200).json(project)).catch(error => res.status(404).json({error}));
});

app.get('/api/project', (req, res, next) => {
  Project.find().then(projects => res.status(200).json(projects)).catch(error => res.status(400).json({error}));
});


module.exports = app;