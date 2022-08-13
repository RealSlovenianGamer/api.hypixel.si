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

async function isciIme(request, response) {
    try {
    var ime = request.params.ime;
    //naredi check če je bilo isto ime pravkar iskano
    //če ja potem s funkcijo shranjevanja in pobiranja podatkov uporabi stare podatke
    //oldime = ime
    fetch('https://api.hypixel.net/player?key=c5b34550-a69b-4ed1-a220-b155bdfa3718&name=' + ime)
          .then(response => response.json())
          .then(data => {
              response.json(data);
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