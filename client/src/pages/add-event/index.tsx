
import { Row } from "antd";
import { useState } from "react";
import { EventForm } from "../../components/event-form"
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useAddEventMutation } from "../../app/serivices/events";
import { Event } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { Paths } from "../../paths";

export const AddEvent = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [addEvent] = useAddEventMutation();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleAddEvent = async (data: Event) => {
    try {
      await addEvent(data).unwrap();

      navigate(`${Paths.statusEvent}/created`);
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
          onFinish={handleAddEvent}
          title="Добавить мероприятие"
          btnText="Добавить"
          error={error}
        />
    </Row>
  </Layout>
  );
};
