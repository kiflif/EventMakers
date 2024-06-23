import { Feedback } from "@prisma/client";
import { Form, Card, Space } from "antd";
import { CustomButton } from "../custom-button";
import { CustomInput } from "../custom-input";
import { ErrorMessage } from "../error-message";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  Feedback?: T;
};

export const FeedbackForm = ({
  onFinish,
  title,
  Feedback,
  btnText,
  error,
}: Props<Feedback>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="add-feedback" onFinish={onFinish} initialValues={Feedback}>
        <CustomInput type="text" name="Name" placeholder="Ваше имя" />
        <CustomInput name="Contact" placeholder="Контактная связь с вами (TG/VK)" />
        <CustomInput type="text" name="Suggestion" placeholder="Ваше предложение" />
        <Space direction="vertical" size="large">
          <ErrorMessage message={ error } />
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  );
};
