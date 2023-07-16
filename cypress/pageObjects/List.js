export default class List {
  constructor(dataCyTag) {
    this.dataCyTag = dataCyTag;
  }

  get this() {
    return cy.get(this.dataCyTag);
  }

  getRowByIndex = (index) => {
    // Implementation of getting [List Row]
    return this.this.eq(index);
  };
}
