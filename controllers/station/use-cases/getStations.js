module.exports = function makeGetStations(db, E, utils) {
    return async function getStations(req, res) {
        const result = await db.Station
        .find({type: req.query.type})
        .populate('outExpeditions')
        .populate('inExpeditions')
        .populate('outIterinaries')
        .populate('inIterinaries')

        let stations = []
        for(station of result) {
            stations.push({
                id : station.id,
                title : station.reference,
                coordinates : {
                    lan : station.lan,
                    lat : station.lat
                }
            })
        }
        res.json({stations,message:"success",statusCode:200})
    }
}