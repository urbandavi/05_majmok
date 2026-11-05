module.exports = (objRep) => {
    const { bananas } = objRep
    return (req, res, next) => {
        const index = bananas.indexOf(res.locals.banana)
        bananas.splice(index, 1)
        return next()
    }
}