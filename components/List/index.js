import Link from 'next/link';

const List = ({ items, applyFunc }) => (
  <li>
    {items.map(item => {
      return (
        <ul>
          <Link href="/session/[id]" as={`/session/${item.id}`}>
            <a>
              <p>{applyFunc(item)}</p>
              <p>{'>'}</p>
            </a>
          </Link>
        </ul>
      );
    })}
    <style jsx>{`
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
        background-color: #29b6f6;
        padding: 12px 8px;
        margin: 0;
        color: white;
        border-bottom: 1px solid white;
        text-decoration: none;
      }
      p {
        margin: 0;
      }
    `}</style>
  </li>
);

export default List;
