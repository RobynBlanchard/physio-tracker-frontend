import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Table from './index';
import {
  TableStyle,
  TableRow,
  TableHeader,
  TableData,
  StyledInput,
} from './style';
import { SaveButton, EditButton, DeleteButton } from '../CRUDButtons';

describe('Table', () => {
  const mockTableHeadings = [
    { colID: 'weight', name: 'Weight' },
    { colID: 'reps', name: 'Reps' },
  ];
  const mockTableData = [
    { id: 1, weight: 25, reps: 12 },
    { id: 2, weight: 27.5, reps: 12 },
    { id: 3, weight: 27.5, reps: 10 },
  ];

  const component = shallow(
    <Table
      tableHeadings={mockTableHeadings}
      rowData={mockTableData}
      editSets={false}
    />
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
    expect(rows).toHaveLength(mockTableData.length);
    rows.forEach((row, index) => {
      const cells = row.find(TableData);
      expect(cells).toHaveLength(mockTableHeadings.length);
      expect(cells.at(0).text()).toEqual(`${mockTableData[index].weight}`);
      expect(cells.at(1).text()).toEqual(`${mockTableData[index].reps}`);
    });
  });
});

describe('editting table data', () => {
  const mockTableHeadings = [
    { colID: 'weight', name: 'Weight' },
    { colID: 'reps', name: 'Reps' },
  ];
  const mockTableData = [{ id: 1, weight: 25, reps: 12 }];

  describe('when editSets is true', () => {
    describe('initial render', () => {
      const component = shallow(
        <Table
          tableHeadings={mockTableHeadings}
          rowData={mockTableData}
          editSets
        />
      );

      it('renders an edit column', () => {
        expect(
          component.find(TableHeader).at(mockTableHeadings.length).text()
        ).toContain('edit');
      });

      it('renders an edit icon next to the row data', () => {
        expect(component.find(TableRow).find(EditButton)).toHaveLength(1);
      });

      it('does not render a save icon next to the row data', () => {
        expect(component.find(TableRow).find(SaveButton)).toHaveLength(0);
      });

      it('renders a delete icon next to the row data', () => {
        expect(component.find(TableRow).find(DeleteButton)).toHaveLength(1);
      });
    });

    describe('editting a row', () => {
      const handleEdit = jest.fn();
      let component;
      beforeEach(() => {
        component = shallow(
          <Table
            tableHeadings={mockTableHeadings}
            rowData={mockTableData}
            editSets
            handleEdit={handleEdit}
          />
        );
        component.find(EditButton).simulate('click');
      });

      it('renders an input for each row data', () => {
        expect(component.find(StyledInput)).toHaveLength(
          mockTableHeadings.length
        );
      });

      it('replaces the edit icon with a save icon', () => {
        expect(component.find(TableRow).find(EditButton)).toHaveLength(0);
        expect(component.find(TableRow).find(SaveButton)).toHaveLength(1);
      });

      describe('submitting updated data', () => {
        it('calls handleEdit with correct args', async () => {
          const newWeight = 20;
          act(() => {
            component
              .find(StyledInput)
              .at(0)
              .simulate('change', {
                target: { value: newWeight },
                persist: jest.fn(),
              });
          });

          component.find(SaveButton).simulate('click');

          await component.update();

          expect(handleEdit).toHaveBeenCalledTimes(1);
          expect(handleEdit).toHaveBeenCalledWith(
            expect.objectContaining({
              ...mockTableData[0],
              weight: newWeight,
            })
          );
        });
      });
    });

    describe('deleting a row', () => {
      const handleDelete = jest.fn();
      let component;
      beforeEach(() => {
        component = shallow(
          <Table
            tableHeadings={mockTableHeadings}
            rowData={mockTableData}
            editSets
            handleDelete={handleDelete}
          />
        );
        component.find(DeleteButton).simulate('click');
      });

      it('calls handle delete with correct args', () => {
        expect(handleDelete).toHaveBeenCalledTimes(1);
        expect(handleDelete).toHaveBeenCalledWith(mockTableData[0].id);
      });
    });
  });
});
