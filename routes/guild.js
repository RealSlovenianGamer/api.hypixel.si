const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


let cache = [];
//Funkcija za API data
async function shrani(ime, data) {
    //const data = await fetch('https://api.hypixel.net/guild?key=c5b34550-a69b-4ed1-a220-b155bdfa3718&name=Hypixel%20Slovenija');
    cache[ime] = data;
    console.log('Shranil podatke za', ime);
}

router.get('/id/:id/', isciID);
router.get('/ime/:ime/', isciIme);

//GETS ALL POSTS
router.get('/', async (req,res) => {
    try {
        fetch('https://api.hypixel.net/guild?key=c5b34550-a69b-4ed1-a220-b155bdfa3718&id=5ff980828ea8c9e004b008e2')
        .then(response => response.json())
        .then(data => {
            res.json(data);
            shrani('Hypixel Slovenija', data);
        });
    }catch(err){
        res.json({message: err})
    }
})

//Iskanje guilda po imenu
async function isciIme(request, response) {
    try {
    var ime = request.params.ime;
    //naredi check če je bilo isto ime pravkar iskano
    //če ja potem s prej shranjenih podatkov iz cache uporabi stare podatke
    fetch('https://api.hypixel.net/guild?key=c5b34550-a69b-4ed1-a220-b155bdfa3718&name=' + ime)
          .then(response => response.json())
          .then(data => {
            if(!data.success) {
                if (ime == oldime){
                    response.json(cache[ime]);
                }
              } else {
                    oldime = ime;
                    shrani(ime, data);
                    response.json(data);
            }
          });
    } catch(error){
      console.log(error);
    }}

//Iskanje guilda po ID-ju
async function isciID(request, response) {
  try {
  var id = request.params.id;
  fetch('https://api.hypixel.net/guild?key=c5b34550-a69b-4ed1-a220-b155bdfa3718&id=' + id)
        .then(response => response.json())
        .then(data => {
            response.json(data);
        });
  } catch(error){
    console.log(error);
  }}

/*
//SPECIFIC POST json oblika
router.get('/:postId', async (req,res) => {
    try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }catch(err){
        res.status(400).json({ message: err})
    }
} )



*/


module.exports = router
