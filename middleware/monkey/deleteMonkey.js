module.exports = (objRep) => {
    const { monkeys, bananas } = objRep
    return (req, res, next) => {
        const deletedMonkeyById = monkeys[res.locals.monkeyIndex];
        monkeys.splice(res.locals.monkeyIndex, 1);
        const monkeyID = monkeys[res.locals.monkeyIndex].id;
        bananas = bananas.filter(b => b.monkeyId !== monkeyID);
        return res.status(200).json({ deletedMonkeyById });
    }
}