import { Row } from "antd";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useAddFeedbackMutation } from "../../app/serivices/events";
import { Feedback } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { Paths } from "../../paths";
import { FeedbackForm } from "../../components/feedback-form";

export const AddFeedback = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [addFeedback] = useAddFeedbackMutation();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleAddFeedback = async (data: Feedback) => {
    try {
      await addFeedback(data).unwrap();

      navigate(`${Paths.status}/created`);
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
        <FeedbackForm
          onFinish={handleAddFeedback}
          title="Обратная связь"
          btnText="Обратиться"
          error={error}
        />
    </Row>
  </Layout>
  );
};
