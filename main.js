import './style.css'
import { setupCounter } from './counter.js'


document.querySelector('#app').innerHTML = `
<div style="display: flex;">
  <div>
<div class="card">
  <button id="counter1" type="button"></button>
  <input id="input1" type="number" placeholder=0 />

</div>
    <div class="card">
      <button id="counter2" type="button"></button>
      <input id="input2" type="number" placeholder=0 />
    </div>
    <div class="card">
      <button id="counter3" type="button"></button>
      <input id="input3" type="number" placeholder=0 />
    </div>
    <div class="card">
      <button id="counter4" type="button"></button>
      <input id="input4" type="number" placeholder=0 />
    </div>
    <div class="card">
      <button id="counter5" type="button"></button>
      <input id="input5" type="number" placeholder=0 />
    </div>
    <!-- Global Lock/Unlock Button -->
<button id="globalLock" class="lock-btn">🔓 Lock All</button>

  </div>


  <div>
    <ul id="rolls-list">
      <!-- Roll results will be appended here -->
    </ul>
  </div>
</div>
`;

setupCounter(document.querySelector('#counter1'), 'MGT');
setupCounter(document.querySelector('#counter2'), 'AGL');
setupCounter(document.querySelector('#counter3'), 'REA');
setupCounter(document.querySelector('#counter4'), 'INU');
setupCounter(document.querySelector('#counter5'), 'PRS');


// Lock/Unlock all input fields
function setupGlobalLock(lockButton) {
  let isLocked = false;

  const toggleGlobalLock = () => {
    isLocked = !isLocked;

    // Get all input fields and lock/unlock them
    document.querySelectorAll('input[type="number"]').forEach(input => {
      input.disabled = isLocked;
    });

    // Update the button text/icon
    lockButton.textContent = isLocked ? '🔒 Unlock All' : '🔓 Lock All';
  };

  lockButton.addEventListener('click', toggleGlobalLock);
}

// Set up global lock/unlock functionality
const globalLockButton = document.getElementById('globalLock');
setupGlobalLock(globalLockButton);

OBR.onReady(() => {
  setupContextMenu();
});