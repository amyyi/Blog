import {fromJS} from 'immutable';
import {article as cons} from '../constants';
import ApiClient from 'helpers/ApiClient';

const apiClient = new ApiClient();
const initialState = fromJS({
  article: false,
  articleSuc: false,
  articleErr: false,

  moreArticle: false,
  moreArticleSuc: false,
  moreArticleErr: false,

  loadFavor: false,
  loadFavorSuc: false,
  loadFavorErr: false,
  loadFavors: [],

  filter: false,
  filterSuc: false,
  filterErr: false,

  edit: false,
  editSuc: false,
  editErr: false,

  changeArticle: false,
  changeArticleSuc: false,
  changeArticleErr: false,

  detailArticle: false,
  detailArticleSuc: false,
  datailArticleErr: false,

  deleteArticle: false,
  deleteArticleSuc: false,
  deleteArticleErr: false,

  datils: [],
  editArticle: [],
  articles: [],
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case cons.ARTICLE:
      return state.merge({
        article: true,
        articleSuc: false,
        articleErr: false,
      });
    case cons.ARTICLE_SUCCESS:
      return state.merge({
        article: false,
        articleSuc: true,
        articleErr: false,
        articles: fromJS(action.result),
      });
    case cons.ARTICLE_FAIL:
      return state.merge({
        article: false,
        articleSuc: false,
        articleErr: fromJS(action.error),
      });
    case cons.MOREARTICLE:
      return state.merge({
        moreArticle: true,
        moreArticleSuc: false,
        moreArticleErr: false,
      });
    case cons.MOREARTICLE_SUCCESS:
      return state.merge({
        moreArticle: false,
        moreArticleSuc: true,
        moreArticleErr: false,
        articles: fromJS(action.result),
      });
    case cons.MOREARTICLE_FAIL:
      return state.merge({
        moreArticle: false,
        moreArticleSuc: false,
        moreArticleErr: fromJS(action.error),
      });

    case cons.LOAD_FAVOR:
      return state.merge({
        loadFavor: true,
        loadFavorSuc: false,
        loadFavorErr: false,
      });
    case cons.LOAD_FAVOR_SUCCESS: {
      const article = action.atts.article;
      const info = action.atts.info;
      const idx = action.atts.idx;
      const articleType = article.getIn(['articles', info, 'array']);
      let newarticle = article;
      const loveItem = article.getIn(['articles', info, 'array']).find(function (articleTypes, infos) {
        const loveId = action.atts.loveId;
        const loved = articleTypes.get('id');

        // 如果陣列裡的id與action.atts的id相同
        // 因為陣列有很多id要找到id等於action.atts的id
        if (loved === loveId) {
          return loveId;
        }
      });

      if (loveItem) {
        const loveResult = loveItem.get('love') === 'true' ? 'false' : 'true';
        newarticle = article.setIn(['articles', info, 'array', idx, 'love'], loveResult); // setIn 要另外宣告新的array才會回傳新的結果
      }

      return state.merge({
        loadFavor: false,
        loadFavorSuc: true,
        loadFavorErr: false,
        articles: newarticle.get('articles'),
      }); }
    case cons.LOAD_FAVOR_FAIL:
      return state.merge({
        loadFavor: false,
        loadFavorSuc: false,
        loadFavorErr: fromJS(action.error),
      });

    case cons.FILTER:
      return state.merge({
        filter: true,
        filterSuc: false,
        filterErr: false,
      });
    case cons.FILTER_SUCCESS:
      return state.merge({
        filter: false,
        filterSuc: true,
        filterErr: false,
        articles: fromJS(action.result),
      });
    case cons.FILTER_FAIL:
      return state.merge({
        filter: false,
        filterSuc: false,
        filterErr: fromJS(action.error),
      });

    case cons.EDIT:
      return state.merge({
        edit: true,
        editSuc: false,
        editErr: false,
      });
    case cons.EDIT_SUCCESS:
      return state.merge({
        edit: false,
        editSuc: true,
        editErr: false,
        editArticle: action.atts.editData,
      });
    case cons.EDIT_FAIL:
      return state.merge({
        edit: false,
        editSuc: false,
        editErr: fromJS(action.error),
      });

    case cons.CHANGE:
      return state.merge({
        changeArticle: true,
        changeArticleSuc: false,
        changeArticleErr: false,
      });
    case cons.CHANGE_SUCCESS: {
      const article = action.atts.article;
      const info = action.atts.info;
      const id = action.atts.id;
      const idx = action.atts.idx;
      const data = action.atts.data;
      const articleType = article.getIn(['articles', info, 'array']);

      const articleItem = article.getIn(['articles', info, 'array']).find(function (articleTypes, infos) {
        const articleId = id;
        const articlesId = articleTypes.get('id');

        // 如果陣列裡的id與action.atts的id相同
        // 因為陣列有很多id要找到id等於action.atts的id
        if (articlesId === articleId) {
          return articleId;
        }
      });

      const orginalType = articleItem.get('articleType');
      let addArticles = article;

      if (orginalType !== data.editType) {

        const articles = article.get('articles');

        const removeObj = article.getIn(['articles', info, 'array']).filter(function (articleTypes, infos) {
          const articleId = id;
          const articlesId = articleTypes.get('id');

          // 如果陣列裡的id與action.atts的id不相同
          // 因為陣列有很多id要找到id不等於action.atts的id
          if (articlesId !== articleId) {
            return articleId;
          }
        });

        // 刪除原本類別array中的object(把擷取出來的array取代原本的array)
        const changeTypeArray = article.setIn(['articles', info, 'array'], removeObj);

        // 新增object到新的類別array中
        const pushedArticle = changeTypeArray.getIn(['articles', data.editType, 'array']).push(articleItem);

        // 把新增到的object取代掉原本的那個類別中的object
        addArticles = changeTypeArray.setIn(['articles', data.editType, 'array'], pushedArticle);
      }

      const newlLength = article.getIn(['articles', data.editType, 'array']).toJS().length;
      const objectIdx = orginalType === data.editType ? idx : newlLength;
      const editedTitle = addArticles.setIn(['articles', data.editType, 'array', objectIdx, 'title'], data.editTitle);
      const editedContent = editedTitle.setIn(['articles', data.editType, 'array', objectIdx, 'content'], data.editContent);
      const editType = editedContent.setIn(['articles', data.editType, 'array', objectIdx, 'articleType'], data.editType);

      return state.merge({
        changeArticle: false,
        changeArticleSuc: true,
        changeArticleErr: false,
        articles: editType.get('articles'),
      }); }
    case cons.CHANGE_FAIL:
      return state.merge({
        changeArticle: false,
        changeArticleSuc: false,
        changeArticleErr: fromJS(action.error),
      });

    //  detail
    case cons.DETAIL:
      return state.merge({
        detailArticle: true,
        detailArticleSuc: false,
        detailArticleErr: false,
      });
    case cons.DETAIL_SUCCESS: {
      return state.merge({
        detailArticle: false,
        detailArticleSuc: true,
        detailArticleErr: false,
        datils: fromJS(action.result),
      }); }
    case cons.DETAIL_FAIL:
      return state.merge({
        detailArticle: false,
        detailArticleSuc: false,
        detailArticleErr: fromJS(action.error),
      });

      // delete
    case cons.DELETE:
      return state.merge({
        deleteArticle: true,
        deleteArticleSuc: false,
        deleteArticleErr: false,
      });
    case cons.DELETE_SUCCESS: {
      const article = action.atts.article;
      const info = action.atts.info;
      const deleteArray = action.atts.articleArray;
      const type = deleteArray.get('articleType');
      const id = deleteArray.get('id');

      const removeObj = article.getIn(['articles', type, 'array']).filter(function (articleTypes, infos) {
        const articleId = id;
        const articlesId = articleTypes.get('id');

        if (articlesId !== articleId) {
          return articleId;
        }
      });
      const deletedArray = article.setIn(['articles', type, 'array'], removeObj);
      return state.merge({
        deleteArticle: false,
        deleteArticleSuc: true,
        deleteArticleErr: false,
        articles: deletedArray.get('articles'),
      }); }
    case cons.DELETE_FAIL:
      return state.merge({
        deleteArticle: false,
        deleteArticleSuc: false,
        deleteArticleErr: fromJS(action.error),
      });
    default:
      return state;
  }
}

export function getArticleInfo() {
  return {
    types: [cons.ARTICLE, cons.ARTICLE_SUCCESS, cons.ARTICLE_FAIL],
    promises: (client) => client.get('/blog/desktop/article/articleInfo'),
  };
}

export function getMoreArticle(info, newLength, oldLength) {
  return {
    types: [cons.MOREARTICLE, cons.MOREARTICLE_SUCCESS, cons.MOREARTICLE_FAIL],
    promises: (client) => client.post('/blog/desktop/article/moreArticle', {
      data: {
        info: info,
        newLength: newLength,
        oldLength: oldLength,
      },
    })
  };
}

export function editFavor(article, info, loveId, idx) {
  return {
    types: [cons.LOAD_FAVOR, cons.LOAD_FAVOR_SUCCESS, cons.LOAD_FAVOR_FAIL],
    promises: (client) => client.post('/blog/desktop/article/editFavor', {
      data: {
        article: article,
        info: info,
        loveId: loveId,
        idx: idx,
      },
    }),
    atts: {
      article: article,
      info: info,
      loveId: loveId,
      idx: idx,
    },
  };
}

export function filterArticle(searchData) {
  return {
    types: [cons.FILTER, cons.FILTER_SUCCESS, cons.FILTER_FAIL],
    promises: (client) => client.post('/blog/desktop/article/filterArticle', {
      data: {
        searchData: searchData,
      },
    })
  };
}

export function editArticle(editData) {
  return {
    types: [cons.EDIT, cons.EDIT_SUCCESS, cons.EDIT_FAIL],
    promises: (client) => client.post('/blog/desktop/article/editArticle', {
      data: {
        editData: editData,
      },
    }),
    atts: {
      editData: editData,
    },
  };
}

export function changeArticls(article, info, id, data, idx) {
  return {
    types: [cons.CHANGE, cons.CHANGE_SUCCESS, cons.CHANGE_FAIL],
    promises: (client) => client.post('/blog/desktop/article/changeArticls', {
      data: {
        article: article,
        info: info,
        id: id,
        data: data,
        idx: idx,
      },
    }),
    atts: {
      article: article,
      info: info,
      id: id,
      data: data,
      idx: idx,
    },
  };
}

export function getArticleDetail(id) {
  return {
    types: [cons.DETAIL, cons.DETAIL_SUCCESS, cons.DETAIL_FAIL],
    promises: (client) => client.get('/blog/desktop/article/getArticleDetail', {
      params: {
        id: id,
      },
    }),
    atts: {
      id: id,
    },
  };
}

export function deleteArticle(article, info, articleArray) {
  return {
    types: [cons.DELETE, cons.DELETE_SUCCESS, cons.DELETE_FAIL],
    promises: (client) => client.post('/blog/desktop/article/deleteArticle', {
      data: {
        article: article,
        info: info,
        articleArray: articleArray,
      },
    }),
    atts: {
      article: article,
      info: info,
      articleArray: articleArray,
    },
  };
}

