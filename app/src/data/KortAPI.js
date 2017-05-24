import RestClient from 'react-native-rest-client';
import ReactNativeI18n from 'react-native-i18n';
import Config from '../constants/Config';

export default class KortAPI extends RestClient {

    constructor(authToken) {
    super(Config.API_URL, {
      headers: {
        Authorization: `${authToken}`
      },
      simulatedDelay: 2000
    });
  }
  
  verifyUser(tokenId) {
    return this.POST(Config.GOOGLE_VERIFY, { tokenId });
  }

  getUserinfo(userId) {
    console.log(`${Config.USER_INFO}/${userId}`);
    return this.GET(`${Config.USER_INFO}/${userId}`);
  }

  getMissions(lat, lon, radius) {
    return this.GET(Config.MISSIONS, { lat, lon, radius, lang: this.getLocale() });
  }

  getMissionGeometry(osmType, osmId) {
    return this.GET(`${Config.MISSIONS}/osm/${osmType}/${osmId}`);
  }

  sendSolution(schemaId, errorId, solution) {
    return this.POST(`${Config.MISSIONS}/${schemaId}/${errorId}/solution`, 
      { solution, lang: this.getLocale() });
  }

  getHighscore(type, limit) {
    console.log(type, limit);
    return this.GET(Config.HIGHSCORE, { type, limit });
  }

  getAchievements(userId) {
    return this.GET(Config.ACHIEVEMENTS, { user_id: userId, lang: this.getLocale() });
  }

  getLocale() {
    return ReactNativeI18n.locale;
  }
 
}
