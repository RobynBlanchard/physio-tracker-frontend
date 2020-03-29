import { shallow } from 'enzyme';
import Table from './index';
import { TableStyle, TableRow, TableHeader, TableData } from './style';

describe('Table', () => {
  const mockTableHeadings = [
    { colID: 'setNum', name: 'Set' },
    { colID: 'weight', name: 'Weight' },
    { colID: 'reps', name: 'Reps' }
  ];
  const mockTableData = [
    { id: 1, setNum: 1, weight: 25, reps: 12 },
    { id: 2, setNum: 2, weight: 27.5, reps: 12 },
    { id: 3, setNum: 3, weight: 27.5, reps: 10 }
  ];

  const component = shallow(
    <Table tableHeadings={mockTableHeadings} rowData={mockTableData} />
  );

  it('renders a table', () => {
    const table = component.find(TableStyle);
    expect(table).toHaveLength(1);
  });

  it('renders table headers grouped under a thead element', () => {
    const thead = component.find('thead');
    expect(thead).toHaveLength(1);

    const headers = thead.find(TableHeader);

    expect(headers).toHaveLength(mockTableHeadings.length);
    headers.forEach((header, index) => {
      expect(header.text()).toEqual(mockTableHeadings[index].name);
    });
  });

  it('renders table data grouped under a tbody element', () => {
    const tbody = component.find('tbody');
    expect(tbody).toHaveLength(1);

    const rows = tbody.find(TableRow);
    expect(rows).toHaveLength(mockTableHeadings.length);
    rows.forEach((row, index) => {
      const cells = row.find(TableData);
      expect(cells).toHaveLength(mockTableHeadings.length);
      expect(cells.at(0).text()).toEqual(`${mockTableData[index].setNum}`);
      expect(cells.at(1).text()).toEqual(`${mockTableData[index].weight}`);
      expect(cells.at(2).text()).toEqual(`${mockTableData[index].reps}`);
    });
  });
});
