import Link from 'next/link';
import styled from 'styled-components';

const Title = styled.h3`
  font-size: 20px;
  color: white;
  padding: 12px 8px;
`;

const Anchor = styled.a`
text-decoration: none;
`;

const TitleLink = ({ title }) => (
  <Link href="/session/exercise/[id]" as={`/session/exercise/${title}`}>
    <Anchor>
      <Title>{title}</Title>
    </Anchor>
  </Link>
);

export default TitleLink;
