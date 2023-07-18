import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import alarmSound from '../assests/alarmSound.mp3'



export default function Timer() {
  let [min, setMin] = useState(0);
  let [sec, setSec] = useState(0);
  let [time, setTime] = useState(0);
  let [sound, setSound] = useState(false);
  let intervalId = useRef(null);



  useEffect(() => {
    const clearTimer = () => {
      clearInterval(intervalId.current);
      console.log("last")
    }
    return clearTimer;
  }, [])



  const startTimer = () => {
    setSound(false)
    if (intervalId.current != null) {
      return;
    }
    if (time == 0) {
      setTime((min * 60) + sec)
    }

    intervalId.current = setInterval(() => {
      setTime((prev) => {
        if (prev == 1) {
          clearInterval(intervalId.current);
          intervalId.current = null
          setSound(true);

        }
        return prev - 1;
      })
    }, 1000)
  }

  const stopTimer = () => {
    clearInterval(intervalId.current)
    intervalId.current = null
  }

  const resetTimer = () => {
    stopTimer();
    setTime(0);
    // setMin(0);
    // setSec(0);
  }
  let play=()=>{
    new Audio(alarmSound).play();
    setSound(false)
  }
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  return (
    <div style={{ textAlign: "center", width: "50%", margin: "200px auto", border: "1px solid grey", padding: "50px" }}>
      <h1 >Timer : {formatTime(time)}</h1>
      <div>
        <div
          style={time > 0 ? { display: "none" } : { display: "block" }}>
          <input type="number" onChange={(e) => { setMin(Number(e.target.value)) }} />Minutes
          <input type="number"  onChange={(e) => { setSec(Number(e.target.value)) }} />Seconds
        </div>



        <button  style={ {background:"green",color:"white"}} onClick={startTimer} disabled={min == 0 && sec == 0 ? true : false}>{time>0?"Resume":"Start"}</button>
        <button  style={time <= 0 ? { display: "none"} : { display: "inline" ,background:"red",color:"white"}} onClick={stopTimer} >Pause</button>
        <button  style={time <= 0 ? { display: "none"} : { display: "inline" ,background:"blue",color:"white"}}onClick={resetTimer} >Reset</button>
      </div>
  
      {sound ? play():null}
    
    </div>
  )
}
