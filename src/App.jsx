import { Route, Routes } from 'react-router-dom'
import Reducer from './Reducer'
// import NoReducer from './NoReducer/NoReducer'
import ReducerSaved from './ReducerSaved'

function App () {
  return (        
    <Routes>      
      {/* <Route
        key={"reducer"}
        path={'/'}
        element={<Reducer/>}
      />
      <Route
        key={"Noreducer"}
        path={'/noreducer'}
        element={<NoReducer/>}
      /> */}
      <Route
        key={"reducerSaved"}
        path={'/'}
        element={<ReducerSaved/>}
      />
    </Routes>    
  )
}

export default App
