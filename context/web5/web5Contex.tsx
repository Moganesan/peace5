import {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { WithChildren } from "@/helpers/reactHelper";

type Props = {
  web5: any | null;
  did: any | null;
};

const Web5Context = createContext<Props>({
  web5: null,
  did: null,
});

const Web5ContextProvider: FC<WithChildren> = ({ children }) => {
  const [web5, setWeb5] = useState<any | null>();
  const [did, setDid] = useState<any | null>();
  const instantiateWeb5 = useCallback(async () => {
    const { Web5 } = await import("@web5/api");
    const checkDid = localStorage.getItem("mydid");
    try {
      if (checkDid) {
        const { web5, did } = await Web5.connect({ connectedDid: checkDid });
        setDid(did);
        setWeb5(web5);
      } else {
        const { web5, did } = await Web5.connect({ sync: "5s" });

        localStorage.setItem("mydid", did);
        setDid(did);
        setWeb5(web5);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    instantiateWeb5();
  }, []);
  return (
    <Web5Context.Provider value={{ did: did, web5: web5 }}>
      {children}
    </Web5Context.Provider>
  );
};

const useWeb5Contex = () => useContext(Web5Context);

export { Web5ContextProvider, useWeb5Contex };
