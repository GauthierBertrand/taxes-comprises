const App = {

  endpoint: "https://api.freecurrencyapi.com/v1/latest?",
  key: "apikey=icT1TtWAyeXuUdbsCdLHWjqOwTEwjp3mxFw1m94y",
  currencies: "&currencies=EUR%2CUSD%2CGBP%2CJPY%2CCNY",
  base: "&base_currency=CAD",

  /* Méthode init de l'app */
  init: function () {

    fetch(App.endpoint + App.key + App.currencies + App.base)
      .then((response) => {
        return response.json();
      })
      .then((currencies) => {
        let data = currencies.data;
        TaxesCalculator.init(data);
      })
      .catch((e) => {
        alert(
          "Un problème est survenu avec la récupération des taux de change"
        );
      });
  },
};

//Start the script after the page was entirely loaded
document.addEventListener("DOMContentLoaded", App.init);
