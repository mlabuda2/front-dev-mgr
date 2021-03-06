const ComputerGame = require('../../lab5/src/es6_computerGame');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 4000;
app.use(cors())
app.use(bodyParser.json());
const cgames = [];

app.get('/api', (req, res) => res.send('Hello World!'))
app.get('/api/cgames/all', (req, res) => {
    console.log("GET /api/cgames/all")
    res.send(cgames)
});
app.post('/api/cgames/add', (req, res) => {
    console.log("POST /api/cgames/add")
    const game = req.body.cgame;
    const cgame = new ComputerGame(game._name, game._category, game._relase, game._payToWin, game._tags)
    cgames.push(cgame)
    console.log(cgame)
    res.send({"message": "Added"})
});
app.delete('/api/cgames/:id', (req, res) => {
    console.log("DELETE /api/cgames/:id")
    const id = req.params.id;
    let deleted = false
    cgames.forEach(function  (element) {
        console.log(element)
        if (element._id == id){
            const idx = cgames.indexOf(element)
            if (cgames.indexOf(element) !== -1) {
                if (cgames.splice(idx, 1)) {
                    console.log("Item deleted.")
                    res.send({"message": "Item deleted."})
                    deleted = true
                }
            }
        }
    });
    if (!deleted) {
        console.log("Item doesn't exist.")
        res.send({"message": "Item doesn't exist."})
    }
});

app.put('/api/cgames/update/:id', (req, res) => {
    console.log("UPDATE /api/cgames/update/:id")
    const id = req.params.id;
    let game = req.body.cgame;
    console.log(id, game)
    game._id = id;
    const validated = validate_game(game)
    let updated = false;
    if (validated[0]){
        cgames.forEach(function  (element) {
            console.log(element)
            if (element._id == id){
                const idx = cgames.indexOf(element)
                cgames[idx] = game;
                updated = true;
                res.send({"message": "Item updated."})
            }
        });
    }
    else {
        console.log(validated[1])
        res.status(400).send({"message": validated[1]})
        return false;
    }
    if (!updated) {
        console.log("Item doesn't exist.")
        res.send({"message": "Item doesn't exist."})
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const validate_game = function(game) {
    if (!game){
        return [false, "Not game provided"]}
    if (!game._name) { 
        return [false, "Not name provided."]}
    if (!game._category) { 
        return [false, "Not category provided."]}
    if (!game._relase) { 
        return [false, "Not relase provided."]}
    if (!game._payToWin & game._payToWin != false) { 
        return [false, "Not payToWin provided."]}
    if (!game._tags) { 
        return [false, "Not tags provided."]}
    return [true, "OK"]
}