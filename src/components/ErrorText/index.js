import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { node } from 'prop-types';

export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.red};
  background: ${({ theme }) => theme.colors.lightestGrey};
  padding: ${({ theme }) => theme.spacing.L};
  border-radius: 12px 0 0 12px;
`;

export const Text = styled.span`
  font-size: ${({ theme }) => theme.font.size.L};
  color: ${({ theme }) => theme.colors.lightestGrey};
  padding: ${({ theme }) => theme.spacing.L};
`;

const Wrapper = styled.div`
  margin: ${({ theme }) => theme.spacing.XL};
  background: rgba(247, 68, 68, 0.8);
  border-radius: 12px;
  display: flex;
`;

const ErrorText = ({ children }) => (
  <Wrapper>
    <StyledIcon icon="exclamation-circle" size="lg" />
    <Text>
      {'Error: '}
      {children}
    </Text>
  </Wrapper>
);

ErrorText.propTypes = {
  children: node.isRequired,
};

export default ErrorText;
