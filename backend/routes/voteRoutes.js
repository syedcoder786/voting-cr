const express = require("express");
const router = express.Router();
const {
  voteUser,
  fetchUsers,
} = require("../controllers/voteController");
const { protect } = require("../middleware/authMiddleware");

router.post("/voteUser", protect, voteUser);
router.get("/fetchUsers", fetchUsers);

module.exports = router;
