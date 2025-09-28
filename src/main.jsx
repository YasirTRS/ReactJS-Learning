import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import AppContext from './AppContext.jsx'
import ApiTableApp from './ApiTableApp.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <div className='my-15'>
      <hr />
    </div>
    <AppContext />
    <div className='my-15'>
      <hr />
    </div>
    <ApiTableApp />
  </Provider>,
)
