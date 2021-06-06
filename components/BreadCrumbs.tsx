import {
  Breadcrumbs as MaterialUiBreadcrumbs,
  Typography,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function BreadCrumbs() {
  const router = useRouter();
  return (
    <MaterialUiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
      <Link href="/">
        <a>Home</a>
      </Link>
      {router?.query?.image && (
        <>
          <Link href="/">
            <a>Images</a>
          </Link>
        </>
      )}
      {router?.query?.image && (
        <Typography variant="span" noWrap>
          {router.query.image}
        </Typography>
      )}
    </MaterialUiBreadcrumbs>
  );
}
