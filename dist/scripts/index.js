import { check } from './check.js'

const startButton = document.querySelector('.start__button');
const hiddenInput = document.querySelector('.content-input__hidden-input');
const contentInputVisuals = document.querySelectorAll('.content-input__visual');
const checkButton = document.querySelector('.handle-input');
const endgameButton = document.querySelector('.endgame__button');

function getRandomNumber(hard = true) {
    if (hard) return Math.round(1000 + Math.random()*8999);
    if (!hard) {
        let num = '';
        while (num.length < 4) {
            let digit =  Math.floor(Math.random()*10);
            if (num.indexOf(String(digit)) === -1) {
                num += String(digit);
            }
        }
        return num;
    }
}

function makeCounter() {
    let count = 1;
  
    return function() {
      return count++;
    };
}

//значение загаданного числа
let unknouwnNumber = 0;

function getHardness() {
    let hardnessForm = document.querySelector('.hardness-form');
    const hardnessData = new FormData(hardnessForm);
    let hard = hardnessData.get('hardness-choose');
    console.log('hardness: ' + hard);
    return hard;
}


//счетчик ходов
let counter

function addDataIntoTable(checkedNumber, result) {
    const table = document.querySelector('.table');
    const elems = [];
    for (let i = 0; i < 4; i++) {
        elems[i] = document.createElement('p');
    }
    elems[0].classList.add('table__item-number-cell');
    elems[0].textContent = counter();
    elems[1].classList.add('table__number-cell');
    elems[1].textContent = checkedNumber;
    elems[2].classList.add('table__oxes-cell');
    elems[2].textContent = result.bulls;
    elems[3].classList.add('table__cows-cell');
    elems[3].textContent = result.cows;
    elems.forEach(item => {table.append(item)});
}

function removeAllVisuals() {
    const table = document.querySelector('.table');
    const classes = ['.table__item-number-cell', '.table__number-cell', '.table__oxes-cell', '.table__cows-cell'];
    classes.forEach(item => {
        const elems = table.querySelectorAll(item);
        elems.forEach(item => {item.remove()})
    });
}

function endGame(){
    hiddenInput.value = '';
    clearInputVisuals();
    removeAllVisuals();
    const content = document.querySelector('.content');
    content.classList.add('display-none');
    const endBlock = document.querySelector('.end-block');
    endBlock.classList.remove('display-none');
}

function clearInputVisuals() {
    contentInputVisuals.forEach(item => {
        item.textContent = '';
    })
}



startButton.addEventListener('click', () => {
    const start = document.querySelector('.start');
    const content = document.querySelector('.content');
    counter = makeCounter();
    unknouwnNumber = getRandomNumber(getHardness());
    console.log(unknouwnNumber);
    start.classList.add('display-none');
    content.classList.remove('display-none');
    hiddenInput.focus();
    for (let i of contentInputVisuals) {
        i.addEventListener('click', evt => {
            hiddenInput.focus();
        });
    }
});

hiddenInput.addEventListener('input', evt => {
    let j = 0;
    const regExp = /[0-9]/;
    if (regExp.test(evt.target.value[evt.target.value.length - 1]) || evt.target.value === '') {
        if (evt.target.value.length > 4) evt.target.value = evt.target.value.slice(0, 4);
        for (let i of contentInputVisuals) {
            if (evt.target.value[j]) {
                i.textContent = evt.target.value[j];
            } else {
                i.textContent = '';
            }
            j++;
        }
    } else {
        evt.target.value = evt.target.value.slice(0, evt.target.value[evt.target.value.length - 1]);
    }
});

checkButton.addEventListener('click', evt => {
    if (hiddenInput.value.length === 4) {
        let result = check(unknouwnNumber, hiddenInput.value);
        addDataIntoTable(hiddenInput.value, result);
        clearInputVisuals();

        if (String(unknouwnNumber) === hiddenInput.value) endGame();

        hiddenInput.value = '';
    }
});

endgameButton.addEventListener('click', evt => {
    const start = document.querySelector('.start');
    const endBlock = document.querySelector('.end-block');
    endBlock.classList.add('display-none');
    start.classList.remove('display-none');
});