describe("Login page", function () {
  

  it("With valid credentials", function () {
    cy.visit("https://www.saucedemo.com/");
    cy.title().should("eq", "Swag Labs");
    cy.login("standard_user","secret_sauce")

    // cy.get('[data-test="username"]').type("standard_user");
    // cy.get('[data-test="password"]').type("secret_sauce");
    // cy.get('[data-test="login-button"]').should("be.visible").click();
    cy.url().should("include", "inventory");
  });
  it("With incorrect username", function () {
    cy.visit("https://www.saucedemo.com/");
    cy.title().should("eq", "Swag Labs");
    cy.login("professional_user","secret_sauce")

    // cy.get('[data-test="username"]').type("professional_user");
    // cy.get('[data-test="password"]').type("secret_sauce");
    // cy.get('[data-test="login-button"]').should("be.visible").click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
  it("With invalid password", function () {
    cy.visit("https://www.saucedemo.com/");
    cy.title().should("eq", "Swag Labs");
    cy.login("standard_user","secret")
    

    // cy.get('[data-test="username"]').type("standard_user");
    // cy.get('[data-test="password"]').type("secret");
    // cy.get('[data-test="login-button"]').should("be.visible").click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
  it("Blocked account", function () {
    cy.visit("https://www.saucedemo.com/");
    cy.title().should("eq", "Swag Labs");
    cy.login("locked_out_user","secret_sauce")

    // cy.get('[data-test="username"]').type("locked_out_user");
    // cy.get('[data-test="password"]').type("secret_sauce");
    // cy.get('[data-test="login-button"]').should("be.visible").click();
    cy.get(".error-message-container ").should(
      "contain",
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});

describe("Product page", () => {
  it("Checking all six items are present", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.title().should("eq", "Swag Labs");
    cy.login("standard_user","secret_sauce")

    // cy.get('[data-test="username"]').type("standard_user");
    // cy.get('[data-test="password"]').type("secret_sauce");
    // cy.get('[data-test="login-button"]').should("be.visible").click();
    cy.url().should("include", "inventory");
    cy.get(".inventory_list").children().should("have.length", "6");
  });

  it("Adding four items to cart", () => {
    cy.get("#add-to-cart-sauce-labs-backpack")
      .should("contain.text", "Add to cart")
      .click();
    cy.get("#add-to-cart-sauce-labs-bike-light")
      .should("contain.text", "Add to cart")
      .click();
    cy.get("#add-to-cart-sauce-labs-bolt-t-shirt")
      .should("contain.text", "Add to cart")
      .click();
    cy.get("#add-to-cart-sauce-labs-fleece-jacket")
      .should("contain.text", "Add to cart")
      .click();

    cy.get(".shopping_cart_badge").should("contain.text", "4");
  });
  it("Removing one element from cart", () => {
    cy.get("#remove-sauce-labs-fleece-jacket")
      .should("contain.text", "Remove")
      .click();

    cy.get(".shopping_cart_badge").should("contain.text", "3");
  });
  it("Checking the sort option", () => {
    cy.get('[data-test="product_sort_container"]').select("Name (Z to A)");
    cy.get(".inventory_list")
      .children()
      .first()
      .should("contain", "Test.allTheThings() T-Shirt (Red)");
    cy.get(".inventory_list")
      .children()
      .last()
      .should("contain", "Sauce Labs Backpack");
  });
  it("Checking three items are added to cart or not", () => {
    cy.get(".shopping_cart_badge").should("contain.text", "3");
  });
});
describe("Cart page", () => {
  it("Verifying three quantity is present", () => {
    cy.get(".shopping_cart_badge").click();
    cy.get(".inventory_item_name").should("have.length", "3");
    // cy.get('.inventory_item_name').first().should('contain','Sauce Labs Backpack').and('contain.text','1').and('contain.text','29.99')
    // cy.get('.inventory_item_name').eq(1).should('contain','Sauce Labs Bike Light').and('contain.text','1').and('contain.text','9.99')
    // cy.get('.inventory_item_name').last().should('contain','Sauce Labs Bolt T-Shirt').and('contain.text','1').and('contain.text','15.99')
  });
  it("Checking qty and price of each item", () => {
    cy.get(".item_pricebar").as("price");
    cy.get(".cart_quantity").as("qty");
    cy.get(".inventory_item_name").as("name");
    cy.get("@price").first().should("contain.text", "$29.99");
    cy.get("@qty").first().should("contain.text", "1");
    cy.get("@name").first().should("contain.text", "Sauce Labs Backpack");
    cy.get("@price").eq(1).should("contain.text", "$9.99");
    cy.get("@qty").eq(1).should("contain.text", "1");
    cy.get("@name").eq(1).should("contain.text", "Sauce Labs Bike Light");
    cy.get("@price").last().should("contain.text", "$15.99");
    cy.get("@qty").last().should("contain.text", "1");
    cy.get("@name").last().should("contain.text", "Sauce Labs Bolt T-Shirt");
  });
  it("Removing one element from the cart", () => {
    cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]')
      .should("be.visible")
      .click();
  });
  it("Verifying the cart is updated after removing element", () => {
    cy.get(".inventory_item_name").should("have.length", "2");
    cy.get(".shopping_cart_badge").should("contain.text", "2");
  });
});
describe("Checkout Page", () => {
  it("Verifying directed to checkout page or not", () => {
    cy.get("#checkout").should("contain.text", "Checkout").click();
    cy.url().should("include", "checkout");
  });
  it("Entering Your Information", () => {
    cy.get("#first-name").type("Sam");
    cy.get("#last-name").type("Ryann");
    cy.get("#postal-code").type("401209");
    cy.get("#continue").should("be.visible").click();
  });
});
describe("Checkout Overview", () => {
  it("Verifying total no of item", () => {
    cy.get(".inventory_item_name").should("have.length", "2");
  });
  it("Verifying description,Qty and Price", () => {
    cy.get(".item_pricebar").as("price");
    cy.get(".cart_quantity").as("qty");
    cy.get(".inventory_item_name").as("name");
    cy.get(".inventory_item_desc").as("desc");
    cy.get("@price").first().should("contain.text", "$29.99");
    cy.get("@qty").first().should("contain.text", "1");
    cy.get("@desc")
      .first()
      .should(
        "contain.text",
        "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."
      );
    cy.get("@name").first().should("contain.text", "Sauce Labs Backpack");
    cy.get("@price").last().should("contain.text", "$9.99");
    cy.get("@qty").last().should("contain.text", "1");
    cy.get("@name").last().should("contain.text", "Sauce Labs Bike Light");
    cy.get("@desc")
      .last()
      .should(
        "contain.text",
        "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included."
      );
  });
  it("Verifying payment information", () => {
    cy.get(".summary_value_label").should("contain.text", "SauceCard #31337");
  });
  it("Verifying shipping information", () => {
    cy.get(".summary_value_label").should(
      "contain.text",
      "Free Pony Express Delivery!"
    );
  });
  it("Verifying the item total", () => {
    cy.get(".summary_subtotal_label").should("contain.text", "$39.98");
  });
  it("Verifying Tax Amount", () => {
    cy.get(".summary_tax_label").should("contain.text", "$3.20");
  });
  it("Verifying total amount", () => {
    cy.get(".summary_total_label").should("contain.text", "$43.18");
  });
  it("Finish", () => {
    cy.get("#finish").should("be.visible").click();
    cy.url().should("include", "complete");
    cy.get(".complete-header").should(
      "contain.text",
      "Thank you for your order!"
    );
    cy.get(".complete-text").should(
      "contain.text",
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
    cy.get("#back-to-products").should("be.visible").click();
  });
});
describe("Hamburger icon", () => {
  it("Opening and closing the Hamburger menu", () => {
    cy.get("#react-burger-menu-btn").should("be.visible").click();
    cy.get("#react-burger-cross-btn").should("be.visible").click();
  });
  it("Verifying the dropdown of Hamburger menu", () => {
    cy.get("#react-burger-menu-btn").should("be.visible").click();
    cy.get(".bm-item-list").should("be.visible");
    // cy.get("#about_sidebar_link").should("have.class", "bm-item").click();
    // cy.get(".MuiTypography-body1","{ timeout: 20000 }").should(
    //   'contain',
    //   'The world relies on your code. Test on thousands of different device, browser, and OS configurations–anywhere, any time.'
    // );
    cy.logout()
    // cy.get("#logout_sidebar_link").should('have.class', 'bm-item').click();
    cy.url().should('eq','https://www.saucedemo.com/')
    
  });
});
