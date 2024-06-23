import React, { useState, useEffect } from 'react';
import { Table, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusCircleOutlined } from '@ant-design/icons';
import { CustomButton } from "../../components/custom-button";
import { Event } from "@prisma/client";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { useGetAllEventsQuery } from "../../app/serivices/events";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import styles from './index.module.css';

const columns: ColumnsType<Event> = [
  {
    title: "НикНейм",
    dataIndex: "NickName",
    key: "NickName",
  },
  {
    title: "Телеграм",
    dataIndex: "Telegram",
    key: "Telegram",
  },
  {
    title: "Время",
    dataIndex: "Time",
    key: "Time",
  },
  {
    title: "Мероприятие",
    dataIndex: "NameEvent",
    key: "NameEvent",
  },
  {
    title: "Призовой Фонд",
    dataIndex: "Prize",
    key: "Prize",
  },
  {
    title: "Статус",
    dataIndex: "Status",
    key: "Status",
  },
];

export const Events = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const { data, isLoading } = useGetAllEventsQuery();
  
    useEffect(() => {
      if (!user) {
        navigate("/login");
      }
    }, [user, navigate]);
  
    const gotToAddUser = () => navigate(Paths.eventAdd);
  
    return (
      <Layout>
        
        <CustomButton type="primary" onClick={gotToAddUser} icon={ <PlusCircleOutlined /> }>
          Добавить
        </CustomButton>
        
        <Table
          loading={isLoading}
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={data}
          pagination={false}
          onRow={(record) => {
            return {
              onClick: () => navigate(`${Paths.event}/${record.id}`),
            };
          }}
        />
        
      </Layout>
    );
  };