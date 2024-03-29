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

// 등록 결제카드 불러오기
async function getMyPaymentCards(token, yyyymm, success, fail) {
  try {
    const response = await API(token).get(`/ucard/list/pay?yyyymm=${yyyymm}`);
    success(response);
  } catch (error) {
    fail(error);
  }
}

export { getProductCardListByCompany, getProductCardDetail, getMyPaymentCards };
