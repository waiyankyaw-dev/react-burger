import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-81f52.firebaseio.com/'
});

export default instance;