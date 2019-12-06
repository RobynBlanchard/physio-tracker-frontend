import Link from 'next/link';
import styled from 'styled-components';

const Anchor = styled.a`
  display: flex;
  justify-content: space-between;
  // background-color: #29b6f6;
  padding: 12px 8px;
  margin: 0;
  color: white;
  border-bottom: 1px solid white;
  text-decoration: none;
`;

const ListItem = styled.li`
  list-style: none;
  padding: 0;
`;

const Text = styled.p`
  margin: 0;
`;

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
    {/* <style jsx>{`
      ul {
        
      }
      ul,
      li {
        list-style: none;
        padding: 0;
      }
      a {
        display: flex;
        justify-content: space-between;
        // background-color: #29b6f6;
        padding: 12px 8px;
        margin: 0;
        color: white;
        border-bottom: 1px solid white;
        text-decoration: none;
      }
      p {
        margin: 0;
      }
    `}</style> */}
  </ListItem>
);

export default List;
