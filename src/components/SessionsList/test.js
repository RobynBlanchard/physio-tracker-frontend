import Link from 'next/link';
import { act } from 'react-dom/test-utils';
import SessionsList from '.';
import { shallow } from 'enzyme';
import { ListItem, Text } from './style';
import { updateWrapper } from '../../util/testing/act';
import { mountWithTheme } from '../../util/testing/theme';
import { SaveButton, EditButton, DeleteButton } from '../CRUDButtons';

describe('SessionsList', () => {
  const firstSessionID = '1';
  const firstSessionDate = '2019-01-01';
  const secondSessionID = '2';
  const secondSessionDate = '2019-01-05';
  const sessions = [
    { id: firstSessionID, date: firstSessionDate },
    { id: secondSessionID, date: secondSessionDate },
  ];

  let deleteSession;
  let editSession;
  let component;
  let firstSession;
  let allSessions;

  beforeEach(() => {
    deleteSession = jest.fn();
    editSession = jest.fn();
    component = shallow(
      <SessionsList
        sessions={sessions}
        deleteSession={deleteSession}
        submitEditSession={editSession}
      />
    );
  });

  describe('initial render', () => {
    beforeEach(() => {
      allSessions = component.find(ListItem);
      firstSession = allSessions.at(0);
    });

    it('rends a list item for each session', () => {
      expect(allSessions.length).toEqual(2);
    });

    describe('List item', () => {
      it('formats the date', () => {
        expect(firstSession.find(Text).at(0).text()).toEqual(
          'Tuesday 1st January'
        );
      });

      it('renders an edit button', () => {
        const editButton = firstSession.find(EditButton);
        expect(editButton.length).toEqual(1);
      });

      it('renders a delete button', () => {
        const deleteButton = firstSession.find(DeleteButton);
        expect(deleteButton.length).toEqual(1);
      });

      it('renders a link', () => {
        const link = firstSession.find(Link);
        expect(link.prop('href')).toEqual('/exercises/[id]');
        expect(link.prop('as')).toEqual('/exercises/1');
      });
    });
  });

  describe('deleting a session', () => {
    it('calls deleteSession with correct args when the delete icon is clicked', () => {
      firstSession = component.find(ListItem).at(0);
      firstSession.find(DeleteButton).simulate('click');

      expect(deleteSession).toHaveBeenCalledTimes(1);
      expect(deleteSession).toHaveBeenCalledWith(firstSessionID);
    });
  });

  describe('editing a session', () => {
    beforeEach(async () => {
      act(() => {
        firstSession = component.find(ListItem).at(0);
        firstSession.find(EditButton).simulate('click');
      });

      await updateWrapper(component);
      firstSession = component.find(ListItem).at(0);
    });

    it('renders a save icon instead of the edit button', () => {
      expect(firstSession.find(EditButton).length).toEqual(0);
      expect(firstSession.find(SaveButton).length).toEqual(1);
    });

    it('renders an input instead of a link', () => {
      expect(firstSession.find('input').length).toEqual(1);
      expect(firstSession.find(Link).length).toEqual(0);
    });

    it('defaults the input value to the date of the session', () => {
      expect(firstSession.find('input').prop('value')).toEqual(
        firstSessionDate
      );
    });

    describe('editting the session', () => {
      const editDate = async (component, date) => {
        const event = { target: { value: date }, persist: jest.fn() };
        act(() => {
          component.find('input').simulate('change', event);
        });
      };

      const saveDate = async (component) => {
        act(() => {
          component.find(SaveButton).simulate('click');
        });
      };

      describe('clicking outside of the input or save icon', () => {
        let wrapper;
        beforeEach(async () => {
          const map = {};
          document.addEventListener = jest.fn((event, callback) => {
            map[event] = callback;
          });
          wrapper = mountWithTheme(
            <SessionsList
              sessions={sessions}
              deleteSession={deleteSession}
              submitEditSession={editSession}
            />
          );

          wrapper
            .find(ListItem)
            .at(0)
            .find(EditButton)
            .simulate('click');

          await editDate(wrapper.find(ListItem).at(0), '2010-02-02');

          act(() => {
            map.mousedown({ target: document.createElement('a') });
          });

          await updateWrapper(wrapper);
        });
        it('renders the session link', () => {
          expect(wrapper.find(ListItem).at(0).find('input').length).toEqual(0);
          expect(wrapper.find(ListItem).at(0).find(Link).length).toEqual(1);
        });

        it('renders the edit icon instead of the save icon', () => {
          expect(firstSession.find(EditButton).length).toEqual(0);
          expect(firstSession.find(SaveButton).length).toEqual(1);
        });

        it('does not submit the editted session', () => {
          expect(editSession).toHaveBeenCalledTimes(0);
        });
      });

      describe('saving the edited session', () => {
        describe('when the date has changed', () => {
          const updatedDate = '2019-02-04';
          beforeEach(async () => {
            firstSession = component.find(ListItem).at(0);

            await editDate(firstSession, updatedDate);
            await updateWrapper(component);

            firstSession = component.find(ListItem).at(0);

            await saveDate(firstSession);
            await updateWrapper(component);

            firstSession = component.find(ListItem).at(0);
          });

          it('resets the list item to a link with an edit icon', () => {
            expect(firstSession.find(EditButton).length).toEqual(1);
            expect(firstSession.find(SaveButton).length).toEqual(0);
          });

          it('calls submitEditSession with correct args', () => {
            expect(editSession).toHaveBeenCalledTimes(1);
            expect(editSession).toHaveBeenCalledWith(
              firstSessionID,
              updatedDate
            );
          });
        });

        describe('when the date has not changed', () => {
          beforeEach(async () => {
            firstSession = component.find(ListItem).at(0);

            await editDate(component, firstSessionDate);
            await updateWrapper(component);
            firstSession = component.find(ListItem).at(0);

            await saveDate(component);
            await updateWrapper(component);
            firstSession = component.find(ListItem).at(0);
          });

          it('resets the list item to a link with an edit icon', () => {
            expect(firstSession.find(EditButton).length).toEqual(1);
            expect(firstSession.find(SaveButton).length).toEqual(0);
          });

          it('does not call submitEditSession', () => {
            expect(editSession).toHaveBeenCalledTimes(0);
          });
        });
      });
    });
  });
});
