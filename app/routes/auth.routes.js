//Import Express para crear el router

import express from 'express';

import { signUp, signin } from '../controllers/auth.controller.js';

import {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
} from '../middleware/verifySignUp.js';

const router = express.Router();

router.post(
    '/signup',
    [checkDuplicateUsernameOrEmail, checkRolesExisted],
    signUp
);

router.post('/signin', signin);

export default router;