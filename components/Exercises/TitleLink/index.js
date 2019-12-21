import Link from 'next/link';
import { Title, Anchor } from './style';

const TitleLink = ({ title }) => (
  <Link href="/session/exercise/[id]" as={`/session/exercise/${title}`}>
    <Anchor>
      <Title>{title}</Title>
    </Anchor>
  </Link>
);

export default TitleLink;
