import { WithChildren } from "@/helpers/reactHelper";
import { useContext, createContext, FC, useState } from "react";

type props = {
  showAddPasswordModal: boolean;
  setShowAddPasswordModal: Function;
};

const AddPasswordModalContext = createContext<props>({
  showAddPasswordModal: false,
  setShowAddPasswordModal: () => {},
});

const AddPasswordModalContextProvider: FC<WithChildren> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <AddPasswordModalContext.Provider
      value={{
        setShowAddPasswordModal: setShowModal,
        showAddPasswordModal: showModal,
      }}
    >
      {children}
    </AddPasswordModalContext.Provider>
  );
};

const useAddPasswordModalContext = () => useContext(AddPasswordModalContext);

export { useAddPasswordModalContext, AddPasswordModalContextProvider };
