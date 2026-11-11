module.exports = (objRep) => {
    const { monkeys } = objRep
    return (req, res, next) => {

        if (req.body.monkeyId === null || req.body.monkeyId === undefined) {
            return next()
        }
        const monkey = monkeys.filter(b => b.id !== req.body.monkeyId)
        if (!monkey) {
            res.status(400).json({ Error: `There is no monkey with the id of ${res.body.monkeyId}` })
        }


        return next()

    }
}