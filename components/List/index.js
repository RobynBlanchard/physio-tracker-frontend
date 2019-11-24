const List = ({ items, applyFunc }) => (
  <li>
    {items.map(item => {
      return (
        <ul>
          <p>{applyFunc(item)}</p>
          <p>{'>'}</p>
        </ul>
      );
    })}
    <style jsx>{`
      ul,
      li {
        list-style: none;
        padding: 0;
      }
      ul {
        display: flex;
        justify-content: space-between;
        background-color: #29b6f6;
        padding: 12px 8px;
        margin: 0;
        color: white;
        border-bottom: 1px solid white;
      }
      p {
        margin: 0;
      }
    `}</style>
  </li>
);

export default List;
