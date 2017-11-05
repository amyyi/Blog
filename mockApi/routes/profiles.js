import express from 'express';
import data from 'mockApi/data/profiles';
import {DEFAULT_HTTP_STATUS_MSG_HASH} from 'src/helpers/ApiErrorCode';

const router = express.Router();

/*
  blog/desktop/accounts/info
*/
function findElement(arr, propName, propValue) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][propName] === propValue) {
      return arr[i][propName];
    }
  }

  // will return undefined if not found; you could return a default instead
}

router.get('/info', (req, res) => {
  const accountId = req.query.accountId;
  setTimeout(() => {
    if (accountId === 'amy.lu@nogle.com') {
      return res.status(200).json(data[0]).end();
    } else if (accountId === 'amy1.lu@nogle.com') {
      return res.status(200).json(data[1]).end();
    }
  }, 500);
});

/*
  blog/desktop/accounts/isacceptable
*/
router.get('/isacceptable', (req, res) => {

  const {ACCOUNT_EXISTS} = DEFAULT_HTTP_STATUS_MSG_HASH;
  const name = req.query.name;
  const dataName = findElement(data, 'blogName', name);

  setTimeout(() => {

    if (typeof dataName === 'undefined') {
      return res.status(200).end();
    }

    return res.status(ACCOUNT_EXISTS.status).json(ACCOUNT_EXISTS).end();

  }, 1000);
});

export default router;
