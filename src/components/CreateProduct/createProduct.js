
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, InputNumber, message } from 'antd';

// API ---------------------------------------------------------------------------------------------------------------------------
import { addProduct } from '../../assets/axios/api';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
function CreateProduct() {
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();

    // mutation for creating new product
    const AddProductMutation = useMutation({
        mutationKey: ["AddProduct"],
        mutationFn: addProduct,
        onSuccess: (data) => {

            queryClient.setQueryData(["products"], (oldData) => {
                if (!oldData) return;

                // Adding the created product to the top of the first page
                const newPages = [...oldData.pages];
                newPages[0].data = [data, ...newPages[0].data];


                return { ...oldData, pages: newPages };
            });
            messageApi.info("New Product added!")
        },
        onError: (err) => {
            messageApi.error("Cannot add data")
        }
    })



    const onFinish = (values) => {
        console.log(values);
        values.images = [values.images];
        AddProductMutation.mutate(values)
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
                    name={"title"}
                    label="Product Title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={"categoryId"}
                    label="Product Category"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name={"description"}
                    label="Product Description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
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

                <Form.Item name={"images"} label="Product Image" rules={[
                    {
                        required: true,
                    },
                ]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={AddProductMutation.isPending}>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default CreateProduct
