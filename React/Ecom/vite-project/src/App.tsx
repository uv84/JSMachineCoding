import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
import { Layout } from './components/common/Layout';
import { ReduxDemo } from './pages/ReduxDemo';
import './styles/globals.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ReduxDemo />
        </Layout>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
