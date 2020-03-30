import { Picture, Image } from './style';
import breakpoints from '../../styles/breakpoints';

const PageBackground = ({backgroundID}) => {
  
  return (
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
};

export default PageBackground;
