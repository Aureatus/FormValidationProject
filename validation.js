function showError(element, elementError) {
  const elementText = element.parentElement.htmlFor;
  let a_or_an = "a";
  if (element.parentElement.htmlFor === "email") {
    a_or_an = "an";
  }
  if (element.validity.valueMissing) {
    elementError.textContent = `You need to enter ${
      a_or_an + " " + elementText
    }`;
  }
  if (element.validity.patternMismatch) {
    if (element.parentElement.htmlFor === "zip-code") {
      elementError.textContent =
        "You need to enter a correctly formatted Zip-Code.";
    }
    if (element.parentElement.htmlFor === "country") {
      elementError.textContent = "You can only use alphabetical characters.";
    }
  }
  if (element.validity.typeMismatch) {
    if (element.parentElement.htmlFor === "email") {
      elementError.textContent =
        "You need to put in a properly formatted email.";
    }
  }
}

document.forms[0].addEventListener("submit", function (event) {
  const labels = document.forms[0].getElementsByTagName("label");
  passwordMatch =
    document.querySelectorAll("input[type=password]")[0].value ===
    document.querySelectorAll("input[type=password]")[1].value;
  Array.from(labels).forEach((element) => {
    if (element.querySelector("input").validity.valid) {
      element.lastElementChild.className = "error";
    } else {
      showError(element.querySelector("input"), element.lastElementChild);
      element.lastElementChild.className = "error active";
      event.preventDefault();
    }
  });
  if (!passwordMatch) {
    labels[4].lastElementChild.textContent = "Both passwords must be matching.";
    event.preventDefault();
  }
});

const labels = document.forms[0].getElementsByTagName("label");
Array.from(labels).forEach((element) => {
  element.querySelector("input").addEventListener("input", function (event) {
    passwordMatch =
      document.querySelectorAll("input[type=password]")[0].value ===
      document.querySelectorAll("input[type=password]")[1].value;
    if (element.querySelector("input").validity.valid) {
      element.lastElementChild.textContent = "";
      element.lastElementChild.className = "error";
      if (this.id === "confirm-password" && !passwordMatch) {
        console.log(this.parentElement.lastElementChild.textContent);
        this.parentElement.lastElementChild.textContent =
          "Both passwords must be matching.";
      }
    } else {
      showError(element.querySelector("input"), element.lastElementChild);
      element.lastElementChild.className = "error active";
    }
  });
});
