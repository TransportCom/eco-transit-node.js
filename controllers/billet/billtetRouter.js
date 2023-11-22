const express = require('express') 
// import subscribeController from "../controllers/SubscribeController.js";
const billetController = require('./billetController.js')
const middlewares = require('../../middlewares/index.js')()
const router = express.Router();

// Subscribe
// router.post('/subscribe/add', singleImage,subscribeController.createSubscribe);
// router.get("/subscribe/:id", subscribeController.fetchSubscribe);
// router.get("/subscribes", subscribeController.fetchAllSubscribes);
// router.delete("/subscribe/:id", subscribeController.deleteSubscribe);

// Billet
router.post('/billet/add',middlewares.singleImage, billetController.createBillet);
router.get("/billet/:id", billetController.fetchBillet);
router.get("/billets", billetController.fetchAllBillets);
router.delete("/billet/:id", billetController.deleteBillet);

module.exports = router