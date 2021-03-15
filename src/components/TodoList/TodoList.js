// https://youtu.be/terXi4NlcoI?t=5467 - Коллекция заметок: создание, удаление (вебинар № 3)

// https://youtu.be/2tPxoJxaCes?t=3719 - Коллекция заметок: добавление, обновление, фильтрация (вебинар № 4)
// https://youtu.be/2tPxoJxaCes?t=5550 - Подведение итогов (вебинар № 4)

// https://youtu.be/w6MW1szKuT4?t=567  - Сохранение заметок в local storage (вебинар № 5)
// https://youtu.be/w6MW1szKuT4?t=4129 - Рефакторинг заметок (вебинар № 5)

import classNames from 'classnames';
import Todo from '../Todo';
import './TodoList.scss';

const TodoList = ({ todos, onDeleteTodo, onUpdateTodo }) => (
  <ul className="TodoList">
    {todos.map(({ id, text, completed }) => (
      <li
        key={id}
        className={classNames('TodoList__item', {
          'TodoList__item--completed': completed,
        })}
      >
        <Todo
          text={text}
          completed={completed}
          onDelete={() => onDeleteTodo(id)}
          onUpdate={() => onUpdateTodo(id)}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;
