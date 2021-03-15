import { Component } from 'react';
import { nanoid } from 'nanoid';

import Container from './components/Container';
// import Modal from './components/Modal';
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
    // console.log('App componentDidMount');

    const todos = localStorage.getItem('todos');
    // console.log('todos: ', todos);

    const parsedTodos = JSON.parse(todos);
    // console.log('parsedTodos :', parsedTodos);

    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');

    if (prevState.todos !== this.state.todos) {
      // console.log('Изменились todos');

      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
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

        {/* {showModal && (
          <Modal onClose={this.toggleModal}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              mollitia fuga, assumenda perferendis ratione nisi voluptate
              delectus aliquam reprehenderit atque, blanditiis provident quasi
              adipisci, sunt necessitatibus ducimus repudiandae culpa quos
              cumque labore inventore eligendi cum? Doloribus obcaecati sapiente
              dolorem tempore perferendis mollitia vel facilis suscipit
              architecto a doloremque impedit dolore adipisci, facere possimus
              porro explicabo assumenda! Officia minima aliquam illo? Cum ipsa,
              nobis incidunt, itaque reprehenderit doloribus dolorum nemo sit
              quod doloremque exercitationem quam aut, necessitatibus distinctio
              ratione aperiam. Recusandae, beatae! Aliquam, beatae nam
              voluptatum magni esse officia sapiente et saepe neque
              exercitationem, nulla dolores aperiam culpa minima fugit quae.
            </p>
            <button type="button" onClick={this.toggleModal}>
              Закрыть модалку
            </button>
          </Modal>
        )} */}

        {/* <Counter initialValue={10} /> */}

        {/* <Dropdown /> */}

        {/* <ColorPicker options={colorPickerOptions} /> */}

        {/* <Form onSubmit={this.formSubmitHandler} /> */}

        <div>
          <p>Общее количество: {totalTodosCount}</p>
          <p>Количество выполненых: {completedTodosCount}</p>
        </div>

        <TodoEditor onAddTodo={this.addTodo} />

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
