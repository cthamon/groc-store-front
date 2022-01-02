import type { NextPage } from 'next';

import { fetchProducts } from '../services/query';
import { Layout, Loading, Products } from '../components';

const Home: NextPage = () => {
  const { data: products, isLoading } = fetchProducts();

  return (
    <Layout>
      {isLoading ? <Loading /> : <Products products={products?.data} />}
    </Layout>
  );
};

export default Home;
