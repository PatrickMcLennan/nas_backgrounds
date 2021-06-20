import {
  Box,
  Breadcrumbs as MaterialUiBreadcrumbs,
  Link as MaterialLink,
  Typography,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';

export default function BreadCrumbs() {
  const router = useRouter();
  return (
    <Box p={1}>
      <MaterialUiBreadcrumbs
        aria-label="Breadcrumb navigation"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link href="/">
          <HomeIcon />
        </Link>
        {router?.query?.image && (
          <>
            <Link href="/" passHref>
              <MaterialLink>Images</MaterialLink>
            </Link>
          </>
        )}
        {router?.query?.image && (
          <Typography noWrap>{router.query.image}</Typography>
        )}
      </MaterialUiBreadcrumbs>
    </Box>
  );
}
