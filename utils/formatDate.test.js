import { formatDate } from './formatDate';

it('returns a formated date', () => {
  const dateWithFirst = new Date('2019-01-01');
  const dateWithSecond = new Date('2019-05-02');
  const dateWithThird = new Date('2019-10-03');
  const dateWithTh = new Date('2019-12-25');

  expect(formatDate(dateWithFirst)).toEqual('Tuesday 1st January');
  expect(formatDate(dateWithSecond)).toEqual('Thursday 2nd May');
  expect(formatDate(dateWithThird)).toEqual('Thursday 3rd October');
  expect(formatDate(dateWithTh)).toEqual('Wednesday 25th December');
});
