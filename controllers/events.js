const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/event
 * @desc Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
  try {
    const events = await prisma.event.findMany();

    res.status(200).json(events);
  } catch {
    res.status(500).json({ message: "Не удалось получить список мероприятий" });
  }
};

/**
 * @route POST /api/event/add
 * @desc Добавление мероприятия
 * @access Private
 */
const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.NickName || !data.Telegram || !data.Time || !data.NameEvent ||!data.Prize || !data.Status) {
      return res.status(400).json({ message: "Все поля обязательные" });
    }

    const event = await prisma.event.create({
      data: {
        ...data,
      },
    });

    return res.status(201).json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

/**
 * @route POST /api/event/remove/:id
 * @desc Удаление мероприятия
 * @access Private
 */
const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.event.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch {
    res.status(500).json({ message: "Не удалось удалить мероприятие" });
  }
};

/**
 * @route PUT /api/event/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */
const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.event.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json("OK");
  } catch(err) {
    res.status(500).json({ message: "Не удалось редактировать мероприятие" });
  }
};

/**
 * @route GET /api/event/:id
 * @desc Получение сотрудника
 * @access Private
 */
const event = async (req, res) => {
  const { id } = req.params; // http://localhost:8000/api/event/9fe371c1-361f-494a-9def-465959ecc098

  try {
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(event);
  } catch {
    res.status(500).json({ message: "Не удалось получить мероприятие" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  event
};
