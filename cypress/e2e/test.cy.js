import ProfilePage from "../pageObjects/ProfilePage";

describe("Test spec", () => {
  // Environment variables
  const managerUser1 = Cypress.env("managerUser1");
  const warehouseWorkerUser1 = Cypress.env("warehouseWorker1");
  const fixtureName = Cypress.env("fixtureName");

  // Page objects
  const profilePage = new ProfilePage();

  beforeEach(() => {
    // Retrieving data
    cy.fixture(`${fixtureName}/goods`).as("goods");
    cy.fixture(`${fixtureName}/shelves`).as("shelves");
    cy.fixture(`${fixtureName}/supplies`).as("supplies");
  });

  it("Receiving process", () => {
    // Login to the app as [Manager]
    cy.loginByApi(managerUser1);

    // Working with [Goods List]
    profilePage.goodsList.this.should("be.visible");
    // Verify values in each row of [Goods List]
    cy.get("@goods").then((goodsData) => {
      goodsData.goods.forEach((good, index) => {
        profilePage.goodsList.getRowByIndex(index).should("contain", good.id);
        profilePage.goodsList.getRowByIndex(index).should("contain", good.name);
      });
    });
  });

  it("Shipping process", () => {
    // Login to the app as [Warehouse Worker]
    cy.loginByApi(warehouseWorkerUser1);

    // Working with [Shelves List]
    profilePage.shelvesList.this.should("be.visible");
    // Verify values in each row of [Shelves List]
    cy.get("@shelves").then((shelvesData) => {
      shelvesData.shelves.forEach((shelf, index) => {
        profilePage.shelvesList.getRowByIndex(index).should("contain", shelf.capacity);
        profilePage.shelvesList.getRowByIndex(index).should("contain", shelf.name);
      });
    });

    // Working with [Supplies List]
    profilePage.suppliesList.this.should("be.visible");
    // Verify values in each row of [Supplies List]
    cy.get("@supplies").then((suppliesData) => {
      suppliesData.supplies.forEach((supply, index) => {
        profilePage.suppliesList.getRowByIndex(index).should("contain", supply.name);
      });
    });
  });
});
