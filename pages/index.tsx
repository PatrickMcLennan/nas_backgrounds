import { useEffect } from 'react';
import { browserClient } from '../clients';

export default function Index() {
  useEffect(() => {
    browserClient({
      method: `GET`,
      url: `/images`,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <h1 className="h1">Images</h1>
    </>
  );
}
