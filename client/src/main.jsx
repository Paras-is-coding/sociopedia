import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import {store,persistor} from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import Routing from './routing/routingConfig.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
                <Routing/>
         </PersistGate>
    </Provider>
  </React.StrictMode>,
)
