import * as React from "react";
import { BaseHeaderLayout, Box} from "@strapi/design-system";

interface HeadingProps {
  title: string;
  primaryAction?: React.ReactNode;
}

const Header = ({ title, primaryAction }: HeadingProps): JSX.Element => {

  return (
    <Box>
      <BaseHeaderLayout
        title={title}
        primaryAction={
          primaryAction ?? null
        }
      />
    </Box>
  );
};

export default Header;
