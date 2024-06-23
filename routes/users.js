const express = require('express');
const router = express.Router();
const { login, register, current,} = require("../controllers/users");
const { auth } = require('../middleware/auth');

router.post("/login", login);
router.post("/register", register);
router.get("/current", auth, current);
router.get("/information", auth, current);
router.get('/feedback', current)


module.exports = router;