/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const fetcher = <T>(url: string) =>
  axios.get<T>(url).then((res) => res.data);
