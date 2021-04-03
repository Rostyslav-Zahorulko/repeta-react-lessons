// https://youtu.be/terXi4NlcoI?t=5467 - Коллекция заметок: создание, удаление (вебинар № 3)

// https://youtu.be/2tPxoJxaCes?t=3719 - Коллекция заметок: добавление, обновление, фильтрация (вебинар № 4)
// https://youtu.be/2tPxoJxaCes?t=3736 - (обновление)
// https://youtu.be/2tPxoJxaCes?t=4109 - (добавление)
// https://youtu.be/2tPxoJxaCes?t=4750 - (фильтрация)
// https://youtu.be/2tPxoJxaCes?t=5550 - (подведение итогов)

// https://youtu.be/w6MW1szKuT4?t=567  - Сохранение заметок в local storage (вебинар № 5)

// https://youtu.be/w6MW1szKuT4?t=4129 - Рефакторинг заметок (вебинар № 5)
// https://youtu.be/w6MW1szKuT4?t=4151 - (вынесение заметки в отдельный компонент)
// https://youtu.be/w6MW1szKuT4?t=4446 - (добавление кнопки-иконки)
// https://youtu.be/w6MW1szKuT4?t=4906 - (перенос редактора в модальное окно)

import { Component } from 'react';
import { nanoid } from 'nanoid';

import Container from './components/Container';
import Modal from './components/Modal';
import IconButton from './components/IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';
// import Counter from './components/Counter';
// import Dropdown from './components/Dropdown';
// import ColorPicker from './components/ColorPicker';
// import colorPickerOptions from './colorPickerOptions.json';
// import Form from './components/Form';
import TodoEditor from './components/TodoEditor';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
// import initialTodos from './todos.json';

class App extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    console.log('App componentDidMount');

    const todos = localStorage.getItem('todos');
    // console.log('todos: ', todos);

    const parsedTodos = JSON.parse(todos);
    // console.log('parsedTodos :', parsedTodos);

    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');
    // console.log(prevState.todos);
    // console.log(this.state.todos);

    const prevTodos = prevState.todos;
    const nextTodos = this.state.todos;

    if (nextTodos !== prevTodos) {
      // console.log('Изменились todos');

      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }

    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }
    // Это не сработает, если удалить все todos, а потом добавить 1 новую
    // (если в local storage лежит пустой массив todos)
  }

  // formSubmitHandler = data => {
  //   console.log(data);
  // };

  addTodo = text => {
    const todo = {
      id: nanoid(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));

    // this.toggleModal();
  };

  deleteTodo = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.filter(({ id }) => id !== todoId),
    }));
  };

  updateTodo = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  filterTodos = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredTodos = () => {
    const { filter, todos } = this.state;
    const lowercasedFilter = filter.toLowerCase();

    return todos.filter(({ text }) =>
      text.toLowerCase().includes(lowercasedFilter),
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const totalTodosCount = todos.length;
    const completedTodosCount = this.calculateCompletedTodos();
    const filteredTodos = this.getFilteredTodos();

    // console.log('render');

    return (
      <Container>
        {/* <h1>Состояние компонента</h1> */}

        {/* <button type="button" onClick={this.toggleModal}>
          Открыть модалку
        </button> */}

        <IconButton onClick={this.toggleModal} aria-label="Добавить todo">
          <AddIcon width="32" height="32" fill="#fff" />
        </IconButton>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onAddTodo={this.addTodo} />
          </Modal>
        )}

        {/* <Counter initialValue={10} /> */}

        {/* <Dropdown /> */}

        {/* <ColorPicker options={colorPickerOptions} /> */}

        {/* <Form onSubmit={this.formSubmitHandler} /> */}

        <div>
          <p>Общее количество: {totalTodosCount}</p>
          <p>Количество выполненых: {completedTodosCount}</p>
        </div>

        <TodoFilter value={filter} onFilterTodos={this.filterTodos} />

        <TodoList
          todos={filteredTodos}
          onDeleteTodo={this.deleteTodo}
          onUpdateTodo={this.updateTodo}
        />
      </Container>
    );
  }
}

export default App;
