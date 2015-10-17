import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component {
  render() {
    return (
      <p className="hello-world"> Welcome ! </p>
    );
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById("react-app"));
