import axios from "@/gateway/backendapi";
import store from "../../store/store";

let converter = {
  async currencyConverter(amount, fromCurrencyRate, toDestinationCurrencyRate) {
    let currencyRate = store.getters.getRates;
    let propertyArr = Object.keys(currencyRate);
    let valueArr = Object.values(currencyRate);
    let fromIndex = propertyArr.indexOf(fromCurrencyRate);
    let fromRate = valueArr[fromIndex];
    let toIndex = propertyArr.indexOf(toDestinationCurrencyRate);
    let toRate = valueArr[toIndex];
    let result = (amount / fromRate) * toRate;
    console.log(currencyRate);
    return result;
  },
  async convertCurrencyTo(amount, fromCurrencyRate, toDestinationCurrencyRate) {
    let currencyRate = [];
    if (store.getters.getRates) {
      currencyRate = store.getters.getRates;
    } else {
      currencyRate = await this.conversionData();
    }
    let propertyArr = Object.keys(currencyRate);
    let valueArr = Object.values(currencyRate);
    let fromIndex = propertyArr.indexOf(fromCurrencyRate);
    let fromRate = valueArr[fromIndex];
    let toIndex = propertyArr.indexOf(toDestinationCurrencyRate);
    let toRate = valueArr[toIndex];
    let result = (amount / fromRate) * toRate;
    console.log(currencyRate);
    return result;
  },

  conversionData: {},

  getConversionData() {
    let vm = this;
    return new Promise((resolve, reject) => {
      if (vm.conversionData.usdngn) {
        resolve(vm.conversionData);
      } else {
        axios
          .get("/fxRates")
          .then((res) => {
            console.log(res, "Blah");
            vm.conversionData = res.data;
            resolve(res.data);
          })
          .catch((err) => {
            if (err.response) {
              reject(err.response);
            } else {
              reject(err);
            }
          });
      }
    });
  },
};

export default converter;
