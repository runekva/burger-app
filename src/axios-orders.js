import axios from 'axios';

const instance = axios.create ({
  baseURL : 'https://ruk-burger-app.firebaseio.com/'
}) ;

export default instance;