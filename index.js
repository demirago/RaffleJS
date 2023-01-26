const button = document.getElementById('adresses');
const input = document.querySelector('input');


button.addEventListener("click", createList);

let addressList
let stepCount
let secondInput
const winnerNumberi = []
const Lnew = []

function createList() {
    addressList = input.value.split(",");
    // input.remove();
    // button.remove();
    const div = document.createElement('div');
    secondInput = document.createElement('input');
    const secondButton = document.createElement('button');
    secondButton.innerText = "Please write in how many steps the draw will take place";
    div.innerText = `The number of participants: ${addressList.length}`;
    document.body.appendChild(div);
    document.body.appendChild(secondInput); 
    document.body.appendChild(secondButton);     
    secondButton.addEventListener("click", stepNumber);
}


function stepNumber() {
    const parent = document.createElement('div');
    stepCount = Number(secondInput.value);
    for(let i = 0; i < stepCount; i++) {
        const div = document.createElement('div');
        const thirdInput = document.createElement('input');
        thirdInput.className="winner"
        div.innerText = `${i + 1}. raffle winner number: `
        parent.appendChild(div);
        parent.appendChild(thirdInput);

        

    }

    const thirdButton = document.createElement('button');
    thirdButton.addEventListener("click", makeRaffle)
    thirdButton.innerText = "Complete the draw";
    parent.appendChild(thirdButton);
    document.body.appendChild(parent);
}

function makeRaffle() {
    const thirdInputs = document.querySelectorAll('.winner')
    for(let i = 0; i < thirdInputs.length; i++) {
        winnerNumberi.push(Number(thirdInputs[i].value));
    }

    const Lx = []
    let sum = 0;
    const Lnew = []
    for(let i = 0; i < winnerNumberi.length; i++) {
        if(sum + winnerNumberi[i] <= addressList.length) {
            Lnew.push(winnerNumberi[i]);
            sum += winnerNumberi[i];
        } else {
            Lnew.push(addressList.length - sum)
            break;
        }
    }

    for(let i = 0; i < Lnew.length; i++) {
        let availableWinnerNumber = Lnew[i];
        //console.log(`${i}. raffle winner: `);
        const div = document.createElement("div");
        div.innerText = `${i+1}. raffle winner: `;
        document.body.appendChild(div);

        for(let j = 0; j < availableWinnerNumber; j++) {
            let winnerIndex = Math.floor(Math.random() * addressList.length);
            let winner = addressList[winnerIndex];
            //console.log(winner);
            addressList.splice(winnerIndex, 1);
            Lx.push(winner);

            if(Lx.length == availableWinnerNumber ) {
                //console.log(Lx)
                const div = document.createElement("div");
                div.innerText = `${Lx}`;
                document.body.appendChild(div);
                Lx.splice(0, availableWinnerNumber)
            }            
        }
    } 
}

