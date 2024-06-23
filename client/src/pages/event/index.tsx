import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Descriptions, Space, Divider, Modal } from "antd";
import { CustomButton } from "../../components/custom-button";
import { useState } from "react";
import { Paths } from "../../paths";
import { useNavigate, Link, useParams, Navigate } from "react-router-dom";
import {
  useGetEventQuery,
  useRemoveEventMutation,
} from "../../app/serivices/events";
import { Layout } from "../../components/layout";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error-message";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

export const Event = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEventQuery(params.id || "");
  const [removeEvent] = useRemoveEventMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <span>Загрузка</span>;
  }

  if (!data) {
    return <Navigate to="/" />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    hideModal();

    try {
      await removeEvent(data.id).unwrap();

      navigate(`${Paths.statusEvent}/deleted`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Descriptions title="Информация о мероприятии" bordered>
        <Descriptions.Item
          label="НикНейм"
          span={3}
        >{`${data.NickName}`}</Descriptions.Item>
        <Descriptions.Item label="Телеграм" span={3}>
          {data.Telegram}
        </Descriptions.Item>
        <Descriptions.Item label="Время" span={3}>
          {data.Time}
        </Descriptions.Item>
        <Descriptions.Item label="Мероприятие" span={3}>
          {data.NameEvent}
        </Descriptions.Item>
        <Descriptions.Item label="Призовой фонд" span={3}>
          {data.Prize}
        </Descriptions.Item>
        <Descriptions.Item label="Статус" span={3}>
          {data.Status}
        </Descriptions.Item>
      </Descriptions>
      
        <>
          <Divider orientation="left">Действия</Divider>
          <Space>
            <Link to={`/event/edit/${data.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
                Редактировать
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Удалить
            </CustomButton>
          </Space>
        </>
      
      <ErrorMessage message={error} />
      <Modal
        title="Подтвердите удаление"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить мероприятие из таблицы?
      </Modal>
    </Layout>
  );
};
