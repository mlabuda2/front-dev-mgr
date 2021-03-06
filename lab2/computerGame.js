var db = [];

createGame(0, "FIFA 19", "Sport", 2018, true, true, ['multiplayer', 'esport', 'ics', 'ps4', 'xbox', 'pc'])
createGame(1, "League of Legends", "RPG", 2009, false, false, ['strategy', 'esport', 'pc'])
createGame(2, "Wiedźmin 3: Dziki Gon", "RPG", 2015, false, false, ['pc', 'gameoftheyear', 'ps4'])
createGame("Wiedźmin 4", "RPG", 2015, false, false, ['pc', 'gameoftheyear', ''])

console.log(db)
console.log(filterBy("category", "RPG"))
console.log(filterBy("relase", 2018))
console.log(filterBy("tags", "ps4"))
console.log(deleteGameBy(0, "id"))
console.log(deleteGameBy("League of Legends", "name"))
// console.log(db)
game = readGameBy("Wiedźmin 3: Dziki Gon", "name")
game.category = "MMO/RPG"
console.log(updateGame(readGameBy("Wiedźmin 3: Dziki Gon", "name"), game))
// console.log(db)

function createGame(id, name, category = null, relase = null, mobileVersion = null, payToWin = null, tags = []) {
    if ((!name) || (!id && id != 0) || (!Number.isInteger(id))) { console.log("Bad data."); return false }
    var computer_game = {
        id: id,
        name: name,
        category: category,
        relase: relase,
        mobileVersion: mobileVersion,
        payToWin: payToWin,
        tags: tags
    };
    console.log("Item created.")
    db.push(computer_game)
};
function readGameBy(idx, searchBy) {
    var searchedItem = db.map(function (item) {
        dispatcher = {
            "id": item.id,
            "name": item.name,
            "category": item.category,
            "relase": item.relase,
            "mobileVersion": item.mobileVersion,
            "payToWin": item.payToWin,
            "tags": item.tags
        }
        key = dispatcher[searchBy]
        return key;
    }).indexOf(idx);
    if (searchedItem >= 0) {
        return db[searchedItem]
    }
    console.log("Item doesn't exist.")
    return null
};
function updateGame(updatedGame, newObject) {
    if (updatedGame) {
        var updatedItem = db.map(function (item) { return item.id; }).indexOf(updatedGame.id);
    }
    else {
        console.log("Updated game not provided.")
        return false
    }
    if (updatedItem >= 0) {
        db[updatedItem] = newObject;
        console.log("Game updated.")
        return true
    }
    console.log("Updated item doesn't exist.")
    return false
};
function deleteGameBy(idx, searchBy) {
    var removeIndex = db.map(function (item) {
        dispatcher = {
            "id": item.id,
            "name": item.name,
            "category": item.category,
            "relase": item.relase,
            "mobileVersion": item.mobileVersion,
            "payToWin": item.payToWin,
            "tags": item.tags
        }
        key = dispatcher[searchBy]
        return key;
    }).indexOf(idx);
    if (removeIndex >= 0 && db.splice(removeIndex, 1)) {
        console.log("Item deleted.")
        return true
    }
    console.log("Item doesn't exist.")
    return false
};
function filterBy(searchBy, value) {
      var filtered = db.filter(function (element, index, array) {
        dispatcher = {
            "id": element.id,
            "name": element.name,
            "category": element.category,
            "relase": element.relase,
            "mobileVersion": element.mobileVersion,
            "payToWin": element.payToWin,
            "tags": element.tags
        }
        key = dispatcher[searchBy]
        if (searchBy != "tags") {
            return (key == value)
        } else {
            var exists = false
            key.forEach(element => {
                // console.log(element == value)
                if (element == value){
                    exists = true
                }
            });
            return exists
        }
      });
      return filtered
};
