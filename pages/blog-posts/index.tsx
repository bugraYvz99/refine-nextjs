import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { Table, Pagination } from "@mantine/core";
import { List, DateField, EditButton } from "@refinedev/mantine";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import React, { useMemo } from "react";
import { headers } from "next/dist/client/components/headers";

export default function BlogPostList() {

 interface IPost {
  id: number;
  created_At: string;
  Bugranın_title: string;
  bugranın_content: string;
}


  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
       
        
        {
            id: "title",
            header: "Title",
            accessorKey: "title",
        },
        {
            id: "userID",
            header: "User Email",
            accessorKey: "userID",
        },
        {
            id: "content",
            header: "Content",
            accessorKey: "content",
        },{
            id: "created_at",
            header: "Created at",
            accessorKey: "created_at",
        
            cell: function render({ getValue }) {
                return (
                    <DateField value={getValue() as string} format="LLL" />
                );
            },
        },
    ],
    [],
);



  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { setCurrent, pageCount, current },
    
} = useTable({
    columns,
});

return (
  <List >
      <Table mt={15} bg={"orange"} c={"white"} style={{"display":"grid;",
    "grid":"row", "gap":"34px"}}>
          <thead>
              {getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                          <th key={header.id}>
                              {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                          </th>
                      ))}
                  </tr>
              ))}
          </thead>
          <tbody>
              {getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
                              {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                              )}
                          </td>
                      ))}<EditButton
               recordItemId={row.original.id}
              
              />
                  </tr>
              ))}
              
          </tbody>
      </Table>
      <br />
      <Pagination
    
          position="right"
          total={pageCount}
          page={current}
          onChange={setCurrent}
      />
  </List>
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
