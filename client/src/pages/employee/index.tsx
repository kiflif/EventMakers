import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Descriptions, Space, Divider, Modal } from "antd";
import { CustomButton } from "../../components/custom-button";
import { useState, useEffect } from "react";
import { Paths } from "../../paths";
import { useNavigate, Link, useParams, Navigate } from "react-router-dom";
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../app/serivices/employees";
import { Layout } from "../../components/layout";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error-message";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import dayjs from 'dayjs';

export const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!data) {
      return; // Ранний возврат, если данные ещё не загружены
    }

    const now = dayjs();
    const interval = setInterval(() => {
      const daysOnPost = data.date ? Math.max(dayjs().diff(dayjs(data.date), 'day'), 0) : 0;
      setDaysOnPost(daysOnPost);
    }, 24 * 60 * 60 * 1000); // Обновляем каждый день

    return () => clearInterval(interval);
  }, [data]);

  const [daysOnPost, setDaysOnPost] = useState<number>(0);

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
      await removeEmployee(data.id).unwrap();

      navigate(`${Paths.status}/deleted`);
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
      <Descriptions title="Информация о сотруднике" bordered>
        <Descriptions.Item label="Имя" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Возраст" span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label="Адрес" span={3}>
          {data.address}
        </Descriptions.Item>
        <Descriptions.Item label="Дата постановления" span={3}>
          {data.date}
        </Descriptions.Item>
        <Descriptions.Item label="Предупреждения" span={3}>
          {data.warnings}
        </Descriptions.Item>
        <Descriptions.Item label="Выговоры" span={3}>
          {data.reprimands}
        </Descriptions.Item>
        <Descriptions.Item label="Количество дней на посту" span={3}>
          {daysOnPost}
        </Descriptions.Item>
      </Descriptions>

      <>
        <Divider orientation="left">Действия</Divider>
        <Space>
          <Link to={`/employee/edit/${data.id}`}>
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
        visible={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить сотрудника из таблицы?
      </Modal>
    </Layout>
  );
};
