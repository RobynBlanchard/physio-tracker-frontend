import { Picture, Image } from './style';
import { breakpoints } from '../../styles';

const PageBackground = ({backgroundID}) => {
  return (
    <Picture>
      <source
        srcSet={`/images/Background-${backgroundID}.png`}
        media={`(max-width: ${breakpoints.tablet}px)`}
      />
      <Image
        className="background-image"
        src={`/images/Background-${backgroundID}-desktop.png`}
        alt="Page background"
      />
    </Picture>
  );
};

export default PageBackground;
