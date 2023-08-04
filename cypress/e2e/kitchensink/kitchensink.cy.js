describe("Kitchensink", function () {
  it("window", function () {
    cy.visit("https://example.cypress.io/commands/window");
    cy.window().should("have.property", "top");
    cy.document().should("have.property", "charset").and("eq", "UTF-8");
    cy.title().should("include", "Kitchen Sink");
  });
  it("quering", function () {
    cy.visit("https://example.cypress.io/commands/querying");
    cy.get("#query-btn").should("contain", "Button");

    cy.get(".query-btn").should("contain", "Button");
    cy.get('[data-test-id="test-example"]')
      .invoke("attr", "data-test-id")
      .should("equal", "test-example");

    // or you can get an element's CSS property
    cy.get('[data-test-id="test-example"]')
      .invoke("css", "position")
      .should("equal", "static");
    cy.get(".query-list").contains("bananas").should("have.class", "third");

    // we can pass a regexp to `.contains()`
    cy.get(".query-list").contains(/^b\w+/).should("have.class", "third");

    cy.get(".query-list").contains("apples").should("have.class", "first");
    cy.get(".query-form").within(() => {
      cy.get("input:first").should("have.attr", "placeholder", "Email");
      cy.get("input:last").should("have.attr", "placeholder", "Password");
    });
  });
  it("Traversal", function () {
    cy.visit("https://example.cypress.io/commands/traversal");
    cy.get(".traversal-breadcrumb")
      .children(".active")
      .should("contain", "Data");
    cy.get(".traversal-badge").closest("ul").should("have.class", "list-group");
    cy.get(".traversal-list>li").eq(1).should("contain", "siamese");
    cy.get(".traversal-nav>li").filter(".active").should("contain", "About");
    cy.get(".traversal-pagination")
      .find("li")
      .find("a")
      .should("have.length", 7);
    cy.get(".traversal-table td").first().should("contain", "1");
    cy.get(".traversal-buttons .btn").last().should("contain", "Submit");
    cy.get(".traversal-ul")
      .contains("apples")
      .next()
      .should("contain", "oranges");
    cy.get("#veggies").nextUntil("#nuts").should("have.length", 3);
    cy.get(".traversal-mark").parent().should("contain", "Morbi leo risus");
    cy.get(".traversal-cite").parents("div.well").should("have.class", "well");
    cy.get(".birds").find(".active").prev().should("contain", "Lorikeets");
    cy.get(".fruits-list").find(".third").prevAll().should("have.length", 2);
    cy.get(".traversal-pills .active").siblings().should("have.length", 2);
  });
  it("connector", function () {
    cy.visit("https://example.cypress.io/commands/connectors");
    cy.get(".connectors-div")
      .should("be.hidden")
      // call the jquery method 'show' on the 'div.container'
      .invoke("show")
      .should("be.visible");
  });
  it("action", function () {
    cy.visit("https://example.cypress.io/commands/actions");
    cy.get(".action-email")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
    cy.get(".action-focus")
      .focus()
      .should("have.class", "focus")
      .prev()
      .should("have.attr", "style", "color: orange;");
    cy.get(".action-blur")
      .type("About to blur")
      .blur()
      .should("have.class", "error")
      .prev()
      .should("have.attr", "style", "color: red;");
    cy.get(".action-clear")
      .type("Clear this text")
      .should("have.value", "Clear this text")
      .clear()
      .should("have.value", "");
    cy.get(".action-form").find('[type="text"]').type("HALFOFF");
    cy.get(".action-form")
      .submit()
      .next()
      .should("contain", "Your form has been submitted!");
    cy.get(".action-btn").click();

    // clicking in the center of the element is the default
    cy.get("#action-canvas").click();

    cy.get("#action-canvas").click("topLeft");
    cy.get("#action-canvas").click("top");
    cy.get("#action-canvas").click("topRight");
    cy.get("#action-canvas").click("left");
    cy.get("#action-canvas").click("right");
    cy.get("#action-canvas").click("bottomLeft");
    cy.get("#action-canvas").click("bottom");
    cy.get("#action-canvas").click("bottomRight");

    // .click() accepts a an x and y coordinate
    // that controls where the click occurs :)
    cy.get("#action-canvas")
      .click(80, 75)
      .click(170, 75)
      .click(80, 165)
      .click(100, 185)
      .click(125, 190)
      .click(150, 185)
      .click(170, 165);

    // click multiple elements by passing multiple: true
    cy.get(".action-labels>.label").click({ multiple: true });

    // Ignore error checking prior to clicking
    cy.get(".action-opacity>.btn").click({ force: true });
    cy.get(".action-div").dblclick().should("not.be.visible");
    cy.get(".action-input-hidden").should("be.visible");
    cy.get(".rightclick-action-div").rightclick().should("not.be.visible");
    cy.get(".rightclick-action-input-hidden").should("be.visible");
    // By default, .check() will check all
    // matching checkbox or radio elements in succession, one after another
    cy.get('.action-checkboxes [type="checkbox"]')
      .not("[disabled]")
      .check()
      .should("be.checked");

    cy.get('.action-radios [type="radio"]')
      .not("[disabled]")
      .check()
      .should("be.checked");

    // .check() accepts a value argument
    cy.get('.action-radios [type="radio"]')
      .check("radio1")
      .should("be.checked");

    // .check() accepts an array of values
    cy.get('.action-multiple-checkboxes [type="checkbox"]')
      .check(["checkbox1", "checkbox2"])
      .should("be.checked");

    // Ignore error checking prior to checking
    cy.get(".action-checkboxes [disabled]")
      .check({ force: true })
      .should("be.checked");

    cy.get('.action-radios [type="radio"]')
      .check("radio3", { force: true })
      .should("be.checked");
    // By default, .uncheck() will uncheck all matching
    // checkbox elements in succession, one after another
    cy.get('.action-check [type="checkbox"]')
      .not("[disabled]")
      .uncheck()
      .should("not.be.checked");

    // .uncheck() accepts a value argument
    cy.get('.action-check [type="checkbox"]')
      .check("checkbox1")
      .uncheck("checkbox1")
      .should("not.be.checked");

    // .uncheck() accepts an array of values
    cy.get('.action-check [type="checkbox"]')
      .check(["checkbox1", "checkbox3"])
      .uncheck(["checkbox1", "checkbox3"])
      .should("not.be.checked");

    // Ignore error checking prior to unchecking
    cy.get(".action-check [disabled]")
      .uncheck({ force: true })
      .should("not.be.checked");
    cy.get(".action-select").should("have.value", "--Select a fruit--");

    // Select option(s) with matching text content
    cy.get(".action-select").select("apples");
    // confirm the apples were selected
    // note that each value starts with "fr-" in our HTML
    cy.get(".action-select").should("have.value", "fr-apples");
    cy.get(".trigger-input-range")
      .invoke("val", 25)
      .trigger("change")
      .get("input[type=range]")
      .siblings("p")
      .should("have.text", "25");
  });

  it("viewport", function () {
    cy.visit("https://example.cypress.io/commands/viewport");
    cy.get("#navbar").should("be.visible");
    cy.viewport(320, 480);

    // the navbar should have collapse since our screen is smaller
    cy.get("#navbar").should("not.be.visible");
    cy.get(".navbar-toggle").should("be.visible").click();
    cy.get(".nav").find("a").should("be.visible");

    // lets see what our app looks like on a super large screen
    cy.viewport(2999, 2999);

    // cy.viewport() accepts a set of preset sizes
    // to easily set the screen to a device's width and height

    // We added a cy.wait() between each viewport change so you can see
    // the change otherwise it is a little too fast to see :)

    cy.viewport("macbook-15");
    cy.wait(200);
    cy.viewport("macbook-13");
    cy.wait(200);
    cy.viewport("macbook-11");
    cy.wait(200);
    cy.viewport("ipad-2");
    cy.wait(200);
    cy.viewport("ipad-mini");
    cy.wait(200);
    cy.viewport("iphone-6+");
    cy.wait(200);
    cy.viewport("iphone-6");
    cy.wait(200);
    cy.viewport("iphone-5");
    cy.wait(200);
    cy.viewport("iphone-4");
    cy.wait(200);
    cy.viewport("iphone-3");
    cy.wait(200);

    // cy.viewport() accepts an orientation for all presets
    // the default orientation is 'portrait'
    cy.viewport("ipad-2", "portrait");
    cy.wait(200);
    cy.viewport("iphone-4", "landscape");
    cy.wait(200);
  });
  it("navigation", function () {
    cy.visit("https://example.cypress.io/commands/navigation");
    cy.location("pathname").should("include", "navigation");

    cy.go("back");
    cy.location("pathname").should("not.include", "navigation");

    cy.go("forward");
    cy.location("pathname").should("include", "navigation");

    // clicking back
    cy.go(-1);
    cy.location("pathname").should("not.include", "navigation");

    // clicking forward
    cy.go(1);
    cy.location("pathname").should("include", "navigation");

    cy.reload();
  });
  it("assertion", function () {
    cy.visit("https://example.cypress.io/commands/assertions");
    cy.get(".assertion-table")
      .find("tbody tr:last")
      .should("have.class", "success")
      .find("td")
      .first()
      // checking the text of the  element in various ways
      .should("have.text", "Column content")
      .should("contain", "Column content")
      .should("have.html", "Column content")
      // chai-jquery uses "is()" to check if element matches selector
      .should("match", "td")
      // to match text content against a regular expression
      // first need to invoke jQuery method text()
      // and then match using regular expression
      .invoke("text")
      .should("match", /column content/i);

    // a better way to check element's text content against a regular expression
    // is to use "cy.contains"
    // https://on.cypress.io/contains
    cy.get(".assertion-table")
      .find("tbody tr:last")
      // finds first  element with text content matching regular expression
      .contains("td", /column content/i)
      .should("be.visible");
    cy.get(".assertions-link")
      .should("have.class", "active")
      .and("have.attr", "href")
      .and("include", "cypress.io");
  });
  it("aliases", function () {
    cy.visit("https://example.cypress.io/commands/aliasing");
    cy.get(".as-table")
      .find("tbody>tr")
      .first()
      .find("td")
      .first()
      .find("button")
      .as("firstBtn");

    // To reference the alias we created, we place an
    // @ in front of its name
    cy.get("@firstBtn").click();

    cy.get("@firstBtn")
      .should("have.class", "btn-success")
      .and("contain", "Changed");
  });
  it("waiting", function () {
    cy.visit("https://example.cypress.io/commands/waiting");
    cy.get(".wait-input1").type("Wait 1000ms after typing");
    cy.wait(1000);
    cy.get(".wait-input2").type("Wait 1000ms after typing");
    cy.wait(1000);
    cy.get(".wait-input3").type("Wait 1000ms after typing");
    cy.wait(1000);
  });
  it("request", function () {
    cy.visit("https://example.cypress.io/commands/network-requests");
    cy.request("https://jsonplaceholder.cypress.io/comments").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(500);
        expect(response).to.have.property("headers");
        expect(response).to.have.property("duration");
      }
    );
    let message = 'whoa, this comment does not exist'

    // Listen to GET to comments/1
    cy.intercept('GET', '**/comments/*').as('getComment')
    
    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.network-btn').click()
    
    // https://on.cypress.io/wait
    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])
    
    // Listen to POST to comments
    cy.intercept('POST', '**/comments').as('postComment')
    
    // we have code that posts a comment when
    // the button is clicked in scripts.js
    cy.get('.network-post').click()
    cy.wait('@postComment').should(({ request, response }) => {
      expect(request.body).to.include('email')
      expect(request.headers).to.have.property('content-type')
      expect(response && response.body).to.have.property('name', 'Using POST in cy.intercept()')
    })
    
    // Stub a response to PUT comments/ ****
    cy.intercept({
      method: 'PUT',
      url: '**/comments/*',
    }, {
      statusCode: 404,
      body: { error: message },
      headers: { 'access-control-allow-origin': '*' },
      delayMs: 500,
    }).as('putComment')
    
    // we have code that puts a comment when
    // the button is clicked in scripts.js
    cy.get('.network-put').click()
    
    cy.wait('@putComment')
    
    // our 404 statusCode logic in scripts.js executed
    cy.get('.network-put-comment').should('contain', message)
  });
  it("connector", function () {
    cy.visit("https://example.cypress.io/commands/connectors");
    cy.get('.connectors-each-ul>li')
  .each(function($el, index, $list){
    console.log($el, index, $list)
  })
  cy.get('.connectors-its-ul>li')
  // calls the 'length' property returning that value
  .its('length')
  .should('be.gt', 2)
  cy.get('.connectors-div').should('be.hidden')
  // call the jquery method 'show' on the 'div.container'
  .invoke('show')
  .should('be.visible')
  const arr = ['foo', 'bar', 'baz']

cy.wrap(arr).spread(function(foo, bar, baz){
  expect(foo).to.eq('foo')
  expect(bar).to.eq('bar')
  expect(baz).to.eq('baz')
})
cy.get('.connectors-list>li').then(function($lis){
  expect($lis).to.have.length(3)
  expect($lis.eq(0)).to.contain('Walk the dog')
  expect($lis.eq(1)).to.contain('Feed the cat')
  expect($lis.eq(2)).to.contain('Write JavaScript')
})
cy.wrap(1)
  .then((num) => {
    expect(num).to.equal(1)

    return 2
  })
  .then((num) => {
    expect(num).to.equal(2)
  })
  cy.wrap(1)
  .then((num) => {
    expect(num).to.equal(1)
    // note that nothing is returned from this callback
  })
  .then((num) => {
    // this callback receives the original unchanged value 1
    expect(num).to.equal(1)
  })
  cy.wrap(1)
  .then((num) => {
    expect(num).to.equal(1)
    // note how we run a Cypress command
    // the result yielded by this Cypress command
    // will be passed to the second ".then"
    cy.wrap(2)
  })
  .then((num) => {
    // this callback receives the value yielded by "cy.wrap(2)"
    expect(num).to.equal(2)
  })
   
  });
  it.only("misc", function () {
    cy.visit("https://example.cypress.io/commands/misc");
    cy.get('.misc-form').find('#name').click()
cy.focused().should('have.id', 'name')

cy.get('.misc-form').find('#description').click()
cy.focused().should('have.id', 'description')
cy.wrap({foo: 'bar'})
  .should('have.property', 'foo')
  .and('include', 'bar')
   
  });
});
