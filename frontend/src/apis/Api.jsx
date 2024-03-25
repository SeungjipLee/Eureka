import axios from "axios";

const DOMAIN = "https://j10e101.p.ssafy.io"

function API(token) {
  return axios.create({
    baseURL: DOMAIN + "/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
}

export default API