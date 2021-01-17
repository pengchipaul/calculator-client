import React, { useState, useEffect } from 'react';

import { IRecord } from './types/RecordType'
import NavigationBar from './components/layout/NavigationBar'
import CalculatorContainer from './pages/CalculatorContainer'
import ReportContainer from './pages/ReportContainer'

export enum Pages {
  Calculator = 'Calculator',
  Report = 'Report'
}

function App() {

  const [page, setPage] = useState(Pages.Calculator) // default page set to "Calculator"

  const [history, setHistory] = useState<IRecord[]>([])

  const addRecord = (record: IRecord) => {
    setHistory(history.concat(record))
  }

  return (
    <div className="App">
      <NavigationBar title={page} setPage={setPage} />
      {page === Pages.Calculator && <CalculatorContainer addRecord={addRecord} />}
      {page === Pages.Report && <ReportContainer records={history} />}
    </div>
  );
}

export default App;
