import Layout from "@/components/layout";
const Cards = () => {
  return (
    <Layout>
      <h1 className="text-3xl">Cards</h1>
      <div className="grid grid-cols-5 mt-10 grid-flow-row gap-20">
        <div className="credit-card visa selectable">
          <div className="credit-card-last4">4242</div>
          <div className="credit-card-expiry">08/25</div>
        </div>
      </div>
    </Layout>
  );
};

export default Cards;
