import React, { useState, useEffect } from 'react';
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusCircleOutlined } from '@ant-design/icons';
import { CustomButton } from "../../components/custom-button";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { useGetAllEmployeesQuery } from "../../app/serivices/employees";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import dayjs from 'dayjs';
import styles from './index.module.css';

interface EmployeeWithDays extends Employee {
  daysOnPost: number;
}

const columns: ColumnsType<EmployeeWithDays> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Телеграм",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Дата постановления",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Предупреждения",
    dataIndex: "warnings",
    key: "warnings",
  },
  {
    title: "Выговоры",
    dataIndex: "reprimands",
    key: "reprimands",
  },
  {
    title: "Количество дней на посту",
    dataIndex: "daysOnPost",
    key: "daysOnPost",
  },
];

export const Employees = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllEmployeesQuery();
  const [employees, setEmployees] = useState<EmployeeWithDays[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const updateDaysOnPost = () => {
    if (data) {
      const updatedEmployees = data.map(employee => {
        const daysOnPost = employee.date ? Math.max(dayjs().diff(dayjs(employee.date), 'day'), 0) : 0;
        return { ...employee, daysOnPost };
      });
      setEmployees(updatedEmployees);
    }
  };

  useEffect(() => {
    updateDaysOnPost();

    const now = dayjs();
    const nextUpdate = now.endOf('day').add(1, 'second');
    const msUntilNextUpdate = nextUpdate.diff(now);

    const timerId = setTimeout(() => {
      updateDaysOnPost();
      setInterval(updateDaysOnPost, 24 * 60 * 60 * 1000); // обновлять каждый день
    }, msUntilNextUpdate);

    return () => clearTimeout(timerId);
  }, [data]);

  const gotToAddUser = () => navigate(Paths.employeeAdd);

  return (
    <Layout>
      <CustomButton type="primary" onClick={gotToAddUser} icon={ <PlusCircleOutlined /> }>
        Добавить
      </CustomButton>
      
      <Table
        loading={isLoading}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={employees}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};
