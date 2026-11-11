module.exports = (objRep) => {
    const { monkeys, bananas } = objRep;
    return (req, res, next) => {
        const monkeyId = res.locals.monkey.id
        for (let i = bananas.length - 1; i >= 0; i--) {
            if (bananas[i].monkeyId === monkeyId) {
                bananas.splice(i, 1);
            }
        }
        return next();
    };
};
