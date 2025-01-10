import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useStatistics } from './useStatistics'
import { Chart } from './Chart'

function App() {
  const [count, setCount] = useState(0)

  const statistics = useStatistics(10)

  const cpuUsages = useMemo(() => statistics.map(stat => stat.cupUsage), [statistics])

  useEffect(() => {
    alert(2)
    // window.electron.subscribeChangeView((view) => console.log(view))
  }, [])

  return (
    <>
      <div>
        <div style={{"height": 120}}>
          <Chart maxDataPoints={10} data={cpuUsages}></Chart>
        </div>
        
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
