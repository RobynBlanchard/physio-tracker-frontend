import Link from 'next/link';
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

export default List;
