import React from 'react';
import logo from './logo.svg';
import './App.css';

class ShowData extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {
      data: 'NOT LOADED',
    };
  }

  loadData = async () => {
    
    const apiUrl: string = 'http://localhost:12380/api/info';

    let response: Response = await fetch(apiUrl);

    let responseData: any = await response.json();

    const stateData: any = {
      data: responseData,
    };
   
    this.setState(stateData);
  };

  componentDidMount = () => {
    this.loadData();
  }

  render() {

    const state:any = this.state;

    return <div dangerouslySetInnerHTML={{ __html: renderHtmlTable(state['data']) }} />;

  }

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <ShowData />

    </div>
  );
}

const htmlEncode = (html: string): string => {
  return html.replace(/[&<>'"]/g, (tag: string): string => {
    const lookup: any = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }
    return lookup[tag] || '';
  });
}

const renderHtmlTable = (data: any): string => {
  if (data == null)
    return 'null';

  if (typeof data !== 'object')
    return htmlEncode(JSON.stringify(data));

  if (Array.isArray(data) === false) {
    data = [data];
  }

  if (data.length === 0)
    return '[]';

  if (typeof data[0] !== 'object')
    return htmlEncode(JSON.stringify(data));

  const columnNames: string[] = [];
  data.forEach((row: any) => {
    Object.keys(row).forEach(columnName => {
      if (columnNames.includes(columnName) === false)
        columnNames.push(columnName);
    });
  });

  let table = '';

  table += '<table>';
  table += '<tr>';
  columnNames.forEach(columnName => {
    table += `<th>${columnName}</th>`;
  });
  table += '</tr>';

  data.forEach((row: any) => {
    table += '<tr>';
    columnNames.forEach(columnName => {
      let value = '';
      if (row[columnName] !== undefined)
        value = renderHtmlTable(row[columnName]);

      table += `<td>${value}</td>`;
    });
    table += '</tr>';
  });

  table += '</table>';

  return table;
};

export default App;
