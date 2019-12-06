import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getSessions } from '../../api';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* height: 0; */
  max-height: ${({ open }) => (open ? '100px' : '0')};
  /*and eventually delay an overflow:auto; */
  overflow: ${({ open }) => (open ? 'auto' : 'hidden')};
  /* transition: max-height 0.5s, overflow 0s; */
  border-bottom: 1px solid white;

  /* max-height: 5em;
          overflow:auto; */
  transition: max-height 0.5s, overflow 0.5s 0.5s;
  color: white;
  /* margin: 12px 8px; */
`;
const TextWrapper = styled.div`
  padding: 10px;
`;
const Session = ({ session }) => {
  // TODO: button to toggle expand of averages
  // const [open, setOpen] = useState('');
  const [toggleAll, setToggleAll] = useState(false);

  const handleToggleAll = () => {
    setToggleAll(prevState => !toggleAll);
  };

  return (
    <Layout title={'Your workout'}>
      <button onClick={handleToggleAll}>View all averages</button>
      {session.exercises.map(exercise => {
        // console.log(open);
        // console.log(open === exercise.name);

        return (
          <React.Fragment key={exercise.name}>
            <Link
              href="/session/exercise/[id]"
              as={`/session/exercise/${exercise.name}`}
            >
              <a>
                <h3>
                  {exercise.name}
                  {/* <button onClick={() => setOpen(exercise.name)}>+</button> */}
                </h3>
              </a>
            </Link>
            {/* TODO put averages here */}
            <Wrapper open={toggleAll}>
              <TextWrapper>
                <p>L: 20kg, 5 reps, 3 sets</p>
                <p>R: 20kg, 5 reps, 3 sets</p>
                <p>Both: 60kg, 5 reps, 3 sets</p>
              </TextWrapper>
            </Wrapper>
          </React.Fragment>
        );
      })}
      <style jsx>{`
        p {
          font-size: 12px;
        }
        a {
          text-decoration: none;
        }
        h3 {
          color: white;
          padding: 12px 8px;
        }
      `}</style>
    </Layout>
  );
};

Session.getInitialProps = async props => {
  const userId = 123;
  const res = await getSessions(userId, props.query.id);

  return { session: res };
};

export default Session;

// background: linear-gradient(180deg, #870000, #190a05);

// #00d2ff
// →
// #3a7bd5

// #1488cc
// →
// #2b32b2
