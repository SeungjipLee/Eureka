import API from "./Api";

async function getHomeInfo(token, yyyymm, success, fail) {
  try {
    const response = await API(token).get(`/static/${yyyymm}`);
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function getHomeOnlyPay(token, yyyymm) {
  return await API(token).get(`/pay/history?yyyymm=${yyyymm}`);
}

async function getCompare(token, success, fail) {
  try {
    const response = await API(token).get('/static/compare/consumption')
    success(response);
  } catch (err) {
    fail(err);
  }
}

export { getHomeInfo, getHomeOnlyPay, getCompare };
