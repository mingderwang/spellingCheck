'use strict';

let https = require ('https');

let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/spellcheck';

/* NOTE: Replace this example key with a valid subscription key (see the Prequisites section above). Also note v5 and v7 require separate subscription keys. */
let key = 'd258a1c433e047d39bedd72d224d0a8e';

class Hello extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        input: props.initialName,
        result: ''
    };
  }

  change(e) {
      this.setState({input: e.target.value});
  }

  onBlur(e) {
    console.log(e.target.value)
    const setResult = (result) =>
      this.setState(result);
      
    let response_handler = function (response) {
        let body = '';
        response.on ('data', function (d) {
            body += d;
        });
        response.on ('end', function () {
            console.log (body);
            let result;
            if (body === '{"_type": "SpellCheck", "flaggedTokens": []}')
      {
            result = {result: '拼字正確, 或有錯誤, 但無任何拼字建議'}
      }
            else
      {
            result = { result: JSON.stringify(body) }
      }
        console.log(result)
            setResult(result);
        });
        response.on ('error', function (e) {
            console.log ('Error: ' + e.message);
        });
    };
    
let mkt = "en-US";
let mode = "proof";
let text = e.target.value;
let query_string = "?mkt=" + mkt + "&mode=" + mode;

let request_params = {
  method : 'POST',
  hostname : host,
  path : path + query_string,
  headers : {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Content-Length' : text.length + 5,
      'Ocp-Apim-Subscription-Key' : key,
  }
};

    let req = https.request (request_params, response_handler);
    req.write ("text=" + text);
    this.setState({result: '檢查中...'})
    req.end();
  }
  render() {
  	const { result, input } = this.state;
    return (
      <div>
        <p>
        英文拼字練習: <input value={input} onBlur={this.onBlur.bind(this)} onChange={this.change.bind(this)} /><br/>
        結果: {result}
        </p>
        <button type="button">點我, 開始檢查!</button>
      </div>
    );
  }
}

export default Hello
