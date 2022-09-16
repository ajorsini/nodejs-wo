var category = function category(key) {

  // Write the Logic here
    this.cat = { PL: "Personal Loan",
                 VL: "Vehicle Loan",
                 EL: "Education Loan",
                 HL: "Home Loan" }
    return this.cat[key.toUpperCase()];

  };

  module.exports = {
    category: category
  };
