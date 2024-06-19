import "./Products.css"
import Search from "antd/es/input/Search";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Typography, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// components --------------------------------------------------------------------------------------------------
import Product from "../Product/Product";
// API ---------------------------------------------------------------------------------------------------------
import { fetchProducts, fetchProductsByTitle, sortData } from "../../assets/axios/api";


function Products() {
    const [messageApi, contextHolder] = message.useMessage()
    const queryClient = useQueryClient();

    const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage } =
        useInfiniteQuery({
            queryKey: ['products'],
            queryFn: fetchProducts,
            initialPageParam: 0,
            getNextPageParam: (lastPage) => lastPage.nextPage,
        });

    // mutation for mutating data on searching 
    const productsMutation = useMutation({
        mutationKey: ["productMut"], mutationFn: fetchProductsByTitle, onSuccess: (data) => {
            queryClient.setQueryData(["products"], (oldData) => {
                oldData.pages = [data];
                console.log(oldData)
                return oldData
            })
        }
    })
    // mutation used for sorting process
    const sortMutation = useMutation({
        mutationKey: ["sortedMutation"],
        mutationFn: sortData,
        onSuccess: (data) => {
            queryClient.setQueryData(["products"], (oldData) => {
                oldData.pages = [data];
                return oldData
            })
        }
    })
    const onSearch = (value) => {
        productsMutation.mutate(value)
    }

    const handleMenuClick = (e) => {
        console.log(e.key)
        if (e.key === 1)
            sortMutation.mutate({ data: data.pages.flat(1), sortBy: "price", dir: "desc" });


    };
    if (error)
        messageApi.error(error.message);
    return (
        <>
            {contextHolder}
            <Content
                style={{
                    overflow: 'initial',
                }}
                className={productsMutation.isPending ? "loading" : "main-container"}
            >
                <Typography.Title>Products</Typography.Title>
                <Space direction="horizental" >
                    <Search
                        placeholder="Search by title"
                        onSearch={onSearch}
                        className="search-bar"
                        required={true}
                        name="title"
                        loading={productsMutation.isPending}
                    />

                    <Dropdown.Button
                        loading={sortMutation.isPending}
                        menu={{
                            items: [{ label: "Price", key: 1 }, { label: "Name", key: 2 }],
                            onClick: handleMenuClick
                        }} placement="bottom" icon={<DownOutlined />}>
                        Sort by
                    </Dropdown.Button>
                </Space>

                <div className="products-container">

                    {data?.pages?.map((page, i) => {
                        return page && page.data.map((product, i) => {

                            return <Product product={product} key={i} loading={isFetchingNextPage} />
                        })
                    })}
                </div>
                <div className="btns">
                    <Button type="primary" onClick={() => fetchNextPage()} loading={isFetchingNextPage || productsMutation.isPending} disabled={!hasNextPage}>Next</Button>
                </div>
            </Content>

        </>
    )
}

export default Products
