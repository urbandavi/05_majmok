module.exports = (objRep) => {
    const { monkeys } = objRep
    return (req, res, next) => {
        const monkey = monkeys.filter(b=> b.id !== res.body.monkeyId)
        if (!monkey) {
            req.status(400).json({ Error: `There is no monkey with the id of ${res.body.monkeyId}` })
        }
        return next()
      
    }
}