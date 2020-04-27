import { shallow } from 'enzyme';
import ToggleSwitch from '.';
import { Switch, Slider } from './style';

describe('ToggleSwitch', () => {
  const mockOnClick = jest.fn();
  const component = shallow(<ToggleSwitch onClick={mockOnClick} />);

  it('renders a switch which takes an onClick prop', () => {
    const switcher = component.find(Switch);

    expect(switcher).toHaveLength(1);
    expect(switcher.prop('onClick')).toEqual(mockOnClick);
  });

  it('renders a slider that switches the enabled prop on click', () => {
    const slide = component.find(Slider);

    expect(slide).toHaveLength(1);
    expect(slide.prop('enabled')).toEqual(false);

    slide.simulate('click');
    const onSlide = component.find(Slider);

    expect(onSlide.prop('enabled')).toEqual(true);

    onSlide.simulate('click');
    const offSlide = component.find(Slider);

    expect(offSlide.prop('enabled')).toEqual(false);
  });
});
