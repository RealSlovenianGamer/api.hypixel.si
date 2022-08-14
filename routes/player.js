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

let cachedIgralci = [];
let cache = [];
let UUIDcache = [];

function shrani(ime, data) {
  cachedIgralci.push(ime);
  cache[ime] = data;
  console.log('dodal', ime, 'v cache');
}
function UUIDshrani(uuid, data){
  cachedIgralci.push(uuid);
  UUIDcache[uuid] = data;
  console.log('dodal', uuid, 'v cache');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function isciIme(request, response) {
    try {
    var ime = request.params.ime;
    //naredi check če je bilo isto ime pravkar iskano
    //če ja potem s prej shranjenih podatkov iz cache uporabi stare podatke
    await sleep(300);
    fetch('https://api.hypixel.net/player?key=c5b34550-a69b-4ed1-a220-b155bdfa3718&name=' + ime)
          .then(response => response.json())
          .then(data => {
              console.log('GET Request za', ime);
              if(!data.success) {
                if(cachedIgralci.includes(ime)){
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
  await sleep(3000);
  fetch('https://api.hypixel.net/player?key=c5b34550-a69b-4ed1-a220-b155bdfa3718&uuid=' + uuid)
        .then(response => response.json())
        .then(data => {
          console.log('GET Request za', uuid);
          if(!data.success) {
            if(cachedIgralci.includes(uuid)){
              response.json(UUIDcache[uuid]);
            } else {
              response.json(data)
            }
          } else {
          UUIDshrani(uuid, data);
          response.json(data);
        }
      });
  } catch(error){
    console.log(error);
  }}

// router.get('/uuid', async (req,res) => {
//   res.json(UUIDcache)
// })
// router.get('/ime', async (req,res) => {
//   res.json(cache)
// })  
module.exports = router