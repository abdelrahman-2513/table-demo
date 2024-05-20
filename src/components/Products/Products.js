import "./Products.css"
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchProducts, fetchProductsByTitle } from "../../assets/axios/api";
import { Content } from "antd/es/layout/layout";
import { Button, Space, Typography } from "antd";
import Product from "../Product/Product";
import Search from "antd/es/input/Search";

function Products() {
    const queryClient = useQueryClient()
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
            console.log(lastPageParam)
            return lastPageParam + 1
        }
    });
    const productsMutation = useMutation({
        mutationKey: ["productMut"], mutationFn: fetchProductsByTitle, onSuccess: (data) => {
            console.log(data)
            queryClient.setQueryData(["products"], (oldData) => {
                oldData.pages = [data];
                console.log(oldData)
                return oldData
            })
        }
    })
    const onSearch = (value) => {
        console.log(value)
        productsMutation.mutate(value)
    }

    return (
        <>
            <Content
                style={{
                    overflow: 'initial',
                }}
                className={productsMutation.isPending ? "loading" : "main-container"}
            >
                <Typography.Title>Products</Typography.Title>
                <Space direction="vertical">
                    <Search
                        placeholder="Search by title"
                        onSearch={onSearch}
                        className="search-bar"
                        required={true}
                        name="title"
                        loading={productsMutation.isPending}
                    />
                </Space>

                <div className="products-container">

                    {data?.pages.map((page, i) => {
                        return page && page.map((product, i) => {

                            return <Product product={product} key={i} loading={isLoading} />
                        })
                    })}
                </div>
                <div className="btns">
                    <Button type="primary" onClick={() => fetchNextPage()} loading={isLoading || isFetchingNextPage || productsMutation.isPending} disabled={!hasNextPage}>Next</Button>
                </div>
            </Content>
        </>
    )
}

export default Products
