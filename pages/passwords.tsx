import Layout from "@/components/layout";

const Passwords = () => {
  return (
    <Layout>
      <h1 className="text-3xl">Passwords</h1>
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
