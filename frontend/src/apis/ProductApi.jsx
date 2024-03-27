import API from "./Api";

async function getProductCardListByCompany(token, id, success, fail) {
  try {
    const response = await API(token).get(`/card/prod/comp/list/${id}`);
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function getProductCardDetail(token, id, success, fail) {
  try {
    const response = await API(token).get(`/card/prod/detail/${id}`);
    success(response);
  } catch (error) {
    fail(error);
  }
}

export { getProductCardListByCompany, getProductCardDetail };
