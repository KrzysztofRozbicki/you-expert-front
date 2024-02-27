import { memo } from 'react';
import Link from 'next/link';

const LinkController = (props) => {
  const { href, as, customStyle, className, children, ...otherProps } = props;

  return (
    <Link href={href} as={as} {...otherProps}>
      <a style={{ ...customStyle }} className={className}>
        {children}
      </a>
    </Link>
  );
};

export default memo(LinkController);
