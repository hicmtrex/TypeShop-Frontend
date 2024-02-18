import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
  className?: string;
  imageUrl?: string;
  style?: any;
};

const ImageLazy = ({ className, imageUrl, style }: Props) => {
  return (
    <LazyLoadImage
      style={style}
      src={imageUrl}
      loading="lazy"
      //    width={width}
      className={className}
      // height={height}
      alt="Image Alt"
      effect="blur"
    />
  );
};

export default ImageLazy;
