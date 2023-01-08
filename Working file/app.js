//* --------------------------- Slider funtcion --------------------------- //
const slider = document.querySelector("#range");
const output = document.querySelector("#lengthValue");
const generateBtn = document.querySelector(".generatebtn");
const passwordText = document.querySelector(".password-text");

output.innerHText = slider.value;

// Change length value
slider.oninput = function () {
  output.innerText = this.value;
};

// Change background
slider.addEventListener("input", () => {
  let sliderValue = slider.value;
  position = ((sliderValue - 4) * 100) / (30 - 4) + "% 100%";
  //   console.log(position);
  slider.style.backgroundSize = position;
});

//*  -------------------  Password generator main function  -----------------*//

generateBtn.addEventListener("click", () => {
  const allChoices = document.querySelectorAll('input[type="checkbox"]');
  const optionsArray = Array.from(allChoices);
  //   console.log(optionsArray);

  const allLights = document.querySelectorAll(".light");
  const lightsArray = Array.from(allLights);

  var longString = "";
  const allChara = {
    uppercase: "ABCEDFGHIJKLMNOPQRISTUVWXYZ",
    lowercase: "abcedfghijklamopqrstuvwxyz",
    number: "0123456789",
    symbol: "+*/!@#_$",
  };

  if (optionsArray.some((choice) => choice.checked !== false)) {
    //* -------------- Reset lights ---------------//
    lightsArray.forEach((light) => (light.className = ""));

    //*  -----  Check status & Random generation ----*//
    optionsArray.forEach((choice) => {
      if (choice.checked == true) {
        longString += allChara[choice.name];
      }
    });
    // console.log(longString);

    //Randomly choose from longString, length = slider.value
    let passwordString = "";

    for (let m = 0; m < slider.value; m++) {
      passwordString +=
        longString[Math.floor(Math.random() * longString.length)];
    }
    // console.log(passwordString);

    //* ----------- Show password text --------------//
    passwordText.innerText = passwordString;
    passwordText.classList.add("password-text-full");

    //* ------------- Indicator light --------------//
    // Reverse lookup: how many keys of allChara involved in generated password
    var digitType = [];
    for (let x = 0; x < passwordString.length; x++) {
      if (allChara.uppercase.includes(passwordString[x])) {
        digitType.push("1");
      } else if (allChara.lowercase.includes(passwordString[x])) {
        digitType.push("2");
      } else if (allChara.number.includes(passwordString[x])) {
        digitType.push("3");
      } else if (allChara.symbol.includes(passwordString[x])) {
        digitType.push("4");
      }
    }
    var uniqType = [...new Set(digitType)];
    // console.log(uniqType);

    // -------- Apply CSS ----- //

    strengthText = document.querySelector(".strength-text");
    light1 = document.querySelector("#light1");
    light2 = document.querySelector("#light2");
    light3 = document.querySelector("#light3");
    light4 = document.querySelector("#light4");

    if (uniqType.length >= 4 || passwordString.length > 20) {
      //   console.log("strong");
      strengthText.style.visibility = "visible";
      strengthText.innerText = "STRONG";

      light1.classList.add("light", "status-strong");
      light2.classList.add("light", "status-strong");
      light3.classList.add("light", "status-strong");
      light4.classList.add("light", "status-strong");
    } else if (uniqType.length >= 3 || passwordString.length > 15) {
      //   console.log("medium");
      strengthText.style.visibility = "visible";
      strengthText.innerText = "MEDIUM";

      light1.classList.add("light", "status-medium");
      light2.classList.add("light", "status-medium");
      light3.classList.add("light", "status-medium");
      light4.classList.add("light");
    } else if (uniqType.length >= 2 || passwordString.length > 10) {
      //   console.log("weak");
      strengthText.style.visibility = "visible";
      strengthText.innerText = "WEAK";

      light1.classList.add("light", "status-weak");
      light2.classList.add("light", "status-weak");
      light3.classList.add("light");
      light4.classList.add("light");
    } else {
      //   console.log("too weak");
      strengthText.style.visibility = "visible";
      strengthText.innerText = "TOO WEAK!";

      light1.classList.add("light", "status-too-weak");
      light2.classList.add("light");
      light3.classList.add("light");
      light4.classList.add("light");
    }
  } else {
    // console.log("all false");
    const choiceAlert = document.querySelector(".nochoice-alert");
    choiceAlert.classList.add("show-nochoice-alert");
    setTimeout(() => {
      choiceAlert.classList.remove("show-nochoice-alert");
    }, 2000);
  }
});

//* ------------- Copy password --------------//
const copyBtn = document.querySelector(".copy-icon");
const alertText = document.querySelector(".copy-alert");
copyBtn.addEventListener("click", () => {
  var copyText = passwordText.innerText;
  navigator.clipboard.writeText(copyText).then(
    () => {
      alertText.classList.add("show-copy-alert");
      setTimeout(() => {
        alertText.classList.remove("show-copy-alert");
      }, 1500);
    },
    () => {
      alert("Copy failed.");
    }
  );
});
