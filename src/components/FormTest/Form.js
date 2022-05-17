import React from "react";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState = { value: event.target.value };
  }
  handleSubmit(event) {
    alert(this.setState.value + " Foi cadastrado");
    const data = {
      nome: this.setState.value,
    };
    console.log(data);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={this.setState.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Enviar" />
      </form>
    );
  }
}

export default Form;
