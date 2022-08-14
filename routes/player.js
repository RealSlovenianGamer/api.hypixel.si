const express = require('express');
const router = express.Router();
const app = express();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get('/', async (req,res) => {
    res.send('dela')
})

//ISKANJE PO IMENU
router.get('/uuid/:uuid/', isciUuid);
router.get('/ime/:ime/', isciIme);

let cache = [];
function shrani(ime, data) {
  oldime = ime;
  cache[ime] = data;
  console.log('shranil podatke');
}

async function isciIme(request, response) {
    try {
    var ime = request.params.ime;
    //naredi check če je bilo isto ime pravkar iskano
    //če ja potem s prej shranjenih podatkov iz cache uporabi stare podatke
    fetch('https://api.hypixel.net/player?key=c5b34550-a69b-4ed1-a220-b155bdfa3718&name=' + ime)
          .then(response => response.json())
          .then(data => {
              if(!data.success) {
                if(ime == oldime){
                  response.json(cache[ime]);
                } else {
                  response.json(data)
                }
              } else {
              shrani(ime, data);
              response.json(data);
            }
          });
    } catch(error){
      console.log(error);
    }}

async function isciUuid(request, response) {
  try {
  var uuid = request.params.uuid;
  fetch('https://api.hypixel.net/player?key=c5b34550-a69b-4ed1-a220-b155bdfa3718&uuid=' + uuid)
        .then(response => response.json())
        .then(data => {
            response.json(data);
        });
  } catch(error){
    console.log(error);
  }}

module.exports = router