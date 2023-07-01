// Gerekli kütüphaneleri içe aktarın
import { IResourceComponentsProps } from "@refinedev/core";
import { DateField, Edit, useForm, useSelect } from "@refinedev/mantine";
import { NumberInput, TextInput, Textarea, Select } from "@mantine/core";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { authProvider } from "src/authProvider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from 'react';
import { Group } from '@mantine/core';

export default function  BlogPostEdit() {

 
 
  const {
    getInputProps,
    saveButtonProps,
   
  } = useForm({
    initialValues: {
      id: "",
      title: "",
      content: "",
     
     
    },
  });

 console.log(getInputProps("id"))

 
  
  

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <NumberInput mt="sm" disabled label="Id" {...getInputProps("id")} />
      <TextInput mt="sm" label="Title" {...getInputProps("title")} />
      <Textarea mt="sm" label="Content" autosize {...getInputProps("content")} />

      {/* 
          DatePicker bileşeni "@refinedev/mantine" paketinde bulunmamaktadır.
          <DatePicker> bileşenini kullanmak için, Mantine için resmi belgelere bakabilirsiniz.

          Docs: https://mantine.dev/dates/date-picker/
      */}
      
      <Group position="center">
     
  </Group>
</Edit>
    
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
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
        destination: `${redirectTo}?to=${encodeURIComponent("/blog-posts")}`,
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
