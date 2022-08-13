const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//Funkcija za API data
async function shraniPodatki(data) {
    //const data = await fetch('https://api.hypixel.net/guild?key=c5b34550-a69b-4ed1-a220-b155bdfa3718&name=Hypixel%20Slovenija');
    //console.log(data)
    console.log('Shranil podatke');
}

//GETS ALL POSTS
router.get('/', async (req,res) => {
    try {
        fetch('https://api.hypixel.net/guild?key=c5b34550-a69b-4ed1-a220-b155bdfa3718&id=5ff980828ea8c9e004b008e2')
        .then(response => response.json())
        .then(data => {
            res.json(data);
            shraniPodatki(data);
        });
    }catch(err){
        res.json({message: err})
    }
})

//SPECIFIC POST json oblika
router.get('/:postId', async (req,res) => {
    try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }catch(err){
        res.status(400).json({ message: err})
    }
} )

//SPECIFIC POST prikaz podatkov specifične pesmi s html-jem
router.get('/prikaz/:postId', async (req,res) => {
    try {
        const post = await Post.findById(req.params.postId);
        const min = Math.min(...post.st_diapozitiva)
        const max = Math.max(...post.st_diapozitiva)
        // doda 2x <br> med kiticami in se znebi nadležnih znakcev v primeru da obstajajo,
        let besedilo1 = post.besedilo.join("<br>-<br><br>");
        let besedilo2 = besedilo1.replace(//g, "<br>");
        res.send(
            '<meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="/stili.css"><a href="/" id="domov">Domov</a><h1><span id="naslov">Naslov pesmi: </span>' + post.naslov + 
            '</h1><br><p><b>Avtor:</b> ' + post.avtor + 
            '</p><br><p><b>Vrsta: </b>' + post.vrsta + 
            '</p><br><p><b>PowerPoint: </b>' + post.ppt+ 
            '</p><br><p><b>Datum spremembe: </b>' + post.datum_nastanka + 
            '</p><br><p><b>Številke diapozitiva: </b>' + min + '-' + max + ' (<i><small>' + post.st_diapozitiva + '</i></small>)' + 
            '</p><br><p><b>Besedilo: </b></p><div id="besedilo">' + besedilo2  + '</div>'
//           + '<script src="/website/prikaz.js"></script>'
            );
    }catch(err){
        res.status(400).json({ message: err})
    }
} )



module.exports = router
