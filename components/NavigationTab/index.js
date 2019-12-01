import { arrayOf, string, shape } from 'prop-types';
import { useState } from 'react';
import { Wrapper, Tab, TabContent } from './style';

const NavigationTab = ({ tabHeadings, contentPanes }) => {
  const [openTab, setOpenTab] = useState(tabHeadings[0].id);

  return (
    <Wrapper>
      {tabHeadings.map(tab => (
        <Tab
          current={openTab === tab.id}
          onClick={() => setOpenTab(tab.id)}
          key={tab.id}
        >
          {tab.title}
        </Tab>
      ))}
      <TabContent current={true}>{contentPanes[openTab]}</TabContent>
    </Wrapper>
  );
};

NavigationTab.propTypes = {
  tabHeadings: arrayOf(
    shape({
      id: string,
      title: string
    })
  ),
  contentPanes: shape({})
};

export default NavigationTab;
