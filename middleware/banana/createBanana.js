module.exports = (objRep) => {
    let { bananas, globalBananaId } = objRep
    return (req, res, next) => {
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
    }
}