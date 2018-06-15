class Hello extends React.Component {
  state = {
  	name: this.props.initialName
  }
  change(e) {
  	this.setState({ name: e.target.value });
  }
  render() {
  	const { name } = this.state;
    return (
      <div>
        Name: <input value={name} onChange={this.change.bind(this)} /><br/>
        Hello {name}!
      </div>
    );
  }
}

export default Hello
