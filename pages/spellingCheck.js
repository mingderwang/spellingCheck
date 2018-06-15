'use strict';

let https = require ('https');

let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/spellcheck';

/* NOTE: Replace this example key with a valid subscription key (see the Prequisites section above). Also note v5 and v7 require separate subscription keys. */
let key = '8e374bbd9f6f4ffaaccc8072003fc155';

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
    let setResult = (result) =>
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
            result = {result: '完全正確'}
            else
            result = { result: body }
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
