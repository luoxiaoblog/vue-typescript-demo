import axios from './request';

class LoupanDetailApi {
  getDicDetail(params: any): any {
    return axios.post('/jjrplus/community/getDicDetail', params);
  }
}

export default new LoupanDetailApi();
