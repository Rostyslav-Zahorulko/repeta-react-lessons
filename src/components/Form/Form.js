import { Component } from 'react';

class Form extends Component {
  state = {
    name: '',
    tag: '',
    experience: 'junior',
    licence: false,
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  };

  handleLicenceChange = event => {
    const { checked } = event.currentTarget;

    this.setState({ licence: checked });

    // Что, если делать так???
    // this.setState(({ licence }) => ({ licence: !licence }));
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);

    this.setState({ name: '', tag: '', experience: 'junior', licence: false });
  };

  render() {
    const { name, tag, experience, licence } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          ></input>
        </label>

        <br />

        <label>
          Tag
          <input
            type="text"
            name="tag"
            value={tag}
            onChange={this.handleChange}
          ></input>
        </label>

        <p>Your level:</p>

        <label>
          <input
            type="radio"
            name="experience"
            value="junior"
            checked={experience === 'junior'}
            onChange={this.handleChange}
          ></input>
          Junior
        </label>
        <label>
          <input
            type="radio"
            name="experience"
            value="middle"
            checked={experience === 'middle'}
            onChange={this.handleChange}
          ></input>
          Middle
        </label>
        <label>
          <input
            type="radio"
            name="experience"
            value="senior"
            checked={experience === 'senior'}
            onChange={this.handleChange}
          ></input>
          Senior
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="licence"
            checked={licence}
            onChange={this.handleLicenceChange}
          ></input>
          Agree
        </label>

        <br />

        <button type="submit" disabled={!licence}>
          Send
        </button>
      </form>
    );
  }
}

export default Form;
