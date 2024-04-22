import React, { useState, useEffect } from "react";

export const SimpleCounter = () => {

    const [counter, setCounter] = useState(0);
    const [started, setStarted] = useState(false);
    const [countDown, setCountDown] = useState(false);
    const [status, setStatus] = useState({
        title: 'Clock',
        icon: 'fas fa-clock',
        titleStyle: 'text-primary'
    })

    const handleStart = () => {
        setStarted(!started);
        setStatus({
            title: 'Chronometer',
            icon: 'fas fa-stopwatch',
            titleStyle: 'text-success'
        })
    }

    const handleCountDown = () => {
        setCountDown(true);
        setStarted(true);
        let countDownNumber = document.querySelector('#countDown')

            if (countDownNumber.value !== '') {
                setCounter(parseInt(countDownNumber.value));
            }
        setStatus({
            title: 'Chronometer',
            icon: 'fas fa-stopwatch',
            titleStyle: 'text-success'
        })
    }
    const handleReset = () => {
        setCountDown(false);
        setCounter(0)
        setStarted(false);
        setStatus({
            title: 'Clock',
            icon: 'fas fa-clock',
            titleStyle: 'text-primary'
        })
    }

    useEffect(() => {
        if (started) {
            const interval = setInterval(() => {
                if (countDown) {
                    if (counter === 0) {
                        setStarted(false)
                        setCountDown(false)
                        clearInterval(interval);
                      } else {
                        setCounter(counter => counter - 1);
                      }
                } else {
                    setCounter(counter => counter + 1);
                }
            }, 1000)  
            return () => clearInterval(interval)

        }
    }, [started, countDown, counter]);

    return (
        <div className="container">
            <h1>Simple Counter</h1>
            <h2 className={status.titleStyle}>{status.title}</h2>
            <div className="big-counter">
                <div><i className={status.icon}></i></div>
                <div>{Math.floor(counter / 10000 % 10)}</div>
                <div>{Math.floor(counter / 1000 % 10)}</div>
                <div>{Math.floor(counter / 100 % 10)}</div>
                <div>{Math.floor(counter / 10 % 10)}</div>
                <div>{Math.floor(counter % 10)}</div>
            </div>
            <div>
                <button onClick={handleStart} className="btn btn-outline-success">{started ? 'Pause' : counter > 0 ? 'Restart' : 'Start'}</button>
                <button onClick={handleReset} className="btn btn-outline-danger">Reset</button>
            </div>
            <div className="row">
                <div className="col-2">
                    <button onClick={handleCountDown} className="btn btn-outline-warning my-0">Send</button>
                </div>
                <div className="col-10">
                    <input type="text" className="form-control" id="countDown" placeholder="Count Number" />
                </div>
            </div>
        </div>
    )
}