module.exports = (objRep) => {
    const { monkeys } = objRep
    return (req, res, next) => {
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
        
        return next()
    }
}