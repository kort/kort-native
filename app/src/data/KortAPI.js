import RestClient from 'react-native-rest-client';
import Config from '../constants/Config';

export default class KortAPI extends RestClient {
    constructor() {
    super(Config.API_URL);
  }

  verifyUser(tokenId) {
    return this.POST(Config.GOOGLE_VERIFY, { tokenId });
  }
 
}
