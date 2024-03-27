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
    const response = await API(token).get('/ucard/list/1')
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


export { getOwnCard, addOwnCard, getMyCardList, getPayCard, addPayCard, }