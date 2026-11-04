
const getMonkeysMW = require('../middleware/monkey/getMonkeys')
const getBananasMW = require('../middleware/banana/getBananas')
const getMonkeyMW = require('../middleware/monkey/getMonkey')
const getBananaMW = require('../middleware/banana/getBanana')


function addRoots(app) {
    
    const monkeys = [
        {
            id: 1,
            name: 'Joe',
            sex: 'male',
            species: 'gibbon'
            
        },
        {
            id: 2,
            name: 'Josephine',
            sex: 'female',
            species: 'gorilla'
        },
        {
            id: 3,
            name: 'Lajos',
            sex: 'male',
            species: 'orangutan'
        }
    ]
    
    const bananas = [
        {
            id: 1,
            color: "yellow",
            sweet: false,
            monkeyId: null
        },
        {
            id: 2,
            color: "yellow",
            sweet: true,
            monkeyId: null
        },
        {
            id: 3,
            color: "green",
            sweet: true,
            monkeyId: null
        }, {
            id: 4,
            color: "green",
            sweet: false,
            monkeyId: null
        }
    ]
    let globalMonkeyId = monkeys.length + 1;
    let globalBananaId = bananas.length + 1;
    const objRep = {
        monkeys,
        bananas,
        globalMonkeyId,
        globalBananaId
    }
    
  

    
   
    const createMonkey = (req, res, next) => {
        if (typeof req.body.name == 'undefined' || typeof req.body.sex == 'undefined' || typeof req.body.species == 'undefined') {
            req.status(400).json({ Error: `Missing name, sex or species` })
        }
        const newMonkey = {
            id: globalMonkeyId,
            name: req.body.name,
            sex: req.body.sex,
            species: req.body.species
        }
        monkeys.push(newMonkey);
        globalMonkeyId++;
        return res.status(200).json(newMonkey)

    }

    const createBanana = (req, res, next) => {
        if (typeof req.body.color == 'undefined' || typeof req.body.sweet == 'undefined') {
            req.status(400).json({ Error: `Missing color or sweet` })
        }
        const newBanana = {
            id: globalBananaId,
            color: req.body.color,
            sweet: req.body.sweet,
            monkeyId: req.body.monkeyId ?? null
        };

        bananas.push(newBanana);
        globalBananaId++;
        return res.status(201).json(newBanana);
    };

    const deleteMonkey = (req, res, next) => {
        const deletedMonkeyById = monkeys[res.locals.monkeyIndex];
        monkeys.splice(res.locals.monkeyIndex, 1);
        return res.status(200).json({ deletedMonkeyById });
    }

    const deleteBanana = (req, res, next) => {
        const deletedBananaById = bananas[res.locals.bananaIndex];
        bananas.splice(res.locals.bananaIndex, 1);
        return res.status(200).json({ deletedBananaById })
    }

    const updateMonkey = (req, res, next) => {
        if (typeof req.body.name !== 'undefined') {
            monkeys[res.locals.monkeyIndex].name = req.body.name;
        }
        if (typeof req.body.sex !== 'undefined') {
            monkeys[res.locals.monkeyIndex].sex = req.body.sex;
        }
        if (typeof req.body.species !== 'undefined') {
            monkeys[res.locals.monkeyIndex].species = req.body.species;
        }
        if (typeof req.body.bananaId !== 'undefined') {
            monkeys[res.locals.monkeyIndex].bananaId = req.body.bananaId;
        }
        if ((typeof req.body.name === 'undefined') && (typeof req.body.sex === 'undefined') && (typeof req.body.species === 'undefined')) {
            return res.status(400).json({ error: 'Missing name, sex or species' })
        }
        return res.status(200).json(monkeys[res.locals.monkeyIndex]);
    }

    const updateBanana = (req, res, next) => {
        if (typeof req.body.color !== 'undefined') {
            bananas[res.locals.bananaIndex].color = req.body.color;
        }
        if (typeof req.body.sweet !== 'undefined') {
            bananas[res.locals.bananaIndex].sweet = req.body.sweet;
        }
        if (typeof req.body.monkeyId !== 'undefined') {
            bananas[res.locals.bananaIndex].monkeyId = req.body.monkeyId;
        }

        if ((typeof req.body.color === 'undefined') && (typeof req.body.sweet === 'undefined')) {
            return res.status(400).json({ error: 'Missing color, sweet!' })
        }
        return res.status(200).json(bananas[res.locals.bananaIndex]);
    }

    const checkMonkeyId = (req, res, next) => {
        const monkeyId = req.body.monkeyId;
        // nincs megadva vagy null: gazdátlan banán, nincs mit ellenőrizni
        if (monkeyId === undefined || monkeyId === null) {
            return next();
        }
        // csak egész szám lehet
        if (!Number.isInteger(monkeyId)) {
            return res.status(400).json({ error: 'monkeyId must be an integer' });
        }
        // létezik-e ilyen majom
        const monkey = monkeys.find(m => m.id === monkeyId);
        if (monkey === undefined) {
            return res.status(400).json({ error: 'Monkey does not exist' });
        }
        next();
    }

    const deleteMonkeyBananas = (req, res, next) => {
        const monkeyID = monkeys[res.locals.monkeyIndex].id;
        bananas = bananas.filter(b => b.monkeyId !== monkeyID);
        next();
    };

    app.get('/monkey', getMonkeysMW(objRep));
    app.post('/monkey', createMonkey);
    app.get('/monkey/:id', getMonkeyMW(objRep));
    app.delete('/monkey/:id', deleteMonkeyBananas, deleteMonkey);
    app.patch('/monkey/:id', updateMonkey);

    app.get('/banana', getBananasMW(objRep)); // Minden banán
    app.post('/banana', checkMonkeyId, createBanana);
    app.get('/banana/:id',  getBananaMW(objRep));
    app.delete('/banana/:id',  deleteBanana);
    app.patch('/banana/:id',  checkMonkeyId, updateBanana);

}



module.exports = addRoots