import { populateType } from "../common/variables.js";

const setPopulate = ({ populationType }) => {
  return async (req, res, next) => {
    if (populationType === populateType.account) {
      req.populate = populateType.account;
    }
    if (populationType === populateType.transaction) {
      req.populate = populateType.transaction;
    }
    next();
  };
};
export default setPopulate;
