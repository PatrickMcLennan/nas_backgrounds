import Head from 'next/head';

type Props = {
  title: string;
  description: string;
  image?: string;
};

export default function DocumentHead({ title, description, image }: Props) {
  return (
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="follow" />

      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="twitter:image" content={image} />}
      <meta property="og:url" content="PERMALINK" />
      <meta property="og:site_name" content="SITE NAME" />
    </Head>
  );
}
