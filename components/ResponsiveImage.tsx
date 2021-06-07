import { useImage } from 'react-image';
import Skeleton from '@material-ui/lab/Skeleton';
import { useState } from 'react';

type Props = {
  name: string;
  height: number;
};

const IS_PROD = process.env.NODE_ENV === `production`;

export default function ResponsiveImage({ name, height }: Props) {
  const [loading, setLoaded] = useState(true);
  const getUrl = (size) =>
    `http://${
      IS_PROD ? process.env.PROD_URL : process.env.DEV_URL
    }/api/image/compressed/${name}/${size}`;

  // if (error) console.error(error);

  return (
    <>
      {loading && <Skeleton height={height} animation="wave" />}
      <picture>
        {[
          { size: `small`, breakpoint: 676 },
          { size: `medium`, breakpoint: 990 },
          { size: `large`, breakpoint: 1200 },
        ].map(({ size, breakpoint }) => (
          <source
            key={size}
            srcSet={getUrl(size)}
            media={`(min-width:${breakpoint}px)`}
          />
        ))}
        <img className="img" alt={name} onLoad={() => setLoaded(false)} />
      </picture>
    </>
  );
}
