import { MantineListInferencer } from "@refinedev/inferencer/mantine";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { Table, Pagination } from "@mantine/core";
import { List, DateField } from "@refinedev/mantine";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import React, { useMemo } from "react";

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
            id: "id",
            header: "ID",
            accessorKey: "id",
        },
        {
            id: "created_At",
            header: "created_At",
            accessorKey: "created_At",
        },
        {
            id: "Bugranın title",
            header: "Bugranın title",
            accessorKey: "Bugranın title",
        },
        {
            id: "bugranın content",
            header: "bugranın content",
            accessorKey: "bugranın content",
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
console.log(getHeaderGroups())
console.log(getRowModel())
console.log(columns)
return (
  <List >
      <Table>
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
                      ))}
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
