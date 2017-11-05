import express from 'express';

import {DEFAULT_HTTP_STATUS_MSG_HASH} from 'src/helpers/ApiErrorCode';

import data from 'mockApi/data/accounts';

const router = express.Router();

/*
  blog/desktop/auth/login
*/
router.post('/login', (req, res) => {

  const {ACCOUNT_NOT_LOGIN} = DEFAULT_HTTP_STATUS_MSG_HASH;
  const id = req.body.id;
  const pass = req.body.pass;
  const USER = {
    accountId: id
  };

  setTimeout(() => {

    if (id === 'amy.lu@nogle.com' && pass === '123') {
      return res.status(200).json(USER).end();
    } else if (id === 'amy1.lu@nogle.com' && pass === '456') {
      return res.status(200).json(USER).end();
    }

    return res.status(ACCOUNT_NOT_LOGIN.status).json(ACCOUNT_NOT_LOGIN).end();

  }, 1000);
});

/*
  blog/desktop/auth/logout
*/
router.post('/logout', (req, res) => {
  setTimeout(() => {
    return res.status(200).end();
  }, 500);
});

/*
  blog/desktop/auth/signup
*/
router.post('/signup', (req, res) => {

  const ACCOUNT_EXISTS = {
    status: 422,
    errorCode: 10,
    message: 'ACCOUNT_EXISTS',
  };
  const name = req.body.name;

  setTimeout(() => {

    if (name === 'amy') {
      return res.status(ACCOUNT_EXISTS.status).json(ACCOUNT_EXISTS).end();
    }

    return res.status(200).end();

  }, 1000);
});

export default router;
