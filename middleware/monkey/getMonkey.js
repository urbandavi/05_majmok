module.exports = (objRep)=>{
    const {monkeys} = objRep
    return (req,res,next) =>{
        const monkeyIdAsNumber = parseInt(req.params.id, 10);
           let foundId = -1;
           for (let i = 0; i < monkeys.length; i++) {
               if (monkeys[i].id === monkeyIdAsNumber) {
                   foundId = i;
                   break;
               }
           }
    
           if (foundId === -1) {
               return res.status(404).json({
                   Error: `Requested monkeyID not found! ${req.params.id}`
               });
           }
           res.locals.monkey = monkeys[foundId]
           return res.status(200).json(monkeys[foundId]);
    }

}