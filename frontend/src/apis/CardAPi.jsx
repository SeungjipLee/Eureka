import API from "./Api";

async function getOwnCard(token, success, fail) {
  try {
    const response = await API(token).get('/ucard/list/own')
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function getPayCard(token, yyyymm, success, fail) {
  try {
    const response = await API(token).get(`/ucard/list/pay?yyyymm=${yyyymm}`)
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function getMyCardList(token, data, success, fail) {
  try {
    const response = await API(token).post('/ucard/list/mydata', data)
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function addOwnCard(token, data, success, fail) {
  try {
    const response = await API(token).post('/ucard/regist', data)
    success(response);
  } catch (error) {
    fail(error);
  }
}


async function addPayCard(token, data, success, fail) {
  try {
    const response = await API(token).post('/ucard/regist/pay', data)
    success(response);
  } catch (error) {
    fail(error);
  }
}

function getCardDetail(token, userCardId) {
  return API(token).get(`/ucard/cardInfo/${userCardId}`);
}

async function getCardHistory(token, userCardId, yyyymm) {
  return API(token).post(`/ucard/list/pay?userCardId=${userCardId}&yyyymm=${yyyymm}`)
}

async function cardPay(token, data, success, fail) {
  try {
    const response = await API(token).post('/pay/request', data)
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function proceedPay(token, data, success, fail) {
  try {
    const response = await API(token).post('/pay/approve', data)
    success(response);
  } catch (error) {
    fail(error);
  }
}

export { getOwnCard, addOwnCard, getMyCardList, getPayCard, addPayCard, getCardDetail, cardPay, getCardHistory, proceedPay }