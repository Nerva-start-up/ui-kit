import type { Story } from "@ladle/react";
import { useState } from "react";
import { Pagination } from "./Pagination";

export default { title: "Components / Navigation / Pagination" };

export const Default: Story = () => {
  const [page, setPage] = useState(1);
  return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
};

export const WithTotal: Story = () => {
  const [page, setPage] = useState(3);
  return (
    <Pagination page={page} totalPages={12} onPageChange={setPage} total={235} pageSize={20} />
  );
};

export const FewPages: Story = () => {
  const [page, setPage] = useState(2);
  return <Pagination page={page} totalPages={5} onPageChange={setPage} />;
};

export const Interactive: Story<{ totalPages: number }> = ({ totalPages }) => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      total={totalPages * 20}
      pageSize={20}
    />
  );
};
Interactive.args = { totalPages: 15 };
Interactive.argTypes = { totalPages: { control: { type: "number", min: 2, max: 50, step: 1 } } };
