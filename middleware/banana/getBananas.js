module.exports = (objRep)=>{
    const {bananas} = objRep
    return (req,res,next)=>{
        return res.status(200).json(bananas);
    }
}