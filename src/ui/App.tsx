import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useStatistics } from './useStatistics'
import { Chart } from './Chart'

function App() {
  const [count, setCount] = useState(0)
  const statistics = useStatistics(10)
  const [activeView, setActiveView] = useState<View>("CPU")

  const cpuUsages = useMemo(() => statistics.map(stat => stat.cupUsage), [statistics])
  const ramUsages = useMemo(() => statistics.map(stat => stat.ramUsage), [statistics])
  const storageUsages = useMemo(() => statistics.map(stat => stat.storageData), [statistics])

  const activeUsages = useMemo(() => {
    switch(activeView) {
      case "CPU":
        return cpuUsages;
      case "RAM":
        return ramUsages;
      case "STROAGE":
        return storageUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages])

  useEffect(() => {
    return window.electron.subscribeChangeView((view) => setActiveView(view));
  }, [])

  return (
    <>
      <div className='App'>
        <header>
          <button id='close' onClick={() => window.electron.sendFrameAction("CLOSE")}></button>
          <button id='minimize' onClick={() => window.electron.sendFrameAction("MINIMIZE")}></button>
          <button id='maxmize' onClick={() => window.electron.sendFrameAction("MAXMIZE")}></button>
        </header>
        <div style={{"height": 120}}>
          <Chart maxDataPoints={10} data={activeUsages}></Chart>
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
