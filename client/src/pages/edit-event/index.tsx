import { Event } from "@prisma/client";
import { Row } from "antd";
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useEditEventMutation, useGetEventQuery } from "../../app/serivices/events";
import { EventForm } from "../../components/event-form";
import { Layout } from "../../components/layout";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

export const EditEvent = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetEventQuery(params.id || "");
  const [editEvent] = useEditEventMutation();

  if (isLoading) {
    return <span>Загрузка</span>
  }

  const handleEditUser = async (event: Event) => {
    try {
      const editedEvent = {
        ...data,
        ...event
      };

      await editEvent(editedEvent).unwrap();

      navigate(`${Paths.statusEvent}/updated`);
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
      <Row align="middle" justify="center">
        <EventForm
          onFinish={handleEditUser}
          title="Редактировать мероприятие"
          event={data}
          btnText="Редактировать"
          error={ error }
        />
      </Row>
    </Layout>
  );
};
