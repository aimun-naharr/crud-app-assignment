"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post('/', user_controller_1.UserController.createUser);
router.get('/', user_controller_1.UserController.getAllUsers);
router.get('/:userId', user_controller_1.UserController.getUserById);
router.put('/:userId', user_controller_1.UserController.updateUser);
router.delete('/:userId', user_controller_1.UserController.deleteUser);
exports.default = router;
