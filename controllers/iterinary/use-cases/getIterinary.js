module.exports = function makeGetIterinay(db, E, utils) {
    return async function getIterinary(req, res) {
        let stations = await db.Station.find({type: req.query.type})
        let fromStations = stations.filter((station) => {
            return utils.calculateDistance(station.lan, station.lat, req.query.fromLan, req.query.fromLat) < 10  
        })
        let toStations = stations.filter((station) => {
            return utils.calculateDistance(station.lan, station.lat, req.query.toLan, req.query.toLat) < 10
        })
        let result = await db.Iterinary.find({type: req.query.type})
        .populate({
            path: 'iterinaryExpeditions',
            populate: {
                path: 'expedition'
            }
        })
        .populate('fromStation')
        .populate('toStation')
        let found = []
        fromStations.map((fromStation) => {
            toStations.map((toStation) => {
                let matches = result.filter((iterinary) => {
                    let matchesFrom = iterinary.iterinaryExpeditions.filter((iterinaryExpeditionFrom,indexFrom) =>
                        {
                            if(iterinaryExpeditionFrom.expedition.fromStation == fromStation.id ) {
                                let matchesTo = []
                                for(let indexTo = indexFrom; indexTo < iterinary.iterinaryExpeditions.length; indexTo++ ) {
                                    let iterinaryExpeditionTo = iterinary.iterinaryExpeditions[indexTo];
                                    if (
                                        iterinaryExpeditionTo.expedition.toStation == toStation.id && indexFrom <= indexTo
                                    ) {
                                        matchesTo.push(iterinaryExpeditionTo)
                                    }
                                }
                                return matchesTo.length > 0
                            }
                        }
                    )
                    
                    return matchesFrom.length > 0
                });
                found = [...found, ...matches]
            })
        
        })
        let iterinary = found.length > 0 ? found[0] : undefined
        iterinary = await db.Iterinary
        .findById(iterinary.id)
        .populate('fromStation')
        .populate('toStation')
        .populate({
            path: 'iterinaryExpeditions',
            populate: {
                path: 'expedition',
                populate : [
                    {
                        path: 'fromStation'
                    },
                    {
                        path: 'toStation'
                    }
                ]
            }
        });        
        let fromStation = iterinary.fromStation
        console.log(iterinary.iterinaryExpeditions)
        iterinary.iterinaryExpeditions.map((iterinary) => {

            if(utils.calculateDistance(iterinary.expedition.fromStation.lan, iterinary.expedition.fromStation.lat, req.query.fromLan, req.query.fromLat) 
            <  utils.calculateDistance(fromStation.lan, fromStation.lat, req.query.fromLan, req.query.fromLat) ) {
                fromStation = iterinary.expedition.fromStation
            }
        })

        let toStation = iterinary.toStation
        iterinary.iterinaryExpeditions.map((iterinary) => {
            if(utils.calculateDistance(iterinary.expedition.toStation.lan, iterinary.expedition.toStation.lat, req.query.toLan, req.query.toLat) 
            <  utils.calculateDistance(toStation.lan, toStation.lat, req.query.toLan, req.query.toLat) ) {
                toStation = iterinary.expedition.toStation
            }
        })
        res.json({
            iterinary,
            fromStation : {
                id: fromStation.id,
                title : fromStation.reference,
                coordinates : {
                    lan: fromStation.lan,
                    lat: fromStation.lat
                }
            },
            toStation : {
                id: toStation.id,
                title : toStation.reference,
                coordinates : {
                    lan: toStation.lan,
                    lat: toStation.lat
                }
            }
        })
    }
}