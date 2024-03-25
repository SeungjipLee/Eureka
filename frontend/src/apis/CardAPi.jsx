import API from "./Api";

async function getOwnCard(token, success, fail) {
  try {
    const response = await API(token).get('/card/list/own')
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function getPayCard(token, success, fail) {
  try {
    const response = await API(token).get('/ucard/list')
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
    const response = await API(token).post('/card/regist', data)
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function deletePayCard(token, cardId, success, fail) {
  try {
    const response = await API(token).delete(`/card/pay/${cardId}`)
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function deleteOwnCard(token, cardId, success, fail) {
  try {
    const response = await API(token).delete(`/card/own/${cardId}`)
    success(response);
  } catch (error) {
    fail(error);
  }
}


export { getOwnCard, addOwnCard, getMyCardList, getPayCard, addPayCard, deleteOwnCard, deletePayCard }