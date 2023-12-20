import api from "../api/api";
import CommonRequest from "../utils/request";
import { NetworkType } from "../data/Types";

const NetworkCache = {
  getAllNetworks: (): Promise<Array<NetworkType>> => {
    return request.getAllNetworkType();
  },

  leaveNetwork: (nt: NetworkType): Promise<any> => {
    return request.leaveNetwork(nt);
  },
  joinNetwork: (nwid: string): Promise<NetworkType> => {
    return request.joinNetwork(nwid);
  },
};

const request = {
  getAllNetworkType(): Promise<Array<NetworkType>> {
    return new Promise((resolve) => {
      CommonRequest({
        method: "POST",
        url: api.Network.getAllNetworkType,
        data: JSON.stringify({}),
      }).then((res: any) => {
        resolve(JSON.parse(res));
      });
    });
  },

  leaveNetwork: (nt: NetworkType): Promise<any> => {
    return new Promise((resolve) => {
      CommonRequest({
        method: "POST",
        url: api.Network.leaveNetwork,
        data: JSON.stringify({ nwid: nt.nwid }),
      }).then((res: any) => {
        resolve(res);
      });
    });
  },

  joinNetwork: (nwid: string): Promise<NetworkType> => {
    return new Promise((resolve) => {
      CommonRequest({
        method: "POST",
        url: api.Network.joinToNetwork,
        data: JSON.stringify({ nwid: nwid }),
      }).then((res: any) => {
        resolve(res);
      });
    });
  },
};

export default NetworkCache;
