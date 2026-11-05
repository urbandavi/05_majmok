module.exports = (objRep)=>{
    const {monkeys} = objRep
    return (req,res,next)=>{
        res.locals.monkeys = monkeys
        return next()
    }
}