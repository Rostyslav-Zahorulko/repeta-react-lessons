import React from 'react';
import PropTypes from 'prop-types';

import Controls from '../Controls';
import Value from '../Value';

import './Counter.css';

// https://www.youtube.com/watch?v=terXi4NlcoI&feature=youtu.be

// Компонент-класс - это обычный класс, который наследует React.Component и реализует метод render(), который возвращает jsx.

// Если необходимо создать внешнюю функцию и передать ее как колбэк в обработчик события, то ее создают как метод класса,
// у которого привязан контекст (не как обычный метод класса, а как публичное свойство, значение которого - стрелочная ф-я).

// Обычные методы класса записываются на прототип, публичные - на экземпляр
// https://youtu.be/terXi4NlcoI?t=674

// В колбек-функцию обработчика события в качестве аргумента приходит экземпляр класса SyntheticEvent
// Это кроссбраузерная реакт-обертка над нативным экземляром события
// У нее такой же интерфейс, как и у нативного события
// Она помогает событиям работать одинаково во всех браузерах

// Из-за того, что в реакте происходит глобальное делегирование, объект события (еvent) всего один и
// он переиспользуется между разными колбеками, поэтому доступен только в синхронном коде ??????????

// state - это всегда объект, от свойств которого зависит разметка

// Механизм обновления разметки:
// 1. На элементе происходит событие
// 2. Вызывается метод класса, который обновляет state
// 3. state обновляется
// 4. Реакт автоматически перерендеревает нужную часть разметки

// Обновлять state по ссылке вручную ни в коем случае нельзя !!!
// this.state.value = 10;
// Для того, чтобы обновить state, используют специальный метод setState()
// Обновление state - асинхронное
// Первый аргумент, который в него передается:
//   - объект (слайс стейта со свойством, значение которого нужно обновить) (если нужно записать новое значение, не основываясь на предыдущем),
//   - функция (если нужно изменить state, основываясь на предыдущем значении). В качестве аргумента ей передается ссылка на актуальный state.
//     Возвращать функция должна обновленный state
// Второй аргумент - функция, которая будет вызвана только после обновления state

// Подъем состояния при композиции (state hoisting) - https://youtu.be/terXi4NlcoI?t=2783

class Counter extends React.Component {
  static defaultProps = {
    initialValue: 5,
  };

  static propTypes = {
    initialValue: PropTypes.number,
  };

  state = {
    value: this.props.initialValue,
  };

  // handleIncrement = () => {
  //   this.setState(prevState => {
  //     return {
  //       value: prevState.value + 1,
  //     };
  //   });
  // };

  handleIncrement = () => {
    this.setState(prevState => ({
      value: prevState.value + 1,
    }));
  };

  handleDecrement = () => {
    this.setState(prevState => ({
      value: prevState.value - 1,
    }));
  };

  render() {
    const { value } = this.state;

    return (
      <div className="Counter">
        <Value value={value} />

        <Controls
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
        />
      </div>
    );
  }
}

export default Counter;
