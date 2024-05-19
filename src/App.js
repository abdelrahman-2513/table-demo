import { useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TableComponent from './components/Table/Table';
import CretePost from './components/CreatePost/CretePost';

const App = () => {
  const queryClient = useQueryClient()
  return (
    <div className="app-container">
      <CretePost />
      <TableComponent />
      <ReactQueryDevtools initialIsOpen={true} />
    </div>
  )
};

export default App;
