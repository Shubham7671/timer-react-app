import React, { useEffect } from 'react'
import { useState } from 'react'

export default function Timer() {
  let [min, setMin] = useState(0);
  let [sec, setSec] = useState(0);
  let [time, setTime] = useState(0);
  let [intervalId, setIntervalId] = useState(null);


  useEffect(() => {

    const clearTimer = () => {
      clearInterval(intervalId);
    }

    return clearTimer;
  }, [])



  const startTimer = () => {

    if (intervalId != null) {
      return;
    }
    if (time == 0) {
      setTime((min * 60) + sec)
    }

    setIntervalId(setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000))
  }
  const stopTimer = () => {
    clearInterval(intervalId)
    setIntervalId(null);
  }
  const resetTimer = () => {
    stopTimer();
    setTime(0);
    setMin(0);
    setSec(0);


  }

  return (
    <div style={{ textAlign: "center", width: "50%", margin: "200px auto", border: "2px solid black", padding: "50px" }}>
      <h1 >Timer : {time}</h1>
      <div>
        <div
          style={time > 0 ? { display: "none" } : { display: "block" }}>
          <input type="number" onChange={(e) => { setMin(Number(e.target.value)) }} />Minutes
          <input type="number" onChange={(e) => { setSec(Number(e.target.value)) }} />Seconds
        </div>



        <button onClick={startTimer} >Start</button>
        <button onClick={stopTimer} >Stop</button>
        <button onClick={resetTimer} >Reset</button>
      </div>
    </div>
  )
}
