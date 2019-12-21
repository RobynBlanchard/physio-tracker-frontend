import Link from 'next/link';
import { arrayOf, func, shape } from 'prop-types';

import { Anchor, ListItem, Text } from './style';

const List = ({ items, applyFunc }) => (
  <ListItem>
    {items.map(item => {
      return (
        <ul key={item.id}>
          <Link href="/session/[id]" as={`/session/${item.id}`}>
            <Anchor>
              <Text>{applyFunc(item)}</Text>
              <Text>{'>'}</Text>
            </Anchor>
          </Link>
        </ul>
      );
    })}
  </ListItem>
);

List.propTypes = {
  items: arrayOf(shape({})),
  applyFunc: func
};

export default List;
