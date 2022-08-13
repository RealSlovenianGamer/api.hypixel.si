const express = require('express');
const router = express.Router();
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

//SUBMITS A POST
router.post('/', async (req, res) => {
    const post = new Post({
        naslov: req.body.naslov,
        avtor: req.body.avtor,
        besedilo: req.body.besedilo,
        ppt: req.body.ppt,
        vrsta: req.body.vrsta,
        st_diapozitiva: req.body.st_diapozitiva,
    })
    try {
        var ura = new Date().toLocaleString();
        const savedPost = await post.save()
        console.log('Dodal "' + savedPost.naslov + '" ob' + ura);
        res.json(savedPost)
    }
    catch(err) {
        res.status(400).json({ message: err})
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

//DELETE SPECIFIC POST
router.delete('/:postId', async (req,res) => {
    try {
        var ura = new Date().toLocaleString();
        const removedPost = await Post.deleteOne({_id: req.params.postId})
        console.log('Odstranil "' + removedPost.naslov + '" ob' + ura);
        res.json(removedPost)
    }catch(err){
        res.json({message: err})
    }
})

//UPDATE A POST
router.patch('/:postId', async (req,res) => {
    try{
    const updatedPost = await Post.updateOne(
        { _id: req.params.postId},
        { $set: {naslov: req.body.naslov,
        avtor: req.body.avtor,
        besedilo: req.body.besedilo,
        ppt: req.body.ppt,
        vrsta: req.body.vrsta,
        st_diapozitiva: req.body.st_diapozitiva} });
        var ura = new Date().toLocaleString();
        console.log('Posodobil "' + req.body.naslov + '" ob' + ura);
        res.json(updatedPost);
    }catch(err){
        res.json({message: err})
    }
} )

module.exports = router
