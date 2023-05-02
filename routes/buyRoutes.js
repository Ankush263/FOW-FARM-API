const express = require('express')

const {
  createBuy,
  getAllBuy,
  setConsumerProfile,
  getSingleBuy,
  updateBuy,
  deleteBuy,
  getMyOrderForConsumer,
  getMyOrdersForBusiness
} = require('../controllers/buyControllers')

const {
  protect,
  restrictTo
} = require('../controllers/authControllers')

const router = express.Router()

router.use(protect)

router.route('/myOrder').get(restrictTo('user'), getMyOrderForConsumer)
router.route('/businessOrder').get(restrictTo('business'), getMyOrdersForBusiness)

router.route('/')
  .post(restrictTo('user'), setConsumerProfile, createBuy)
  .get(restrictTo('admin'), getAllBuy)

router.route('/:id')
  .get(restrictTo('admin'), getSingleBuy)
  .patch(restrictTo('user'), updateBuy)
  .delete(restrictTo('user'), deleteBuy)

module.exports = router
