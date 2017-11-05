import express from 'express';
import {articles} from 'mockApi/data/article';
import {DEFAULT_HTTP_STATUS_MSG_HASH} from 'src/helpers/ApiErrorCode';

const router = express.Router();

// 擷取全部的articleType到type Array
const type = articles.article.map((name, index) => {
  return name.articleType;
});

// 移除type Array裡重複的部分到filterArray裡
const filteredArray = type.filter(function (item, pos) {
  return type.indexOf(item) === pos;
});

// 按照type重組Array
const foodArray = articles.article.filter((value, index) => {
  if (value.articleType === 'food') {
    return value;  // is a Object
  } else {
    return false;
  }
});
const sportArray = articles.article.filter((value, index) => {
  if (value.articleType === 'sport') {
    return value;  // is a Object
  } else {
    return false;
  }
});

function filterDetail(id) {
  return articles.article.filter((value, index) => {
    if (value.id === id) {
      return value;
    }
  });
}

function filterArticles(filterArray, keyWord) {
  if (keyWord.length === 0) {
    return filterArray;
  } else {
    return filterArray.filter(function(item, pos){
      if (item.title.indexOf(keyWord) !== -1) {
        return item;
      }
    });
  }
}


function getArticle(array, count) {

  if (array.length <= count) {
    const data = {
      array: array,
      length: false,
    }
    return data;
  } else {
    const data = {
      array: array.slice(0, count),
      length: true,
    }
    return data;
  }
}

/* blog/desktop/article/articleInfo */
router.get('/articleInfo', (req, res) => {
  const data = {
    food: getArticle(foodArray, 5),
    sport: getArticle(sportArray, 5),
  }
  return res.status(200).json(data).end();
});

/* blog/desktop/article/moreArticle */
router.post('/moreArticle', (req, res) => {
  const arrayName = req.body.info;
  let newLength = req.body.newLength;
  const oldLength = req.body.oldLength;
  newLength = newLength + 5;

  // 判斷哪一個array的長度需要改變，不改變印出原本的長度，改變則印出新的長度
  const foodArticle = arrayName === 'food' ?
    getArticle(foodArray, newLength) : getArticle(foodArray, oldLength);
  const sportArticle = arrayName === 'sport' ?
    getArticle(sportArray, newLength) : getArticle(sportArray, oldLength);
  const data = {
    food: foodArticle,
    sport: sportArticle,
  }

  return res.status(200).json(data).end();
});

router.post('/editFavor', (req, res) => {
  return res.status(200).end();
});

/* blog/desktop/article/filterArticle */
router.post('/filterArticle', (req, res) => {
  const searchData = req.body.searchData;
  const keyWord = searchData.keyWord;
  let inputFilter = 0;

  searchData.inputFilter.split(/[>=><=<+]/).forEach(function(myString) {
    inputFilter = myString;
    return inputFilter;
  });

  // 用keyword先把符合的title從原本的array filter出來
  const foodfilter = searchData.checkboxMultiple.indexOf('food') !== -1 ? filterArticles(foodArray, keyWord) : [];
  const sportfilter = searchData.checkboxMultiple.indexOf('sport') !== -1 ? filterArticles(sportArray, keyWord) : [];

  // 讓filter的陣列數量不要超過inputFilter訂定的數量
  const foodsResult = getArticle(foodfilter, inputFilter);
  const sportsResult = getArticle(sportfilter, inputFilter);
  const data = {
    food: foodsResult,
    sport: sportsResult,
  }

  return res.status(200).json(data).end();
});

/*
  blog/desktop/article/editArticle
*/
router.post('/editArticle', (req, res) => {
  return res.status(200).end();
});

/*
  blog/desktop/article/changeArticls
*/
router.post('/changeArticls', (req, res) => {
  return res.status(200).end();
});


/* blog/desktop/article/getArticleDetail */
router.get('/getArticleDetail', (req, res) => {
  const id = req.query.id;
  const data = filterDetail(id);
  return res.status(200).json(data).end();
});

/*
  blog/desktop/article/deleteArticle
*/
router.post('/deleteArticle', (req, res) => {
  return res.status(200).end();
});
export default router;
