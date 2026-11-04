module.exports = (objRep)=>{
    const {monkeys} = objRep
    return (req,res,next)=>{
        return res.status(200).json(monkeys);
    }
}