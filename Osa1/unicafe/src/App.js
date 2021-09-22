import React, { useState } from 'react'

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <th style={{'textAlign': 'left'}}>{text}</th>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    const average = ((good - bad) / total)
    const positive = (good / total) * 100 + '    %'

    return (
        <div>
            <h1>Statistics</h1>
            {total ? (
                <table className='feedback-container'>
                    <tbody>
                        <StatisticLine text='good' value={good}/>
                        <StatisticLine text='neutral' value={neutral}/>
                        <StatisticLine text='bad' value={bad}/>
                        <StatisticLine text='all' value={total}/>
                        <StatisticLine text='average' value={average}/>
                        <StatisticLine text='positive' value={positive}/>
                    </tbody>
                </table>
            ) :
                <p>No feedback given</p>
            }
        </div>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    return (
      <div>
          <h1>༼ つ ◕_◕ ༽つ Gibe feedback ༼ つ ◕_◕ ༽つ</h1>
          <div className='button-container'>
              <button onClick={() => setGood(good + 1)}>Good</button>
              <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
              <button onClick={() => setBad(bad + 1)}>Bad</button>
          </div>
          <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    )
}

export default App