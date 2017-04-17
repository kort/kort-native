import SecretConfig from './SecretConfig';

const API_VERSION = 'v0.1';

export default {

  MAPBOX_ACCESS_TOKEN: SecretConfig.MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE_URL: SecretConfig.MAPBOX_STYLE_URL,
  MAPBOX_INITIAL_COORD_LATITUDE: 46.808337,
  MAPBOX_INITIAL_COORD_LONGITUDE: 9.839493,
  MAPBOX_INITIAL_ZOOM_LEVEL: 14,
  MAPBOX_ANNOTATION_SIZE: 30,

  API_URL: 'http://e2ad5d2d.ngrok.io',

  DEEP_LINK_URL: 'kortapp://payload?',

  GOOGLE: 'google',
  GOOGLE_IOS_CLIENT_ID: SecretConfig.GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID: SecretConfig.GOOGLE_WEB_CLIENT_ID,

  GOOGLE_VERIFY: '/google/verify',
  OSM_LOGIN: '/osm/login',

  USER_INFO: `/${API_VERSION}/users`,
  MISSIONS: `/${API_VERSION}/missions`,
  HIGHSCORE: `/${API_VERSION}/highscore`,
  ANSWER: `/${API_VERSION}/answer`,

};
