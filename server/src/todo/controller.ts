import { Todos } from './model'

export const updateTask = async (req, res, next) => {
  try {
    const { subtasks, status, id, title } = req.body
    const newStatus = status ? 'completed' : 'pending'

    let updatedSubtasks
    if (subtasks?.length) {
      updatedSubtasks = await Promise.all(
        subtasks.map(async (subtask) => {
          const [id] = await Todos.updateTask({
            id: subtask.id,
            ...(status !== undefined && { status: newStatus }),
          })
          return id
        })
      )
    }

    const updatedTask = await Todos.updateTask({
      id,
      ...(status !== undefined && { status: newStatus }),
      title,
    })

    return res.json({
      ok: true,
      message: 'Updated',
      updatedTask,
      updatedSubtasks,
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteTaskById = async (req, res, next) => {
  try {
    const { id } = req.body

    const deleted = await Todos.deleteTaskById(id)

    return res.json({
      ok: true,
      message: 'Deleted',
      deleted,
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const addTask = async (req, res, next) => {
  try {
    const task = await Todos.addTask(req.body)

    return res.json({
      ok: true,
      message: 'Task added',
      task,
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Todos.getTasks()

    return res.json({
      ok: true,
      message: 'Tasks found',
      tasks,
    })
  } catch (error) {
    throw new Error(error)
  }
}
