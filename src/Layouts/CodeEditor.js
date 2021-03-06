/*
 *
 * CodeEditor
 *
 */

import React from 'react';
import Radium from 'radium';
import skulpt from 'skulpt';

import Header from '../Components/Header';
import SkulptIO from '../Components/SkulptIO';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorInput: '',
      editorOutput: '',
      errorMsg: '',
    };
  }

  handleEditorChange = (event) => {
    this.setState({editorInput: event.target.value});
  }

  codeOutput = (text) => {
    if (text.length > 1) {
      this.setState({editorOutput: text});
    }
  }

  builtinRead = (x) => {
    if (skulpt.builtinFiles === undefined || skulpt.builtinFiles["files"][x] === undefined)
      throw "File not found: '" + x + "'";
    return skulpt.builtinFiles["files"][x];
  }

  runCode = () => {
    const programToRun = this.state.editorInput;
    skulpt.canvas = "mycanvas";
    skulpt.pre = "output";
    skulpt.configure({output:this.codeOutput, read:this.builtinRead});
    try {
      eval(skulpt.importMainWithBody("<stdin>", false, programToRun));
    }
    catch(e) {
      this.setState({errorMsg: e.toString()});
    }
  }

  render() {
    return (
      <div>
        <Header
          runCode={this.runCode}
        />
        <SkulptIO
          editorInput={this.state.editorInput}
          editorOutput={this.state.editorOutput}
          inputUpdate={this.handleEditorChange}
          errorMsg={this.state.errorMsg}
        />
      </div>
    );
  }
}

export default Radium(CodeEditor);
