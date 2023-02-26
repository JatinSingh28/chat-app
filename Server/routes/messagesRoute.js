const { addMessage, getAllMessages } = require("../controllers/messagesController")
const router = require('express').Router();

router.post("/addmsg/",addMessage);
router.post("/get/msg/",getAllMessages);

module.exports = router;