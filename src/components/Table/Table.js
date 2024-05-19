import { useMutationState, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Table } from 'antd';
import { fetchData } from "../../assets/axios/api";

function TableComponent() {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });


    const queryClient = useQueryClient()

    const { data: posts, isLoading } = useQuery({ queryKey: ['posts'], queryFn: fetchData, staleTime: 5 * 1000 });
    const postsMutation = useMutationState({ filters: { mutationKey: ["postsMutation"] }, select: (mut) => mut.state.status }, queryClient).slice().pop();
    // Apply sorting and pagination to the data


    const handleTableChange = (pagination, sorter) => {
        setPagination({
            current: pagination.current,
            pageSize: pagination.pageSize,
        });

    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Body',
            dataIndex: 'content',
        },
    ];

    return (
        <Table
            columns={columns}
            rowKey="id"
            dataSource={posts?.data}
            pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: posts?.total,
            }}
            sortDirections={['ascend', 'descend']}
            loading={isLoading || postsMutation && postsMutation === "pending"}
            onChange={handleTableChange}
        />
    );
}

export default TableComponent
