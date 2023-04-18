//Key for encrypt and decrypt
let replacementsKeys = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

//Buttons
const buttonEncript = document.querySelector("#encript");
const buttonDecrypt = document.querySelector("#decrypt");
const buttonCopy = document.querySelector("#copyText");

//Containers
const containerMessage = document.querySelector(".output-message");
const messageAlert = document.querySelector(".container-output-message-blank");

const textProcessed = document.querySelector(
  ".container-output-message-filled"
);

const textAreaCheck = document.querySelector(".input-text__textarea");
const textAreaOutput = document.querySelector(
  ".container-output-message__text"
);

//Events

buttonCopy.addEventListener("click", () => {
  textAreaOutput.select();
  document.execCommand("copy");
  alert("Texto copiado al portapapeles");
});

textAreaCheck.addEventListener("input", () => {
  const value = textAreaCheck.value;
  const regex = /^[a-z\s]*$/;

  if (!regex.test(value)) {
    alert("Solo se permiten letras minúsculas sin tildes");
    textAreaCheck.value = value.slice(0, -1);
  }
});

buttonDecrypt.addEventListener("click", () => {
  const textArea = document.querySelector(".input-text__textarea");
  let text = textArea.value;
  let isTextAreaEmpty = checkTextInput(text);

  if (isTextAreaEmpty) {
    showMessageAlert();
  } else {
    const decrypText = decryptText(text);
    showTextProcessed(decrypText);
    text = "";
  }
});

buttonEncript.addEventListener("click", () => {
  const textArea = document.querySelector(".input-text__textarea");
  let text = textArea.value;
  let isTextAreaEmpty = checkTextInput(text);

  if (isTextAreaEmpty) {
    showMessageAlert();
  } else {
    const encriptedText = encriptText(text);
    showTextProcessed(encriptedText);
    text = "";
  }
});

const showTextProcessed = (text) => {
  const outputText = document.querySelector(".container-output-message__text");
  containerMessage.style.display = "block";
  messageAlert.style.display = "none";
  textProcessed.style.display = "block";
  outputText.value = text;
};

const showMessageAlert = () => {
  containerMessage.style.display = "block";
  messageAlert.style.display = "block";
  textProcessed.style.display = "none";
};

const checkTextInput = (text) => text.trim().length === 0;

const encriptText = () => {
  const textArea = document.querySelector(".input-text__textarea");
  const text = textArea.value;
  const regex = new RegExp(Object.keys(replacementsKeys).join("|"), "g");
  const encriptText = text.replace(regex, (match) => replacementsKeys[match]);
  return encriptText;
};

const decryptText = () => {
  const textArea = document.querySelector(".input-text__textarea");
  const text = textArea.value;
  const regex = new RegExp(Object.values(replacementsKeys).join("|"), "g");
  const decryptText = text.replace(regex, (match) =>
    Object.keys(replacementsKeys).find((key) => replacementsKeys[key] === match)
  );
  return decryptText;
};
