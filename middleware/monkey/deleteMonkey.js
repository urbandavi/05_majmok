module.exports = (objRep) => {
    const { monkeys, bananas } = objRep
    return (req, res, next) => {
        const index = monkeys.indexOf(res.locals.monkey)
        const monkeyId = res.locals.monkey.id
        monkeys.splice(index, 1)
        console.log(res.locals.monkey.id)

        bananas = bananas.filter(b => b.monkeyId !== monkeyId);
        return res.status(200).json({ deletedMonkeyById , monkeyId});
    }
}