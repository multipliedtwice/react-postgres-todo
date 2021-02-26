import React, { FC } from 'react'

interface SelectProps {
  name?: string
  value?: boolean
  wrapperClass?: string
  onChange?: (e: any) => void
}

const Toggle: FC<SelectProps> = ({ name, value, wrapperClass, onChange }) => {
  return (
    <label
      className={`${
        wrapperClass || ''
      } group-interactive mr-4 toggle w-10 h-6 flex items-center cursor-pointer relative`}
    >
      <input
        type='checkbox'
        checked={value}
        onChange={onChange}
        className='toggle hidden'
        name={name}
      />

      <span className='toggle__line absolute top-0 bottom-0 my-auto w-10 h-6 bg-gray-200 rounded-full shadow-inner'></span>

      <span className='toggle__dot flex items-center justify-center absolute bottom-0 my-auto w-5 h-5 rounded-full shadow'>
        <svg
          width='10'
          height='8'
          viewBox='0 0 10 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9.76771 1.21988C10.0774 1.51305 10.0774 1.98837 9.76771 2.28155L4.26568 7.78012C3.95597 8.07329 3.45382 8.07329 3.1441 7.78012L0.232288 5.02386C-0.0774292 4.73069 -0.0774292 4.25537 0.232288 3.9622C0.542004 3.66902 1.04415 3.66902 1.35387 3.9622L3.70489 6.18762L8.64613 1.21988C8.95585 0.926707 9.45799 0.926707 9.76771 1.21988Z'
            fill='white'
          />
        </svg>
      </span>
    </label>
  )
}
Toggle.displayName = 'Toggle'
export { Toggle }
