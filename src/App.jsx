import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Declare state for storing value of currency symbol, price, transaction hash and transaction status.
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState(0);
  const [txHash, setTxHash] = useState(null);
  const [txStatus, setTxStatus] = useState(null);

  // Declare timestamp variable that change time format for matching the the payload structure.
  // Use new Date() for current date time.
  // Use getTime() to returns the number of milliseconds elapsed since January 1, 1970 and divided by 1000 to convert milliseconds to seconds
  // Use Math.floor() to round down the result to the nearest integer
  const timestamp = Math.floor(new Date().getTime() / 1000);

  // Set useEffect for fetching the web page if transaction status is change.
  useEffect(() => {
    console.log("Transaction Status Updated:", txStatus);
  }, [txStatus]);

  // Declare variable transaction that its value is a function.
  // In this function, execute axios and use post method with HTTP server endpoint.
  // Send object that contain symbol, price and timestamp.
  // If it's finish, set transaction hash to its state
  // Execute statusMonitor with the hash
  // If error, it will show error in console.log
  const transaction = async () => {
    try {
      const response = await axios.post(
        "https://mock-node-wgqbnxruha-as.a.run.app/broadcast",
        {
          symbol: symbol,
          price: price,
          timestamp: timestamp,
        }
      );
      setTxHash(response.data.tx_hash);
      statusMonitor(response.data.tx_hash);
    } catch (error) {
      console.error("Error broadcasting transaction:", error.message);
    }
  };

  // Declare variable statusMonitor that its value is a function.
  // This function is receive hash as it's parameter.
  // Execute axios and use get method with HTTP server endpoint.
  // If it's finish, set transaction status to its state
  // If error, it will show error in console.log
  const statusMonitor = async (txHash) => {
    try {
      const response = await axios.get(
        `https://mock-node-wgqbnxruha-as.a.run.app/check/${txHash}`
      );
      setTxStatus(response.data.tx_status);
    } catch (error) {
      console.error("Error monitoring transaction:", error.message);
    }
  };

  // Web interface
  return (
    <div className="app">
      <h1 className="app-head">Broadcast Transaction</h1>
      <div className="input-style">
        <label htmlFor="symbol">symbol:</label>
        <input
          type="text"
          id="symbol"
          // Logic for set the symbol from input text to symbol state.
          // Use toUpperCase() for change input symbol to uppercase letter.
          onChange={(e) => {
            setSymbol(e.target.value.toUpperCase());
          }}
          value={symbol}
        />
      </div>
      <div className="input-style">
        <label htmlFor="price">price:</label>
        <input
          type="number"
          id="price"
          // Logic for set the price from input number to price state.
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
        />
      </div>
      {/* Logic for sending object that contain symbol, price and timestamp to HTTP server if clicked. */}
      <button onClick={transaction}>submit</button>
      {/* If its get status from response, display this part. */}
      {txStatus && <p>Transaction Status: {txStatus}</p>}
    </div>
  );
}
export default App;
