import OBR from "@owlbear-rodeo/sdk";

export function setupCounter(element, text) {
  const rollsList = document.getElementById('rolls-list');  // Target the roll list

  const inputElement = element.nextElementSibling;
  element.innerHTML = `${text}`;
  const setCounter = () => {
    // Set the initial text for the button
 
    const randomNumber1 = Math.ceil(Math.random() * 10);
    const randomNumber2 = Math.ceil(Math.random() * 10);

    const inputValue = parseInt(inputElement.value, 10) || 0;
    let total = randomNumber1 + randomNumber2 + inputValue;
    let dice = randomNumber1 + randomNumber2;

    // Construct the roll result message
    let message = `${randomNumber1} + ${randomNumber2} + ${inputValue} = ${total}`;
    if (dice > 18) {
      message += " (CRITICAL!)";
    } else if (total >= 17) {
      message += " (Tier 3)";
    } else if (total >= 12) {
      message += " (Tier 2)";
    } else {
      message += " (Tier 1)";
    }

    // Show the notification
    OBR.notification.show(`${text}: ${message}`);

    // Create a new list item
    const newListItem = document.createElement('li');
    newListItem.textContent = `${text}: ${message}`;

    // Append the new item to the list
    rollsList.appendChild(newListItem);

    // If the list has more than 5 items, remove the oldest one
    if (rollsList.childElementCount > 6) {
      rollsList.removeChild(rollsList.firstChild);
    }
  };

  element.addEventListener("click", setCounter);
}