import axios from 'axios';

const instance = axios.create({
  baseURL: "https://burger-react-app-dd954.firebaseio.com"
});

export default instance