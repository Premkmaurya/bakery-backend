const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/update-profile",
  authMiddleware,
  upload.single("avatar"),
  userController.updateUserProfile
);

router.get(
  "/get-addresses",
  authMiddleware,
  userController.getAddress
);

router.post(
  "/add-address",
  authMiddleware,
  userController.addAddress
)


module.exports = router;