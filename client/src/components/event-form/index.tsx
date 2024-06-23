
import { Event } from "@prisma/client";
import { Form, Card, Space } from "antd";
import { CustomButton } from "../custom-button";
import { CustomInput } from "../custom-input";
import { ErrorMessage } from "../error-message";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  event?: T;
};

export const EventForm = ({
  onFinish,
  title,
  event,
  btnText,
  error,
}: Props<Event>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="add-event" onFinish={onFinish} initialValues={event}>
       <CustomInput  name="NickName" placeholder="НикНейм" />
        <CustomInput name="Telegram" placeholder="Телеграм" />
        <CustomInput name="Time" placeholder="Время забива" />
        <CustomInput name="NameEvent" placeholder="Название мероприятия" />
        <CustomInput name="Prize" placeholder="Призовой Фонд" />
        <CustomInput name="Status" placeholder="Статус мероприятия" />
        <Space direction="vertical" size="large">
          <ErrorMessage message={ error } />
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  );
};
