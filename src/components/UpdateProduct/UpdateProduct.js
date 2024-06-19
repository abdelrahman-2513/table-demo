
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, message } from 'antd';

// API ---------------------------------------------------------------------------------------------------------------------------
import { updateProduct } from '../../assets/axios/api';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
function UpdateProduct() {
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();

    // Mutation for updating the product
    const UpdateProductMutation = useMutation({
        mutationKey: ["UpdateProduct"],
        mutationFn: updateProduct,
        onSuccess: (updateddata) => {
            queryClient.setQueryData(["products"], (oldData) => {
                if (!oldData) return;


                // Deeply coping the data of pages includes the current page and next page
                let newPages = oldData.pages.map(page => {
                    const data = page.data.map(product => {
                        if (product.id === updateddata.id) {
                            return updateddata;
                        }
                        return product;
                    })
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

            messageApi.success("Product updated successfully!");
        },
        onError: (err) => {
            messageApi.error("Cannot update data")
        }
    })



    const onFinish = (values) => {
        console.log(values);
        UpdateProductMutation.mutate(values)
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
                    label="Product Id"
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
                    name={"title"}
                    label="Product Title"

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={"category"}
                    label="Product Category"

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={"description"}
                    label="Product Description"

                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name={"price"}
                    label="Product Price"
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

                <Form.Item name={"image"} label="Product Image" >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={UpdateProductMutation.isPending}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default UpdateProduct
