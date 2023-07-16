import List from "../pageFragments/List";

export default class ProfilePage {
  get storageInfo() {
    return cy.get("storageInfo");
  }

  get goodsList() {
    return new List("[data-cy=goodsList]");
  }

  get suppliesList() {
    return new List("[data-cy=suppliesList]");
  }

  get shelvesList() {
    return new List("[data-cy=shelvesList");
  }

  // Other data related to the eshop
  // ...
  // ...
}
