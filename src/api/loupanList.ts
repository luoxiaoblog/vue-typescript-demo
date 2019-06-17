import axios from './request';

class LoupanListApi {
  queryByParentCode(params: any): any {
    return axios.post('/jjrplus/city/queryByParentCode', params);
  }

  queryDicList(params: any): any {
    return axios.post('/jjrplus/community/queryDicList', params);
  }

  cascadeSearchCom(params: any): any {
    return axios.post('/jjrplus/community/cascadeSearchCom', params);
  }
}

export default new LoupanListApi();
