
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { useForm } from "@refinedev/react-hook-form";
import { Create, SaveButton, TextField } from "@refinedev/mantine";
import { Input } from "@mantine/core";
import { supabaseClient } from "src/utility";




export default function BlogPostCreate() {

  const {
    refineCore: { onFinish, formLoading, queryResult },
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  

  async function getUser() {
 const data = await supabaseClient.auth.getUser()

return data.data.user
  }
  
 
  const onSubmit2 = (data:any) => {
    if (!data.title || !data.content) {
      // Handle empty fields error
      console.log('Please fill in all fields');
      return;
    }
    (
      async () => {
      try {
        const result = await getUser();
         data.userID= result?.email
       onFinish(data);
      } catch (error) {
        console.error(error); // Handle any errors
      }
    })();
    
   
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit2)}>
      <Input {...register('title')} placeholder="Title"/>
      {errors.title && <span>Please enter a title</span>}
      <Input {...register('content')} placeholder="Content" />
      {errors.content && <span>Please enter the content</span>}
      <SaveButton type="submit"/>
    </form>
  );
}
export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
 const{authenticated,redirectTo} = await authProvider.check(context)

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
