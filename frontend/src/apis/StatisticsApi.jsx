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

async function getMyBenefitAmountOfCategory(token, yyyymm, success, fail) {
  try {
    const response = await API(token).get(`/static/${yyyymm}/discount`);
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function getMyTop3Cards(token, yyyymm, success, fail) {
  try {
    const response = await API(token).get(`/static/${yyyymm}/best-card`);
    success(response);
  } catch (error) {
    fail(error);
  }
}

async function getMyTags(token, success, fail) {
  try {
    const response = await API(token).get(`/tag/list`);
    success(response);
  } catch (error) {
    fail(error);
  }
}

export {
  getMyTotalBenefitAmount,
  getMyConsumptionOfCategoryAmount,
  getMyBenefitAmountOfCategory,
  getMyTop3Cards,
  getMyTags,
};
