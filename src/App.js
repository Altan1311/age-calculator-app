import React, { useState } from 'react'


function App() {
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: ""
  })

  const [age, setAge] = useState({
    day: "",
    month: "",
    year: ""
  })

  const [error, setError] = useState({
    day: "",
    month: "",
    year: ""
  })

  const resetForms = () => {
    for(let key in formData){
      const title = document.getElementById("input-title-" + key)
      const form = document.getElementById(key)
      const errContainer = document.getElementById("error-" + key)

      title.style.color = "hsl(0, 1%, 44%)"
      form.style.borderColor = "hsl(0, 0%, 86%)"
      errContainer.style.visibility = "hidden"
    }
  }

  const handleInput = (e) => {
    setFormData(prev => ({...prev, [e.target.id]: e.target.value}))
    setError({
      day: "",
      month: "",
      year: ""
    })

    resetForms()
  }

  const handleError = (err, input) => {
    const title = document.getElementById("input-title-" + input)
    const form = document.getElementById(input)
    const errContainer = document.getElementById("error-" + input)

    title.style.color = "hsl(0, 100%, 67%)"
    form.style.borderColor = "hsl(0, 100%, 67%)"
    errContainer.style.visibility = "visible"

    setAge({
      day: "",
      month: "",
      year: ""
    })
    if(err === "empty"){
      
      errContainer.textContent = "This field is required"
    }else if(err === "invalid"){
      errContainer.textContent = "Must be a valid " + input
    }else{
      errContainer.textContent = "Must be in the past"
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let err = false;
    for(let key in formData){
      if(formData[key] === ""){
        handleError("empty", key)
        err = true
      }else if(isNaN(Number(formData[key]))){
        handleError("invalid", key)
        err = true
      }
    }

    const currentDate = new Date()
    const inputDate = new Date(formData.year, formData.month - 1, formData.day)
    
    let timediff = currentDate - inputDate

    if(timediff < 0){
      handleError("future", "day")
      handleError("future", "month")
      handleError("future", "year")
      err = true
    }

    if(err) return

    const year = parseInt(timediff / 31557600000)
    timediff -= year * 31557600000

    const month = parseInt(timediff / 2592000000)
    timediff -= month * 2592000000

    const day = parseInt(timediff / 86400000)

    setAge({
      day: day,
      month: month,
      year: year
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="input-container">
            <label 
              className="input-title" 
              id="input-title-day"
              htmlFor="day"
            >
              Day
            </label>
            <input 
              type="text" 
              placeholder="DD"
              className="input"
              id="day"
              value={formData.day}
              onChange={handleInput}
              autoComplete="off"
              maxLength={2}
            />
            <p id="error-day" className="error">
              This field is required
            </p>
          </div>
          <div className="input-container">
            <label 
              className="input-title" 
              id="input-title-month"
              htmlFor="month"
            >
              Month
            </label>
            <input 
              type="text"
              placeholder="MM"
              className="input"
              id="month"
              value={formData.month}
              onChange={handleInput}
              autoComplete="off"
              maxLength={2}
            />
            <p id="error-month" className="error">
              This field is required
            </p>
          </div>
          <div className="input-container">
            <label 
              className="input-title" 
              id="input-title-year"
              htmlFor="year"
            >
              Year
            </label>
            <input 
              type="text"
              placeholder="YYYY"
              className="input"
              id="year"
              value={formData.year}
              onChange={handleInput}
              autoComplete="off"
              maxLength={4}
            />
            <p id="error-year" className="error">
              This field is required
            </p>
          </div>
        </div>

        <div className="divider">
          <button className="button">
            <img src="/assets/icon-arrow.svg" alt="icon" />
          </button>
        </div>
      </form>
    	<div className="result">
        <p className="result-item"><span className="age">{!(age.year === "") ? age.year : "--"}</span> years</p>
        <p className="result-item"><span className="age">{!(age.month === "") ? age.month : "--"}</span> months</p>
        <p className="result-item"><span className="age">{!(age.day === "") ? age.day : "--"}</span> days</p>
      </div>
      
    </>
  );
}

export default App;
