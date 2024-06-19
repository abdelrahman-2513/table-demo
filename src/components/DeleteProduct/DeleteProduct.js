
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form, InputNumber, message } from 'antd';

// API ---------------------------------------------------------------------------------------------------------------------------
import { deleteProduct } from '../../assets/axios/api';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
function DeleteProduct() {
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();


    // The Mutation used for Deleting the product
    const DeleteProductMutation = useMutation({
        mutationKey: ["deleteProduct"],
        mutationFn: deleteProduct,
        onSuccess: (deletedData) => {

            queryClient.setQueryData(["products"], (oldData) => {
                if (!oldData) return;


                // deeply filtering out the product by serching the products
                const newPages = oldData.pages.map(page => {
                    const data = page.data.filter(product => product.id !== deletedData)
                    return {
                        data,
                        currentPage: page.currentPage,
                        nextPage: page.nextPage
                    }
                }
                );

                return {
                    ...oldData,
                    pages: newPages
                };
            });

            messageApi.info("Product deleted!");
        },
        onError: (err) => {
            messageApi.error("Cannot delete data");
        }
    });



    const onFinish = (values) => {
        console.log(values.id);
        DeleteProductMutation.mutate(values.id)
    };

    return (
        <>
            {contextHolder}
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
            >

                <Form.Item
                    name={"id"}
                    label="Product ID"
                    rules={[
                        {
                            type: 'number',
                            min: 1,
                            max: 1000,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>



                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={DeleteProductMutation.isPending}>
                        Delete
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default DeleteProduct
