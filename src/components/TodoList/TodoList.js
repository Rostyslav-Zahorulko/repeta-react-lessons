// https://youtu.be/terXi4NlcoI?t=5467  Коллекция заметок: создание, удаление (вебинар № 3)

// https://youtu.be/2tPxoJxaCes?t=3719 - Коллекция заметок: добавление, обновление, фильтрация (вебинар № 4)

const TodoList = ({ todos, onDeleteTodo }) => (
  <ul>
    {todos.map(({ id, text }) => (
      <li key={id}>
        <p>{text}</p>
        <button onClick={() => onDeleteTodo(id)}>Удалить</button>
      </li>
    ))}
  </ul>
);

export default TodoList;
