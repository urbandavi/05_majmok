module.exports = (objRep) => {
    const { bananas } = objRep
    return (req, res, next) => {
         if (typeof req.body.color == 'undefined' || typeof req.body.sweet == 'undefined') {
            req.status(400).json({ Error: `Missing color or sweet` })
        }
        
        const newBanana = {
            id: objRep.globalBananaId,
            color: req.body.color,
            sweet: req.body.sweet,
            monkeyId: req.body.monkeyId ?? null
        };

        bananas.push(newBanana);
        objRep.globalBananaId++;
        res.locals.newBanana = newBanana
        return next()
    }
}