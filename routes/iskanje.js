const express = require('express');
const router = express.Router();
const app = express();

const Post = require('../models/Pesem');
//GETS ALL POSTS
router.get('/', async (req,res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err})
    }
})

//ISKANJE 2
router.get('/:word/', searchWord);

async function searchWord(request, response) {
  try {
  var searchText = request.params.word;
  const posts = await Post.find();
  let pesmi = posts;
  let zadetki = pesmi.filter(pesem => {
    return pesem.naslov.toLowerCase().includes(searchText) || pesem.besedilo.toString().toLowerCase().includes(searchText) || pesem.st_diapozitiva.toString().includes(searchText) || pesem.avtor.toLowerCase().includes(searchText);
  });
  response.json(zadetki);
  }catch(error){
    console.log(error);
  }}



// //TESTNO - get all 
 router.get('/imena', async (req,res) => {
     try {
         const posts = await Post.find({},{naslov: 1, _id:0});
         res.json(posts)
     }catch(error){
         res.json({message: error})
     }
 })
 
 module.exports = router
