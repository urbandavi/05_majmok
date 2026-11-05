module.exports = (objRep) => {
    const { monkeys, bananas } = objRep
    return (req, res, next) => {
        const index = monkeys.indexOf(res.locals.monkey)
        const monkeyId = res.locals.monkey.id
        monkeys.splice(index, 1)
        bananas = bananas.filter(b => b.monkeyId !== monkeyId);
        return next()
    }
}