import api from "../api/api";
import CommonRequest from "../utils/request";
import { NetworkType, NodeType } from "../data/Types";

const NetworkCache = {
  getAllNetworks: (): Promise<Array<NetworkType>> => {
    return request.getAllNetworkType();
  },

  leaveNetwork: (nt: NetworkType, node: NodeType): Promise<any> => {
    return request.leaveNetwork(nt, node);
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
        resolve(JSON.parse(res.data));
      });
    });
  },

  leaveNetwork: (nt: NetworkType, node: NodeType): Promise<any> => {
    return new Promise((resolve) => {
      CommonRequest({
        method: "POST",
        url: api.Network.leaveNetwork,
        data: JSON.stringify({ nwid: nt.nwid, id: node.address }),
      }).then((res: any) => {
        resolve(res.data);
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
        resolve(res.data);
      });
    });
  },
};

export default NetworkCache;
