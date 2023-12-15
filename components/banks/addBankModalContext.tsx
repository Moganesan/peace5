import { WithChildren } from "@/helpers/reactHelper";
import { createContext, useContext, FC, useState } from "react";

type Props = {
  showAddBankModal: boolean;
  setShowAddBankModal: Function;
};

const AddBankModalContext = createContext<Props>({
  setShowAddBankModal: () => {},
  showAddBankModal: false,
});

const AddBankModalContextProvider: FC<WithChildren> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <AddBankModalContext.Provider
      value={{ setShowAddBankModal: setShowModal, showAddBankModal: showModal }}
    >
      {children}
    </AddBankModalContext.Provider>
  );
};

const useAddBankModalContext = () => useContext(AddBankModalContext);

export { useAddBankModalContext, AddBankModalContextProvider };
