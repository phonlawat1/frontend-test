import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { deleteFormData } from "../slice/formSlice";

interface DataType {
  id: React.Key;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

function table({ dataform, handleEdit }: any) {
  const { t, i18n } = useTranslation(["home"]);
  const dispatch = useDispatch();

  const [columns, setColumns] = useState<TableColumnsType<DataType>>([]);

  useEffect(() => {
    const setLocalizedColumns = () => {
      setColumns([
        {
          title: t("Id"),
          dataIndex: "id",
          key: "id",
        },
        {
          title: t("Firstname"),
          dataIndex: "firstName",
          key: "firstName",
          sorter: (a, b) => a.firstName.localeCompare(b.firstName),
        },
        {
          title: t("Lastname"),
          dataIndex: "lastName",
          key: "lastName",
          sorter: (a, b) => a.lastName.localeCompare(b.lastName),
        },
        {
          title: t("Email"),
          dataIndex: "email",
          key: "email",
          sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
          title: t("Phone"),
          dataIndex: "phone",
          key: "phone",
          sorter: (a, b) => a.phone.localeCompare(b.phone),
        },
        {
          title: t("Edit"),
          key: "edit",
          fixed: "right",
          width: 100,
          render: (record: DataType) => (
            <a onClick={() => handleEdit(record)}>{t("Edit")}</a>
          ),
        },
        {
          title: t("Delete"),
          key: "delete",
          fixed: "right",
          width: 100,
          render: (record: DataType) => (
            <a onClick={() => handleDelete(record)}>{t("Delete")}</a>
          ),
        },
      ]);
    };

    setLocalizedColumns();
  }, [t]);

  const handleDelete = (record: any) => {
    dispatch(deleteFormData(record.id));
  };

  const handleTableChange = (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => {
    console.log(sorter); // แสดงข้อมูลการเรียงลำดับที่ผู้ใช้ทำ
    setColumns((prevColumns) => {
      // อัพเดท sorter ใน columns โดยใช้ค่า sorter จากการเรียงลำดับที่ผู้ใช้ทำ
      const newColumns = [...prevColumns];
      newColumns.forEach((column) => {
        if (column.key === sorter.field) {
          column.sortOrder = sorter.order;
        } else {
          column.sortOrder = undefined;
        }
      });
      return newColumns;
    });
  };

  return (
    <div>
      <Table
        className="table"
        dataSource={dataform}
        columns={columns}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default table;
