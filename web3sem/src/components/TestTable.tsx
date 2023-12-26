import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

interface DataType {
  key: string;
  name: string;
  year: number;
  description: string;
  genres: string[];
}

const TestTable: React.FC = () => {
  const [tableData, setTableData] = useState<DataType[]>([
    {
      key: "1",
      name: "СуперИвановы",
      year: 2023,
      description: "СуперИвановы",
      genres: ["Комедия", "Фантастика"],
    },
    {
      key: "2",
      name: "Супер-Ивановы",
      year: 2023,
      description: "СуперИвановы",
      genres: ["Комедия", "Фантастика"],
    },
    {
      key: "3",
      name: "СуперИвановы",
      year: 2023,
      description: "СуперИвановы",
      genres: ["Комедия", "Фантастика"],
    },
    {
      key: "4",
      name: "СуперИвановы",
      year: 2023,
      description: "СуперИвановы",
      genres: ["Комедия", "Фантастика"],
    },
  ]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Год",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Жанры",
      key: "genres",
      dataIndex: "genres",
      render: (_, { genres }) => (
        <>
          {genres.map((genre) => {
            const color = "geekblue";
            return (
              <Tag color={color} key={genre}>
                {genre.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Действие",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Изменить</a>
          <a onClick={() => handleDelete(record.key)}>Удалить</a>
        </Space>
      ),
    },
  ];

  const handleDelete = (key: string) => {
    // Filter out the item with the specified key
    const updatedData = tableData.filter((item) => item.key !== key);
    setTableData(updatedData);
  };

  const paginationConfig = {
    pageSize: 3,
    total: tableData.length,
    showQuickJumper: true,
  };

  return (
    <Table columns={columns} dataSource={tableData} pagination={paginationConfig} />
  );
};

export default TestTable;
