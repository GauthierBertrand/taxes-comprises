const TaxesCalculator = {
  data: null,
  currency: null,
  rate: null,
  ttc: null,

  /**
   * Calcul of the price with taxes and display result
   * @param {*} event
   */
  handleCalc: function (event) {

    let montantHt = document.getElementById("montantHt");

    TaxesCalculator.ttc =
      Math.round(
        ((parseFloat(montantHt.value) * parseFloat(event.target.value)) / 100 +
          parseFloat(montantHt.value)) *
          100
      ) / 100;

    //retrive the parent display result div
    let parentDiv = document.getElementById("radios");

    // display result div creation
    let divElement = document.createElement("div");
    let conversion = document.createElement("button");
    conversion.setAttribute("class", "taxe-select btn btn-light");
    conversion.setAttribute("id", "conversionButton");
    conversion.addEventListener("click", TaxesCalculator.HandleConverter);
    conversion.innerHTML = "conversion " + TaxesCalculator.currency;

    //id set for display result div
    divElement.setAttribute("id", "result");

    //Animation for a smooth apparition for the display result div
    divElement.animate([{ opacity: 0 }, { opacity: 0.7 }], 200);

    //Remove the display result div if exist
    if (document.getElementById("result")) {
      document.getElementById("result").remove();
    }

    // if ttc not exist place a message else place result
    if (!TaxesCalculator.ttc) {
      divElement.textContent =
        "Veuillez entrer un montant hors taxes puis sélectionner une région.";
    } else {
      divElement.textContent = "Total = " + TaxesCalculator.ttc + " $";
    }

    //place the display result div in dom
    divElement.append(conversion);
    parentDiv.before(divElement);
  },

  /**
   *Set currency on converter button
   * @param {*} event
   */
  handleGetCurrency: function (event) {

    let button = document.getElementById("conversionButton");

    TaxesCalculator.currency = event.currentTarget.value;

    if (button) {
      button.innerHTML = "conversion " + TaxesCalculator.currency;
    }
  },

  /**
   * Calcul of amount in the selected currency
   * @param {*} event
   */
  HandleConverter: function (event) {

    rate = TaxesCalculator.data;

    //TaxesCalculator.currency is the key to retrive rate in data
    result =
      Math.round(
        parseFloat(TaxesCalculator.ttc) *
          parseFloat(rate[TaxesCalculator.currency]) *
          100
      ) / 100;

    //Set the result in the button
    button = event.currentTarget;
    if (result === NaN) {
      button.innerHTML = "conversion " + TaxesCalculator.currency;
    }
    if (!result) {
      button.innerHTML = "conversion " + TaxesCalculator.currency;
    } else {
      button.innerHTML = result + " " + TaxesCalculator.currency;
    }
  },

  init: function (data) {
    
    //Set properties on initialization
    TaxesCalculator.data = data;
    TaxesCalculator.rate = TaxesCalculator.data[TaxesCalculator.currency];
    TaxesCalculator.currency = "EUR";

    //place an eventLisner on every radio button with a loop
    test = document.getElementsByClassName("taxe-select");

    for (let i = 0; i < test.length; i++) {
      test[i].addEventListener("click", TaxesCalculator.handleCalc);
    }
    let currencies = document.getElementById("currencies");
    currencies.addEventListener("change", TaxesCalculator.handleGetCurrency);
  },
};
