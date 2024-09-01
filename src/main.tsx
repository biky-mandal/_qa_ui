import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { Suspense } from 'react'
import Loading from './components/Loading.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Suspense>
  </Provider>
)
