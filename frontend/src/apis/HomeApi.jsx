import API from "./Api";

async function getHomeInfo(token, yyyymm, success, fail) {
  try {
    const response = await API(token).get(`/static/${yyyymm}`)
    success(response);
  } catch (error) {
    fail(error);
  }
}

export {getHomeInfo}