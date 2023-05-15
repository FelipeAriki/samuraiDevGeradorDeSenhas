const inputEl = document.querySelector("#password");
const passwordLengthEl = document.querySelector("#password-length");
const textLengthEl = document.querySelector("#password-length-text");
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar");
let passwordLength = 16;

//Gera senha aleatória
function generatePassword(){
    let chars = "abcdefghjkmnpqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const numberChars = "123456789";
    const symbolChars = "?!@&*()[]";
    let password = "";

    if(document.querySelector("#uppercase-check").checked)
        chars+=upperCaseChars;
    if(document.querySelector("#number-check").checked)
        chars+=numberChars;
    if(document.querySelector("#symbol-check").checked)
        chars+=symbolChars;

    for(let i = 0; i <= passwordLength; i++){
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber+1);
    }
    inputEl.value = password;
    calculateQuality();
    calculateFontSize();
}

//Calcular Qualidade da senha
function calculateQuality(){
    const percent = Math.round((passwordLength / 64) * 25 + (document.querySelector("#uppercase-check").checked ? 15 : 0) + (document.querySelector("#number-check").checked ? 25 : 0) + (document.querySelector("#symbol-check").checked ? 35 : 0))

      securityIndicatorBarEl.style.width = `${percent}%`

      if (percent > 69) {
        // safe
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.add("safe")
      } else if (percent > 50) {
        // warning
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.add("warning")
        securityIndicatorBarEl.classList.remove("safe")
      } else {
        // critical
        securityIndicatorBarEl.classList.add("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.remove("safe")
      }

      if (percent >= 100) {
        securityIndicatorBarEl.classList.add("completed")
      } else {
        securityIndicatorBarEl.classList.remove("completed")
      }
}

//Calcular Tamanho da fonte
function calculateFontSize(){
    if (passwordLength > 45) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.add("font-xxs")
    } else if (passwordLength > 32) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.add("font-xs")
        inputEl.classList.remove("font-xxs")
    } else if (passwordLength > 22) {
        inputEl.classList.add("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    } else {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
    }
}

//Aumenta o tamanho da senha aleatória
passwordLengthEl.addEventListener("input", ()=>{
    passwordLength = passwordLengthEl.value;
    textLengthEl.innerText = passwordLength;
    generatePassword();
});

//Redefine a senha conforme box marcados
document.querySelector("#uppercase-check").addEventListener('click', generatePassword);
document.querySelector("#number-check").addEventListener('click', generatePassword);
document.querySelector("#symbol-check").addEventListener('click', generatePassword);

//Copia a senha aleatória
function copy(){
    navigator.clipboard.writeText(inputEl.value)
}
document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#btnCopiar").addEventListener("click", copy);
document.querySelector("#renew").addEventListener("click", generatePassword)

generatePassword();