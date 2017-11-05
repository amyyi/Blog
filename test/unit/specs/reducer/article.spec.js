import {fromJS} from 'immutable';
import {article as cons} from 'src/redux/constants';
import reducer from 'src/redux/modules/article';
import editFavor from 'src/redux/modules/article';

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

  datils: [],
  editArticle: [],
  articles: [],
});

const editData = fromJS({
  id: 'food1',
  articleType: 'food',
  love: 'true',
  title: 'food1-cultures',
  likeCount: '30',
  content: 'Working like a ',
  clickCount: '50',
  editTime: '1501216230',
});

const articles = fromJS({
  articles: {
    food: {
      array: [
        {
          id: 'food1',
          articleType: 'food',
          love: 'true',
          title: 'food1-cultures',
          likeCount: '30',
          content: 'Working like a ',
          clickCount: '50',
          editTime: '1501216230',
        },
      ],
    },
    sport: {
      array: [
        {
          id: 'sport1',
          articleType: 'sport',
          love: 'true',
          title: 'food1-cultures',
          likeCount: '30',
          content: 'Working like a ',
          clickCount: '50',
          editTime: '1501216230',
        },
      ],
    },
  },
});

describe('redux/modules/article', () =>{

  it('has initialState', () => {
    expect(reducer()).toEqual(initialState);
  });

  it('沒有符合的type則回傳initialState', () => {
    const newState = reducer(initialState, { type: 'unknown' });
    const loadSuc = newState.get('article');

    expect(newState).toEqual(initialState);
    expect(loadSuc).toEqual(false);
  });

  it('editFavor load', () => {
    const editState = reducer(initialState, { type: cons.LOAD_FAVOR });
    const loadFavor = editState.get('loadFavor');

    expect(loadFavor).toEqual(true);
  });

  it('editFavor success', () => {
    const action = {
      type: cons.LOAD_FAVOR_SUCCESS,
      atts: {
        article: articles,
        info: 'food',
        loveId: 'food1',
        idx: '0',
      },
    };
    const editState = reducer(initialState, action);
    const loadFavor = editState.get('loadFavorSuc');

    expect(loadFavor).toEqual(true);
  });

  it('editFavor 沒找到相符合的id會回傳原有陣列不變更', () => {
    const action = {
      type: cons.LOAD_FAVOR_SUCCESS,
      atts: {
        article: articles,
        info: 'food',
        loveId: 'food2',
        idx: '0',
      },
    };
    const editState = reducer(initialState, action);
    const loadFavor = editState.get('loadFavorSuc');

    expect(loadFavor).toEqual(true);
  });

  it('editArticle load', () => {
    const editState = reducer(initialState, { type: cons.EDIT });
    const loadEdit = editState.get('edit');

    expect(loadEdit).toEqual(true);
  });

  it('editArticle success', () => {
    const action = {
      type: cons.EDIT_SUCCESS,
      atts: { editData: editData },
    };
    const editState = reducer(initialState, action);
    const editSuc = editState.get('editSuc');

    expect(editSuc).toEqual(true);
  });

  it('filterArticle success', () => {
    const action = {
      type: cons.FILTER_SUCCESS,
      atts: {
        searchData: {
          checkboxMultiple: ['food'],
          inputFilter: '1',
          keyWord: '',
        },
      },
    };
    const filterState = reducer(initialState, action);
    const filterSuc = filterState.get('filterSuc');

    expect(filterSuc).toEqual(true);
  });
});
