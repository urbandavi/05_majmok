module.exports = (objRep)=>{
    const {bananas} = objRep
    return (req,res,next)=>{
        res.locals.bananas = bananas
        return next();
    }
}