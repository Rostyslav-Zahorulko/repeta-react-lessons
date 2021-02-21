import './Counter.css';

const Counter = () => (
  <div className="Counter">
    <span className="Counter__value">0</span>

    <div className="Counter__controls">
      <button type="button">Увеличить на 1</button>
      <button type="button">Уменьшить на 1</button>
    </div>
  </div>
);

export default Counter;
