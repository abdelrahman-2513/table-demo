import { useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TableComponent from './components/Table/Table';

const App = () => {
  const queryClient = useQueryClient()
  return (
    <div className="app-container">
      <TableComponent />
      <ReactQueryDevtools initialIsOpen={true} />
    </div>
  )
};

export default App;
