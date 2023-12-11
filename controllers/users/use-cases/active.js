module.exports = function makeActive(db,E,utils) {
    return async function active(req,res) {
        const user = await db.User.findById(req.params.id);
        await db.User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    isActive : !user.isActive,
                }
            }
        )
        let response = await db.User.findById(req.params.id);  
        res.json(response)  
    }
}
