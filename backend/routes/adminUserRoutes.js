const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware'); // make sure isAdmin is used

const {
  getAllUsers,
  toggleUserStatus,
  changeUserRole,
  deleteUser,
} = require('../controllers/adminUserController');

router.get('/', protect, isAdmin, getAllUsers);
router.patch('/:id/toggle-status', protect, isAdmin, toggleUserStatus);
router.patch('/:id/role', protect, isAdmin, changeUserRole);
router.delete('/:id', protect, isAdmin, deleteUser);

module.exports = router;
