import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Table } from 'antd';
import { fetchData } from "../../assets/axios/api";

function TableComponent() {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const [sorter, setSorter] = useState({
        field: null,
        order: null,
    });

    const { data: posts, isLoading } = useQuery({ queryKey: ['posts'], queryFn: fetchData });

    // Apply sorting and pagination to the data


    const handleTableChange = (pagination, filters, sorter) => {
        setPagination({
            current: pagination.current,
            pageSize: pagination.pageSize,
        });
        setSorter({
            field: sorter.field,
            order: sorter.order,
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
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
            loading={isLoading}
            onChange={handleTableChange}
        />
    );
}

export default TableComponent
