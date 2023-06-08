const TaxesCalculator = {
  /**
   * Calcul of the price with taxes and display result
   * @param {*} event
   */
  handleCalc: function (event) {
    let montantHt = document.getElementById("montantHt");

    let ttc =
      Math.round(
        ((parseFloat(montantHt.value) * parseFloat(event.target.value)) / 100 +
          parseFloat(montantHt.value)) *
          100
      ) / 100;
    console.log(ttc);

    //retrive the parent display result div
    let parentDiv = document.getElementById("radios");

    // display result div creation
    let divElement = document.createElement("div");

    //id set for display result div
    divElement.setAttribute("id", "result");

    //Animation for a smooth apparition for the display result div
    divElement.animate([{ opacity: 0 }, { opacity: 0.7 }], 950);

    //Remove the display result div if exist
    if (document.getElementById("result")) {
      document.getElementById("result").remove();
    }

    // if ttc not exist place a message else place result
    if (!ttc) {
      divElement.textContent =
        "Veuillez entrer un montant hors taxes puis sélectionner une région.";
    } else {
      divElement.textContent = "Total = " + ttc + " $";
    }

    //place the display result div in dom
    parentDiv.before(divElement);
  },

  init: function () {
    //place an eventLisner on every radio button with a loop
    test = document.getElementsByClassName("taxe-select");

    for (let i = 0; i < test.length; i++) {
      test[i].addEventListener("click", TaxesCalculator.handleCalc);
    }
  },
};
