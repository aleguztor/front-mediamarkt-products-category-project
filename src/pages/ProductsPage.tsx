import { PropsWithChildren } from 'react';

const ProductPage = ({ children }: PropsWithChildren) => {
  return <div className="products-page">{children}</div>;
};

export default ProductPage;
