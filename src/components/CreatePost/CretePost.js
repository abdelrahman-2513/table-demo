import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button, Form, Input, InputNumber, Typography } from "antd";
import { addPost } from "../../assets/axios/api";

function CretePost() {
    const queryClient = useQueryClient();
    const postMutation = useMutation({
        mutationKey: ["postsMutation"], mutationFn: addPost,
        onSuccess: (data, variables, context) => {
            queryClient.setQueryData(["posts"], (oldData) => {
                console.log(oldData)
                return {
                    data: [...oldData.data, data],
                    total: oldData.total + 1,
                }
            })
        },
        onError: (err) => {
            console.log(err);
        }
    })

    const handleAddPost = (values) => {
        console.log(values)
        postMutation.mutate(values)
    }
    return (
        <Form onFinish={handleAddPost} style={{
            maxWidth: 600,
            margin: "5px auto"
        }}>
            <Typography.Title>Add post</Typography.Title>
            <Form.Item name="id" label="Post id" required={[{ required: true, messgae: "Please enter post id" }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name="title" label="Post title" required={[{ required: true, messgae: "Please enter post title" }]}>
                <Input />
            </Form.Item>
            <Form.Item name="content" label="Post Content" required={[{ required: true, messgae: "Please enter post id" }]}>
                <Input />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit" loading={postMutation.isPending}>Submit</Button>
            </Form.Item>
        </Form>
    )
}

export default CretePost
