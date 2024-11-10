import OBR from "@owlbear-rodeo/sdk";
const ID = "LD_Tracker";
import { isImage } from "@owlbear-rodeo/sdk";

const updateMapLayerMetadata = async (message) => {
  try {
    console.log(message)
    // Retrieve all items in the scene
    let mapLayerItem = await OBR.scene.items.getItems(
      (item) => item.layer === "MAP" && isImage(item)
    );

    // Find the item that belongs to the "MAP" layer
    console.log(mapLayerItem[0])
    // mapLayerItem = mapLayerItem[0]

    if (mapLayerItem) {
      // Use the mutating callback function to update the item
      OBR.scene.items.updateItems(mapLayerItem, (items) => {
        for (let item of items) {
          // Modify the metadata using the callback pattern
          item.metadata[`${ID}/metadata`] = {
            message: message, // Set the new message
            lastUpdated: new Date().toISOString(), // Add a timestamp
          };
        }
      });

      console.log("Map layer metadata updated successfully!");
    } else {
      console.log("No item found on the 'MAP' layer.");
    }
  } catch (error) {
    console.error("Error updating map layer metadata:", error);
  }
};


export function setupCounter(element, text) {

  const inputElement = element.nextElementSibling;

  // Set the initial text for the button
  element.innerHTML = `${text}`;
  const setCounter = async () => {
 

    // OBR.notification.show(item.name, "INFO")
    // OBR.notification.show('OBR.player.getName()', "INFO")
    const randomNumber1 = Math.ceil(Math.random() * 10);
    const randomNumber2 = Math.ceil(Math.random() * 10);

    const inputValue = parseInt(inputElement.value, 10) || 0;
    let total = randomNumber1 + randomNumber2 + inputValue;
    let dice = randomNumber1 + randomNumber2;

    // Construct the roll result message
    const player = await OBR.player.getName();
    console.log(player)
    let message = `(${player})  ${randomNumber1} + ${randomNumber2} + ${inputValue}(${text}) ➡️ Total = ${total}`;
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
    
    updateMapLayerMetadata(`<span style="${resultStyle}">${message}</span>`)
    updateRollList()

    // const newListItem = document.createElement('li');
    // newListItem.innerHTML = `<span style="${resultStyle}">${message}</span>`;
    
    // // Append the new item to the list
    // rollsList.appendChild(newListItem);

    // // If the list has more than 5 items, remove the oldest one
    // if (rollsList.childElementCount > 2) {
    //   rollsList.removeChild(rollsList.firstChild);
    // }

  };

 async function updateRollList() {
  // Get data from metadata
  // 
  let mapLayerItem = await OBR.scene.items.getItems(
    (item) => item.layer === "MAP" && isImage(item)
  );
  console.log(mapLayerItem)
  console.log(mapLayerItem[[0]]['metadata']['LD_Tracker/metadata']['message'])
  // console.log(mapLayerItem)
  const newListItem = document.createElement('li');
  newListItem.innerHTML = mapLayerItem[[0]]['metadata']['LD_Tracker/metadata']['message']
  const rollsList = document.getElementById('rolls-list');  // Target the roll list
    // Append the new item to the list
    rollsList.appendChild(newListItem);
  // console.log(rollsList.childElementCount)
  // console.log(rollsList.childElementCount > 1)
    // If the list has more than 5 items, remove the oldest one
    if (rollsList.childElementCount > 1) {
      rollsList.removeChild(rollsList.firstChild);
      // console.log(rollsList.childElementCount)
      // console.log(rollsList.childElementCount > 1)
    }

  }


  const setCounter1 = async () => {
    // Get all items in the scene
    const items = await OBR.scene.items.getItems();
    const message = Math.floor(Math.random() * 100);
    const player = await OBR.player.getName();
    console.log(player)

    updateMapLayerMetadata("This is a new map message")
    // Loop over all items and do something with each one
    items.forEach(item => {
      
      // console.log(item)
      // console.log(`Item: ${item.name}, ID: ${item.id}, metadata: ${JSON.stringify(item.metadata)}`);
      item.metadata[`${ID}/metadata`] = {
        message,
      };
     
      // console.log(item)
      // console.log(`Item: ${item.name}, ID: ${item.id}, metadata: ${JSON.stringify(item.metadata)}`);

      // You can add your custom logic for each item here
    });
  };


  const updateMetadata = async (message) => {
    try {
      // Get all items in the scene
      const items = await OBR.scene.items.getItems();
  
      // Loop through each item and add/update metadata with the message
      const updatedItems = items.map(item => {
        // Copy the current metadata or create a new object if undefined
        const newMetadata = { ...item.metadata };
  
        // Add or update metadata under the specific ID namespace with the message
        newMetadata[`${ID}/metadata`] = {
          message, // Store the passed message in metadata
          lastUpdated: new Date().toISOString(), // Adding a timestamp
        };
  
        // Return the updated item with the new metadata
        return {
          id: item.id,
          metadata: newMetadata,
        };
      });
  
      // Update the items in the scene with the new metadata
      await OBR.scene.items.updateItems(updatedItems);
      console.log("Metadata updated successfully with message:", message);
    } catch (error) {
      console.error("Failed to update metadata:", error);
    }
  };
  
  // Set up the event listener for the element
  // element.addEventListener("click", setCounter);
  // element.addEventListener("click", () => updateMapLayerMetadata("This is a new map message"));
  // element.addEventListener("click", () => updateMetadata("Custom message goes here"));
  const items = OBR.scene.getItems
  // console.log(items)
  
  // Set up the event listener with a wrapper function that passes the items
  element.addEventListener("click", () => setCounter(items));

  
}





