import API from "./Api";

async function getMyTotalBenefitAmount(token, yyyymm, success, fail) {
  try {
    const response = await API(token).get(`/static/${yyyymm}`);
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function getMyConsumptionOfCategoryAmount(token, yyyymm, success, fail) {
  try {
    const response = await API(token).get(`/static/${yyyymm}/consumption`);
    success(response);
  } catch (error) {
    fail(error);
  }
}

export {
  getMyTotalBenefitAmount,getMyConsumptionOfCategoryAmount
};