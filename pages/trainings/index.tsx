import { MantineShowInferencer } from '@refinedev/inferencer/mantine'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react'
import { authProvider } from 'src/authProvider';
import { GetServerSideProps } from "next";
export default function training () {
  return (
    <div>
    <h1>BURAYI KENDIN YAP</h1>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps<{}> = async (context:any) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!authenticated) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/trainings")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};