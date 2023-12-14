import Layout from "@/components/layout";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useAddCardModal } from "@/components/addCard/addCardModalContext";
const Cards = () => {
  const { setShowAddCardModal, showAddCardModal } = useAddCardModal();
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Cards</h1>
        <button
          className="border-2 p-4 text-xl"
          onClick={() => setShowAddCardModal(true)}
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
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
