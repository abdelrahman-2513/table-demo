import { useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Tabs } from 'antd';

// Components --------------------------------------------------------------------------------------------------------------------------
import CreateProduct from './components/CreateProduct/createProduct';
import DeleteProduct from './components/DeleteProduct/DeleteProduct';
import UpdateProduct from './components/UpdateProduct/UpdateProduct';
import Products from './components/Products/Products';


const items = [{
  key: 1,
  label: "Products",
  children: <Products />
}, {
  key: 2,
  label: "Create",
  children: <CreateProduct />
}, {
  key: 3,
  label: "Update",
  children: <UpdateProduct />
}, {
  key: 4,
  label: "Delete",
  children: <DeleteProduct />
}]
const App = () => {
  const queryClient = useQueryClient({

  })
  return (
    <div className="app-container">

      <Tabs defaultActiveKey="1" items={items} />
      <ReactQueryDevtools initialIsOpen={true} />
    </div>
  )
};

export default App;
