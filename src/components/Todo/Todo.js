// https://youtu.be/w6MW1szKuT4?t=4151 - Вынесение заметки в отдельный компонент (вебинар № 5)

import './Todo.scss';

const Todo = ({ text, completed, onDelete, onUpdate }) => {
  return (
    <>
      <input
        type="checkbox"
        className="TodoList__checkbox"
        checked={completed}
        onChange={onUpdate}
      />
      <p className="TodoList__text">{text}</p>
      <button type="button" className="TodoList__btn" onClick={onDelete}>
        Удалить
      </button>
    </>
  );
};

export default Todo;
