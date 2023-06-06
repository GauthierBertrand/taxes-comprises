const App = {
  /* Méthode init de l'app */
  init: function () {
    TaxesCalculator.init();
  },
};
//Start the script after the page was entirely loaded
document.addEventListener("DOMContentLoaded", App.init);
