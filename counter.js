import OBR from "@owlbear-rodeo/sdk";

export function setupCounter(element, text) {
  let counter = 0;

  const inputElement = element.nextElementSibling;
  const to_add = parseInt(inputElement.value) || 0;
  const setCounter = (count) => {
    counter = count;
    element.innerHTML = `Roll for ${text}`;
    const randomNumber1 = Math.ceil(Math.random() * 10);
    const randomNumber2 = Math.ceil(Math.random() * 10);


    // Read the input value as an integer
    const inputValue = parseInt(inputElement.value, 10) || 0; // Fallback to 0 if input is not a number
    let total = randomNumber1+randomNumber2+inputValue;
    let dice = randomNumber1+randomNumber2;

    // OBR.notification.show(`Input value is ${inputValue}`);
    // OBR.notification.show(`Total (Random + Input) is ${total}`);
    if(dice >18){
    OBR.notification.show(`${randomNumber1} + ${randomNumber2} + ${inputValue}(${text})=${total} (CRITICAL!)`);
    }else if(total>=17){
      OBR.notification.show(`${randomNumber1} + ${randomNumber2} + ${inputValue}(${text})= ${total} (Tier 3)`);
    }else if(total>=12){
      OBR.notification.show(`${randomNumber1} + ${randomNumber2} + ${inputValue}(${text})= ${total} (Tier 2)`);
    }else{
      OBR.notification.show(`${randomNumber1} + ${randomNumber2} + ${inputValue}(${text})= ${total} (Tier 1)`);
    }

    
  };
  element.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);
}