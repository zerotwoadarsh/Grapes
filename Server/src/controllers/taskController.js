import prisma from '../utils/prismaClient.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
  }
};

// POST create a task
export const createTask = async (req, res) => {
  const { title } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        status: 'TO_DO',
        userId: req.user.id
      }
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task', details: err.message });
  }
};

// PUT update task status
export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await prisma.task.updateMany({
      where: {
        id: Number(id),
        userId: req.user.id
      },
      data: { status }
    });

    if (updated.count === 0) {
      return res.status(404).json({ message: 'Task not found or not yours' });
    }

    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task', details: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { status, title } = req.body;

  try {
    const dataToUpdate = {};
    if (status) dataToUpdate.status = status;
    if (title) dataToUpdate.title = title;

    const updated = await prisma.task.updateMany({
      where: {
        id: Number(id),
        userId: req.user.id,
      },
      data: dataToUpdate,
    });

    if (updated.count === 0) {
      return res.status(404).json({ message: 'Task not found or not yours' });
    }

    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task', details: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await prisma.task.deleteMany({
      where: {
        id: Number(id),
        userId: req.user.id,
      },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ message: 'Task not found or not yours' });
    }

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task', details: err.message });
  }
};
