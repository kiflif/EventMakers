import { Button, Result, Row } from "antd";
import { Link, useParams } from "react-router-dom";

const Statuses: Record<string, string> = {
  created: "Мероприятие успешно создано",
  updated: "Мероприятие успешно обновлено",
  deleted: "Мероприятие успешно удалено",
};

export const StatusEvent = () => {
  const { status } = useParams();

  return (
    <Row align="middle" justify="center" style={{ width: "100%" }}>
      <Result
        status={ status ? 'success' : 404 }
        title={status ? Statuses[status] : 'Не найдено'}
        extra={
          <Button key="dashboard">
            <Link to="/event">На главную</Link>
          </Button>
        }
      />
    </Row>
  );
};
