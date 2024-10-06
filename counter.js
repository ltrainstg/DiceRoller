import OBR from "@owlbear-rodeo/sdk";

export function setupCounter(element, text) {
  const rollsList = document.getElementById('rolls-list');  // Target the roll list
  const inputElement = element.nextElementSibling;

  // Set the initial text for the button
  element.innerHTML = `${text}`;

  const setCounter = () => {
    const randomNumber1 = Math.ceil(Math.random() * 10);
    const randomNumber2 = Math.ceil(Math.random() * 10);
    element.innerHTML = `${text}`;  

    const inputValue = parseInt(inputElement.value, 10) || 0;
    let total = randomNumber1 + randomNumber2 + inputValue;
    let dice = randomNumber1 + randomNumber2;

    // Construct the roll result message
    let message = `${randomNumber1} + ${randomNumber2} + ${inputValue} ➡️ Total = ${total}`;
    let resultStyle = '';  // Add styling based on the result

    
    if (dice > 18) {
      message += " 🎉 (CRITICAL!)";
      resultStyle = 'color: green; font-weight: bold;';  // Critical hit in green

    } else if (total >= 17) {
      message += " (Tier 3)";
      resultStyle = 'color: blue; font-weight: bold;';  // Tier 3 in blue

    } else if (total >= 12) {
      message += " (Tier 2)";
      resultStyle = 'color: purple; font-style: italic;';  // Tier 2 in orange italic

    } else {
      message += " (Tier 1)";
      resultStyle = 'color: red; font-style: italic;';  // Tier 1 in red italic

    }

    // // Show the notification with additional flavor text
    // OBR.notification.show(`${text}: ${message}`);

    // Create a new list item with styled text
    const newListItem = document.createElement('li');
    newListItem.innerHTML = `<span style="${resultStyle}">${text}: ${message}</span>`;
    
    // Append the new item to the list
    rollsList.appendChild(newListItem);

    // If the list has more than 5 items, remove the oldest one
    if (rollsList.childElementCount > 5) {
      rollsList.removeChild(rollsList.firstChild);
    }
  };

  element.addEventListener("click", setCounter);
}