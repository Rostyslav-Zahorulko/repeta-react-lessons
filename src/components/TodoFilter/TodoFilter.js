// https://youtu.be/2tPxoJxaCes?t=4750 (вебинар № 4 - фильтрация)

import './TodoFilter.scss';

const TodoFilter = ({ value, onFilterTodos }) => (
  <div className="TodoFilter">
    <p className="TodoFilter__label">Фильтр по содержимому</p>
    <input
      type="text"
      className="TodoFilter__input"
      value={value}
      onChange={onFilterTodos}
    />
  </div>
);

export default TodoFilter;
