//@ts-nocheck *v2 not supporting typescript yet*

import * as React from "react";
import {
  NextLink,
  PageLink,
  Pagination as StrapiPagination,
  PreviousLink,
} from "@strapi/design-system/v2";
import pluginId from "../../pluginId";

const Pagination = ({
  page,
  total,
  pageSize,
  pageCount,
  onClick,
}: {
  page: number;
  total: number;
  pageSize: number;
  pageCount: number;
  onClick: any;
}) => {
  const nextPage = page + 1;
  const previousPage = page - 1;

  if (pageCount === 1) {
    return <></>;
  }

  return (
    <>
      <StrapiPagination activePage={page} pageCount={total}>
        <PreviousLink onClick={() => onClick(previousPage)}>
          Go to previous page
        </PreviousLink>

        {Array(pageCount)
          .fill({})
          .map((d, pageNumber) => (
            <PageLink
              number={pageNumber + 1}
              onClick={() => onClick(pageNumber + 1)}
            >
              Go to page {pageNumber + 1}
            </PageLink>
          ))}
        <NextLink onClick={() => onClick(nextPage)}>
          Go to next page
        </NextLink>
      </StrapiPagination>
    </>
  );
};

export default Pagination;
