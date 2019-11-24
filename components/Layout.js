import Nav from './Nav';

const layoutStyle = {
  margin: 20,
};

const Layout = props => (
  <div style={layoutStyle}>
    <Nav />
    {props.children}
  </div>
);

export default Layout;
