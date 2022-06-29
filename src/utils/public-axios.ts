import axios from 'axios';
import { baseUrl } from './helper';

const publicAxios = axios.create({
  baseURL: `${baseUrl}/api`,
});

export default publicAxios;
