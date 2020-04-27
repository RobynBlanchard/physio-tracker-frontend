import { number } from 'prop-types';
import { Picture, Image } from './style';
import breakpoints from '../../styles/breakpoints';

const PageBackground = ({ backgroundID }) => (
  <Picture>
    <source
      srcSet={`/images/Background-${backgroundID}.png`}
      // srcSet={`/images/test-${backgroundID}.png`}

      media={`(max-width: ${breakpoints.tablet}px)`}
    />
    <Image
      className="background-image"
      src={`/images/Background-${backgroundID}-desktop.png`}
      // src={`/imagestest-${backgroundID}.png`}

      alt="Page background"
    />
  </Picture>
);

PageBackground.defaultProps = {
  backgroundID: 1,
};

PageBackground.propTypes = {
  backgroundID: number,
};

export default PageBackground;
