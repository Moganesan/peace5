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
  protocolDefinition: any | null;
};

const Web5Context = createContext<Props>({
  web5: null,
  did: null,
  protocolDefinition: null,
});

const Web5ContextProvider: FC<WithChildren> = ({ children }) => {
  const [web5, setWeb5] = useState<any | null>();
  const [did, setDid] = useState<any | null>();
  const [protocolDefinition, setProtocolDefinition] = useState<any>();
  const instantiateWeb5 = useCallback(async () => {
    const { Web5 } = await import("@web5/api");
    const checkDid = localStorage.getItem("mydid");
    try {
      if (checkDid) {
        const { web5, did } = await Web5.connect({ connectedDid: checkDid });
        setDid(did);
        setWeb5(web5);
        console.log("Mydid", did);
        if (web5 && did) {
          await configureProtocol(web5, did);
        }
      } else {
        const { web5, did } = await Web5.connect({ sync: "5s" });

        localStorage.setItem("mydid", did);
        setDid(did);
        setWeb5(web5);
        if (web5 && did) {
          await configureProtocol(web5, did);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const queryForProtocol = async (web5: any) => {
    return await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: "https://moganesan.github.io/peace5-protocol",
        },
      },
    });
  };

  const installProtocolLocally = async (web5: any, protocolDefinition: any) => {
    return await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
  };

  const createProtocolDefinition = () => {
    const peace5ProtocolDefinition = {
      protocol: "https://moganesan.github.io/peace5-protocol",
      published: true,
      types: {
        passwords: {
          schema: "https://moganesan.github.io/passwords",
          dataFormats: ["application/json"],
        },
        cards: {
          schema: "https://moganesan.github.io/cards",
          dataFormats: ["application/json"],
        },
        documents: {
          schema: "https://moganesan.github.io/documents",
          dataFormats: ["application/json"],
        },
      },
      structure: {
        passwords: {
          $actions: [
            { who: "anyone", can: "write" },
            { who: "author", of: "passwords", can: "read" },
          ],
        },
        cards: {
          $actions: [
            { who: "anyone", can: "write" },
            { who: "author", of: "cards", can: "read" },
          ],
        },
        documents: {
          $actions: [
            { who: "anyone", can: "write" },
            { who: "author", can: "read" },
          ],
        },
      },
    };
    setProtocolDefinition(peace5ProtocolDefinition);
    return peace5ProtocolDefinition;
  };
  const configureProtocol = async (web5: any, did: any) => {
    const protocolDefinition = createProtocolDefinition();
    const { protocols: localProtocol, status: localProtocolStatus } =
      await queryForProtocol(web5);
    console.log({ localProtocol, localProtocolStatus });
    if (localProtocolStatus.code !== 200 || localProtocol.length === 0) {
      const { protocol, status } = await installProtocolLocally(
        web5,
        protocolDefinition
      );
      console.log("Protocol installed locally", protocol, status);

      const { status: configureRemoteStatus } = await protocol.send(did);
      console.log(
        "Did the protocol install on the remote DWN?",
        configureRemoteStatus
      );
    } else {
      console.log("Protocol already installed");
    }
  };
  useEffect(() => {
    instantiateWeb5();
  }, []);
  return (
    <Web5Context.Provider
      value={{
        did: did,
        web5: web5,
        protocolDefinition: protocolDefinition,
      }}
    >
      {children}
    </Web5Context.Provider>
  );
};

const useWeb5Context = () => useContext(Web5Context);

export { Web5ContextProvider, useWeb5Context };
