import { motion } from 'framer-motion';
import Skeleton from '@material-ui/lab/Skeleton';
import { useState } from 'react';

type Props = {
  name: string;
  height: number;
  className?: string;
};

const IS_PROD = process.env.NODE_ENV === `production`;

export default function ResponsiveImage({ name, height, className }: Props) {
  const [loading, setLoaded] = useState(true);
  const getUrl = (size) =>
    `http://${
      IS_PROD ? process.env.PROD_URL : process.env.DEV_URL
    }/api/image/compressed/${name}/${size}`;

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
            media={`(max-width:${breakpoint}px)`}
          />
        ))}
        <motion.img
          onLoad={() => setLoaded(false)}
          src={getUrl(`small`)}
          alt={name}
          onError={(e) => console.error(e)}
          style={{
            height: `${height}px`,
            width: `100%`,
            opacity: 0,
          }}
          animate={{ opacity: loading ? 0 : 1, height: loading ? 0 : height }}
          className={className ?? `img`}
        />
      </picture>
    </div>
  );
}
