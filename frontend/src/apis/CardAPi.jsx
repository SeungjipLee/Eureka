import API from "./Api";

async function getOwnCard(token, success, fail) {
  try {
    const response = await API(token).get('/ucard/list/own')
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function getPayCard(token, success, fail) {
  try {
    const response = await API(token).get('/ucard/list/pay')
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

async function getCardDetail(token, userCardId, success, fail) {
  try {
    const response = await API(token).get(`/ucard/cardInfo/${userCardId}`)
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function getCardHistory(token, userCardId, yyyymm, success, fail) {
  try {
    const response = await API(token).post(`/ucard/list/pay?userCardId=${userCardId}&yyyymm=${yyyymm}`)
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function cardPay(token, data, success, fail) {
  try {
    const response = await API(token).post('/pay/request', data)
    success(response);
  } catch (error) {
    fail(error);
  }
}


export { getOwnCard, addOwnCard, getMyCardList, getPayCard, addPayCard, getCardDetail, cardPay, getCardHistory }