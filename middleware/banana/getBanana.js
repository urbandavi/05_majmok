module.exports = (objRep)=>{
    const {bananas} = objRep
    return (req,res,next) =>{
        const bananaIdAsNumber = parseInt(req.params.id, 10);
           let foundId = -1;
           for (let i = 0; i < bananas.length; i++) {
               if (bananas[i].id === bananaIdAsNumber) {
                   foundId = i;
                   break;
               }
           }
    
           if (foundId === -1) {
               return res.status(404).json({
                   Error: `Requested bananaID not found! ${req.params.id}`
               });
           }
           return res.status(200).json(bananas[foundId]);
    }

}