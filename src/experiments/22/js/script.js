/* global document */
document.addEventListener('DOMContentLoaded', () => {
  // VARIABLES
  const btns = document.querySelectorAll('.btn');
  const btnMain = document.querySelector('.btnMain');
  const prompter = document.querySelector('.prompter');
  // const timeDisplay = document.querySelector('#timeDisplay'); // Dev-purpose
  let countUp;

  // FUNCTIONS
  // General Flow
  // 01: btnMainTouchStart() => If the user touches the main button.
  // 02: meterRouter()       => Check if there are inactive buttons.
  // 03: fillMeter()         => Fill the meter of the current inactive button.
  // 04: activateBtn()       => Once meter is full, activate the button.
  // 05: meterRouter()       => Check if there are inactive buttons.
  function activateBtn(bM) {
    const btnM = bM;
    if (btnM.meter.closest('.btn.inactive')) btnM.meter.closest('.btn.inactive').classList.remove('inactive');
    btnM.meter.style.display = 'none';
    btnM.meter.closest('.btn').classList.add('activated');
    clearInterval(countUp); // To reset interval for previous inactive button.
    meterRouter(bM);
  }

  function fillMeter(bM) {
    const btnM = bM;
    let counter = 0;
    countUp = setInterval(() => {
      if (counter < btnM.cycleDuration) {
        counter += 0.01;
        const curretOffset = btnM.sOffset - (btnM.sOffset * (counter * (1 / btnM.cycleDuration)));
        btnM.meter.style.strokeDashoffset = curretOffset;
        btnM.currentCount = Math.round(counter * 100) / 100;
        // timeDisplay.textContent = Math.round(counter * 100) / 100; // Dev-purpose
      } else {
        counter = 0;
        activateBtn(bM);
      }
    }, 10);
  }

  function meterRouter(bM) {
    const btnM = bM;
    const meters = document.querySelectorAll('.progressMeter circle');
    const inactiveBtns = document.querySelectorAll('.btn.inactive');
    const areInactiveBtns = inactiveBtns.length > 0;
    if (areInactiveBtns) {
      btnM.meter = meters[meters.length - inactiveBtns.length];
      btnM.sOffset = Number(btnM.meter.attributes['stroke-dashoffset'].value);
      btnM.inactiveBtns = inactiveBtns.length;
      fillMeter(bM);
    }
  }

  function btnTouchStart(e) {
    const inactiveBtn = e.currentTarget.classList.contains('inactive');
    const notMainBtn = !e.currentTarget.classList.contains('btnMain');
    if (inactiveBtn) {
      prompter.innerText = 'This item is currently inactive (T_T)';
    } else if (notMainBtn) {
      e.currentTarget.classList.add('active');
      prompter.innerText = 'This item is currently active (^_^)b';
    }
  }

  function btnTouchEnd(e) {
    e.currentTarget.classList.remove('active');
    prompter.innerText = '';
  }

  function btnMainTouchStart() {
    clearInterval(countUp);
    this.cycleDuration = 0.6;
    meterRouter(this);
  }

  function btnMainTouchEnd() {
    clearInterval(countUp);
    const inactiveBtns = document.querySelectorAll('.btn.inactive');
    this.inactiveBtns = inactiveBtns.length;
    if (this.currentCount < this.cycleDuration) {
      this.meter.style.strokeDashoffset = this.sOffset;
    } else if (this.inactiveBtns <= 0) {
      prompter.innerText = 'All buttons are active! (^_^)b';
    }
  }

  // ADD EVENT LISTENERS
  btns.forEach((btn) => {
    btn.addEventListener('touchstart', btnTouchStart, { passive: true });
    btn.addEventListener('touchend', btnTouchEnd, { passive: true });
  });
  btnMain.addEventListener('touchstart', btnMainTouchStart, { passive: true });
  btnMain.addEventListener('touchend', btnMainTouchEnd, { passive: true });
  btnMain.addEventListener('touchend', btnMainTouchEnd, { passive: true });
});
