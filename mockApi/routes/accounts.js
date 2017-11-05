import express from 'express';
import data from 'mockApi/data/accounts';
import {DEFAULT_HTTP_STATUS_MSG_HASH} from 'src/helpers/ApiErrorCode';

const router = express.Router();

/*
  blog/desktop/accounts/info
*/
function findElement(arr, propName, propValue) {

  for (let i = 0; i < arr.length; i++) {
    const objName = arr[i]['contentInfo'].map((name) => {

      if (name.blogName === propValue) {
        return name.blogName;
      }
    });

    return objName;
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

    if (typeof dataName[0] === 'undefined') {
      return res.status(200).end();
    }

    return res.status(ACCOUNT_EXISTS.status).json(ACCOUNT_EXISTS).end();

  }, 1000);
});

/*
  blog/desktop/accounts/update
*/
router.post('/update', (req, res) => {
  return res.status(200).end();
});

/*
  blog/desktop/accounts/updateProfile
*/
router.post('/updateProfile', (req, res) => {
  const profile = req.body.profile;
  if (profile) {
    return res.status(200).end();
  }
});

export default router;
