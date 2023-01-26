import React, { useRef, useState } from "react";

function Raffle() {
  const addressListRef = useRef();
  const stepCountRef = useRef();
  const winnerListRef = useRef();
  const [processNumber, setProcessNumber] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [addressList, setAddressList] = useState([]);
  const [winnerNumbers, setWinnerNumbers] = useState([]);

  const createAddresses = () => {
    const inputElement = addressListRef.current;
    setAddressList(inputElement.value.split(","));
    setProcessNumber(1);
  };

  const handleStepCount = () => {
    const inputElement = stepCountRef.current;
    setStepCount(Number(inputElement.value));
    setProcessNumber(2);
  };

  const makeRaffle = () => {
    const winnerInputs = document.querySelectorAll(".winner");
    for (let i = 0; i < winnerInputs.length; i++) {
      const temp = winnerNumbers.push(Number(winnerInputs[i].value));
      setWinnerNumbers(temp);
    }

    const Lnew = [];
    let sum = 0;
    for (let i = 0; i < winnerNumbers.length; i++) {
      if (sum + winnerNumbers[i] <= addressList.length) {
        Lnew.push(winnerNumbers[i]);
        sum += winnerNumbers[i];
      } else {
        Lnew.push(addressList.length - sum);
        break;
      }
    }

    const addressListCopy = addressList.slice(0);
    for (let i = 0; i < Lnew.length; i++) {
      const Lx = [];
      let availableWinnerNumber = Lnew[i];
      const div = document.createElement("div");
      div.innerText = `${i + 1}. raffle winner: `;
      winnerListRef.current.appendChild(div);

      for (let j = 0; j < availableWinnerNumber; j++) {
        let winnerIndex = Math.floor(Math.random() * addressListCopy.length);
        let winner = addressListCopy[winnerIndex];
        addressListCopy.splice(winnerIndex, 1);
        Lx.push(winner);
      }

      const newdiv = document.createElement("code");
      newdiv.innerText = `${Lx.join(",")}`;
      winnerListRef.current.appendChild(newdiv);
    }
  };

  return (
    <div>
      <div>
        <h1>RAFFLE</h1>
        <input
          type="text"
          ref={addressListRef}
          style={{
            backgroundcolor: "white",
            width: "500px",
            height: "60px",
            border: "1px solid blue",
            padding: "10px",
            margin: "10px 10px 10px 0px",
            position: "relative",
            wordWrap: "break-word",
            overflow: "hidden",
          }}
        />
        <button onClick={createAddresses} id="adresses">
          Please enter the list of participants
        </button>
      </div>

      {processNumber >= 1 && (
        <div>
          <div
            style={{
              backgroundColor: "white",
              width: "500px",
              height: "40px",
              border: "1px solid blue",
              padding: "10px",
              margin: "10px 10px 10px 0px",
            }}
          >
            The number of participants: {addressList.length}
          </div>

          <input
            type="number"
            ref={stepCountRef}
            style={{
              backgroundColor: "white",
              width: "500px",
              height: "10px",
              border: "1px solid blue",
              padding: "10px",
              margin: "10px 10px 10px 0px",
              position: "relative",
            }}
          />
          <button onClick={handleStepCount}>
            Please write in how many steps the draw will take place
          </button>
        </div>
      )}
      {processNumber >= 2 && (
        <div>
          {[...Array(stepCount)].map((element, index) => {
            return (
              <>
                <div>
                  {index + 1}. raffle winner number:{" "}
                  <input
                    className="winner"
                    type="number"
                    style={{
                      backgroundcolor: "white",
                      width: "80px",
                      height: "20px",
                      border: "1px solid blue",
                      padding: "10px",
                      margin: "10px 10px 10px 0px",
                      position: "relative",
                    }}
                  />{" "}
                </div>
              </>
            );
          })}
          <button
            onClick={makeRaffle}
            style={{
              padding: "10px",
              margin: "10px 10px 10px 0px",
            }}
          >
            Complete the draw
          </button>
        </div>
      )}
      <div
        ref={winnerListRef}
        style={{
          maxWidth: "800px",
          width: "100%",
          whiteSpace: "break-spaces",
          overflowWrap: "break-word",
          // border: "1px solid blue",
          padding: "10px",
          margin: "10px 10px 10px 0px",
          position: "relative",
          // backgroundColor: "white",
        }}
      ></div>
    </div>
  );
}

export default Raffle;
