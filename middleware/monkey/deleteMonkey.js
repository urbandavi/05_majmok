module.exports = (objRep) => {
    const { monkeys } = objRep
    return (req, res, next) => {
        const index = monkeys.indexOf(res.locals.monkey)
        monkeys.splice(index, 1)
        return next()
    }
}