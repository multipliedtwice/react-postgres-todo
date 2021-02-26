import React, { FormEvent, useEffect, useState } from 'react'
import { Add, Chevron, Close, Toggle } from './components'
import { fetchAPI } from './helpers'

const App = () => {
  const [todos, setTodos] = useState<any[]>([])
  const [timeout, setTime] = useState<any>(null)
  const [newTask, setNewTask] = useState('')

  const toggleStatus = async ({ id, status, title, subtasks }: any) => {
    console.log('object :>> ', todos.every((todo: any) => todo.status === 'completed'));
    fetchAPI({
      method: 'PATCH',
      data: {
        id,
        status: status === 'pending',
        title,
        ...(subtasks && { subtasks }),
      },
    }).then(() => getTodos())
  }

  const debounce = (
    callback: (fn: any, value: string) => void,
    task: any,
    value: string
  ) => {
    clearTimeout(timeout)
    setTime(setTimeout(() => callback(task, value), 750))
  }

  const changeTitle = ({ id }: any, value: string) => {
    if (value.length > 3) {
      fetchAPI({
        method: 'PATCH',
        data: {
          id,
          title: value,
        },
      }).then(() => getTodos())
    }
  }

  const onSubmit = (e: FormEvent, parent_id?: number) => {
    e.preventDefault()
    if (newTask.length > 3) {
      fetchAPI({
        method: 'POST',
        data: { title: newTask, ...(parent_id && { parent_id }) },
      }).then(() => {
        getTodos()
        setNewTask('')
        cleanInputs()
      })
    }
  }

  const cleanInputs = () => {
    Array.from(
      document.querySelectorAll<HTMLInputElement>('.js-add-task')
    ).forEach((input) => (input.value = ''))
  }

  const deleteTodo = (id: number) => {
    fetchAPI({ method: 'DELETE', data: { id } }).then(() => {
      getTodos()
    })
  }

  const getTodos = () => {
    fetchAPI({}).then(({ data }) => {
      setTodos(data.tasks)
    })
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <section className='flex flex-col items-center justify-center'>
      <form
        onSubmit={onSubmit}
        className='w-full items-center bg-blue-500 p-4 mb-4'
      >
        <div className='flex m-auto max-w-lg items-center p-2 focus:outline-none hover:text-blue-500 rounded-md'>
          <button
            type='submit'
            className='focus:outline-none p-2 interactive mr-2'
          >
            <Add className='text-white' />
          </button>

          <input
            onKeyUp={(e: any) => setNewTask(e.target.value)}
            type='text'
            placeholder='Add task'
            className='js-add-task placeholder-blue-200 w-full focus:outline-none bg-transparent text-white'
          />
        </div>
      </form>

      {todos.map((todo) => {
        return (
          <details key={todo.id} open className='w-full max-w-lg p-2 pt-0'>
            <summary className='group summary flex items-center justify-between p-2 cursor-pointer focus:outline-none hover:bg-gray-100 hover:text-blue-500 rounded-md'>
              <label className='flex items-center w-full'>
                <Toggle
                  value={todo.status === 'completed'}
                  onChange={() => toggleStatus(todo)}
                />
                <span className='flex items-center text-gray-400 text-sm ml-1'>
                  {todo.total_completed}/{todo.total}
                </span>
                <input
                  type='text'
                  onKeyUp={(e: any) => {
                    if (e.keyCode == 32) e.preventDefault() // prevent details from toggling on space
                    debounce(changeTitle, todo, e?.target?.value)
                  }}
                  defaultValue={todo.title}
                  className='focus:outline-none bg-transparent w-full flex p-2'
                />
              </label>

              <div className='flex items-center'>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className='group-hover:visible invisible mr-2 p-2 focus:outline-none interactive'
                >
                  <Close />
                </button>
                <button className='summary-chevron interactive pointer-events-none'>
                  <Chevron />
                </button>
              </div>
            </summary>

            <div className='py-2'>
              {todo?.subtasks?.map((subtask: any) => {
                return (
                  <div
                    key={subtask.id}
                    className='group flex justify-between items-center p-2 pl-8 hover:text-blue-500'
                  >
                    <label className='flex items-center w-full'>
                      <Toggle
                        value={subtask.status === 'completed'}
                        onChange={() => toggleStatus(subtask)}
                        wrapperClass='transform-gpu transform scale-75'
                      />
                      <input
                        type='text'
                        onChange={({ target }) =>
                          debounce(changeTitle, subtask, target.value)
                        }
                        defaultValue={subtask.title}
                        className='focus:outline-none w-full flex p-2'
                      />
                    </label>
                    <button
                      onClick={() => deleteTodo(subtask.id)}
                      className='rounded-full group-hover:visible invisible interactive cursor-pointer focus:outline-none p-2'
                    >
                      <Close />
                    </button>
                  </div>
                )
              })}

              <form
                onSubmit={(e) => {
                  onSubmit(e, todo.id)
                }}
                className='flex items-center p-2 pl-10 hover:text-blue-500'
              >
                <button
                  type='submit'
                  className='focus:outline-none p-2 interactive mr-4'
                >
                  <Add className='text-gray-300' />
                </button>
                <input
                  onKeyUp={(e: any) => setNewTask(e.target.value)}
                  type='text'
                  placeholder='Add subtask'
                  className='js-add-task focus:outline-none'
                />
              </form>
            </div>
          </details>
        )
      })}
    </section>
  )
}

export { App }
