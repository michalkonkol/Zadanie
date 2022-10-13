const TESTER_CREDENTIALS = {
  username: "tester",
  password: "4HZJJoaq2Q",
};

const cssUnitsRegex = /px|%|em|rem/g;

describe("form", () => {
  beforeEach(() => {
    cy.visit("/", {
      auth: TESTER_CREDENTIALS,
    });
  });
  it("test Login error handling", () => {
    cy.get("#username").type("dog");
    cy.get("#password").type("dog");
    cy.get(".submit-button").click();
    cy.get(".alert")
      .invoke("css", "font-size")
      .then((fontSize) => Number(fontSize.replace(cssUnitsRegex, "")))
      .should("be.equal", 16);
    cy.get(".alert")
      .invoke("css", "font-family")
      .then((fontFamily) => fontFamily)
      .should("contain", "Cabin");
    cy.get(".alert")
      .invoke("css", "background-color")
      .then((background) => background)
      .should("contain", "rgb(188, 58, 58)");
  });
  it("test label", () => {
    cy.get('label[for="username"]')
      .invoke("css", "font-size")
      .then((fontSize) => Number(fontSize.replace(cssUnitsRegex, "")))
      .should("be.equal", 14);
    cy.get('label[for="password"]')
      .invoke("css", "font-size")
      .then((fontSize) => Number(fontSize.replace(cssUnitsRegex, "")))
      .should("be.equal", 14);
  });
  const testData = [
    {
      username: "admin",
      password: "admin123",
    },
    {
      username: "cat",
      password: "cat123",
    },
    {
      username: "dog",
      password: "dog123",
    },
  ];
  testData.forEach(({ username, password }) => {
    it(`it tests ${username} credentials`, () => {
      cy.get("#username").type(username);
      cy.get("#password").type(password);
      cy.get(".submit-button").click();
    });
  });
  it("tests login form content", () => {
    cy.get("form.login-form").should("be.visible");
    cy.get("input#username").should("be.visible");
    cy.get("input#password").should("be.visible");
    cy.get("input.submit-button").should("be.visible");
    cy.get("p.password-recovery").should("be.visible");
  });
  it("checks if input has not placeholder", () => {
    cy.get("#username").invoke("attr", "placeholder").should("not.exist");
    cy.get("#password").invoke("attr", "placeholder").should("not.exist");
  });
  it("checks input fields background on change", () => {});
  ["1920x1200", "1440x900", "1366x768"].forEach((resolution) => {
    it(`test form placement on ${resolution} resolution`, () => {
      const [width, height] = resolution.split("x");
      cy.viewport(Number(width), Number(height));
      cy.visit("/", {
        auth: TESTER_CREDENTIALS,
      });
      cy.get("form.login-form")
        .then((formElement) => {
          const padding = 20;
          const position = formElement.position();
          return position.left + padding;
        })
        .should("gt", Number(width) / 2);
    });
  });
  it("input background color changes when user types", () => {
    cy.get("input#username")
      .type("testuser")
      .focus()
      .invoke("css", "background-color")
      .should("equal", "rgb(72, 72, 72)");
  });
});
