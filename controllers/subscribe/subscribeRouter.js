const express = require('express') 
// import subscribeController from "../controllers/SubscribeController.js";
const subscribeController = require('./subscribeController.js')
const middlewares = require('../../middlewares/index.js')()
const router = express.Router();

// Subscribe
// router.post('/subscribe/add', singleImage,subscribeController.createSubscribe);
// router.get("/subscribe/:id", subscribeController.fetchSubscribe);
// router.get("/subscribes", subscribeController.fetchAllSubscribes);
// router.delete("/subscribe/:id", subscribeController.deleteSubscribe);

// Subscribe
router.post('/subscribe/add',middlewares.singleImage, subscribeController.createSubscribe);
router.get("/subscribe/:id", subscribeController.fetchSubscribe);
router.get("/subscribes", subscribeController.fetchAllSubscribes);
router.delete("/subscribe/:id", subscribeController.deleteSubscribe);

module.exports = router