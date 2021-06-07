import { motion } from 'framer-motion';
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

  console.log(process.env.PROD_URL);

  return (
    <div style={{ height }}>
      {loading && <Skeleton height={loading ? 0 : height} animation="wave" />}
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
        <motion.img
          className="img"
          src={getUrl(`small`)}
          alt={name}
          onLoad={() => setLoaded(false)}
          style={{
            height: `${height}px`,
            opacity: 0,
          }}
          animate={{ opacity: loading ? 0 : 1, height: loading ? 0 : height }}
        />
      </picture>
    </div>
  );
}
