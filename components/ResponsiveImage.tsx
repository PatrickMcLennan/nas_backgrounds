import { PathLike } from 'fs';
import { useCallback } from 'react';
import { useImage } from 'react-image';
import Skeleton from '@material-ui/lab/Skeleton';

type Props = {
  name: string;
  height: number;
};

const IS_PROD = process.env.NODE_ENV === `production`;

export default function ResponsiveImage({ name, height }: Props) {
  const getUrl = (size) =>
    `http://${
      IS_PROD ? process.env.PROD_URL : process.env.DEV_URL
    }/api/image/compressed/${name}/${size}`;

  const { src, isLoading, error } = useImage({
    srcList: getUrl(`small`),
    useSuspense: false,
  });

  if (error) console.error(error);
  return isLoading ? (
    <Skeleton height={height.toString()} animation="wave" />
  ) : (
    <picture>
      {[
        { size: `small`, breakpoint: 676 },
        { size: `medium`, breakpoint: 990 },
        { size: `large`, breakpoint: 1200 },
      ].map(({ size, breakpoint }) => (
        <source
          key={size}
          srcSet={getUrl(size)}
          media={`min-width:${breakpoint}px`}
        />
      ))}
      <img className="img" src={src} alt={name} />
    </picture>
  );
}
