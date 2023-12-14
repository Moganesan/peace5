import Layout from "@/components/layout";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useAddPasswordModalContext } from "@/components/addPassword/addPasswordModalContext";

const Passwords = () => {
  const { setShowAddPasswordModal } = useAddPasswordModalContext();
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Passwords</h1>
        <button
          className="border-2 p-4 text-xl"
          onClick={() => setShowAddPasswordModal(true)}
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-5 mt-10 grid-flow-row">
        <div className="border-2 w-64 p-5 cursor-pointer hover:scale-105 duration-500">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" />
          <h1>Google</h1>
          <p>ht.moganesan@gmail.com</p>
        </div>
      </div>
    </Layout>
  );
};

export default Passwords;
