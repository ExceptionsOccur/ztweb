import api from "../api/api";
import request from "../request/request";
import { NodeType } from "../data/Types";

export function getNodeStatus(): Promise<NodeType> {
  return new Promise((resolve) => {
    request({
      url: api.Node.getNodeStatus,
    }).then((res: any) => {
      resolve(res);
    });
  });
}

export function getPeers(): Promise<any> {
  return new Promise((resolve) => {
    request({
      url: api.Peer.listPeers,
    }).then((res: any) => {
      resolve(res);
    });
  });
}

export function getPeerDetail(peer_id: string): Promise<any> {
  return new Promise((resolve) => {
    request({
      url: api.Peer.getPeerDetail + `/${peer_id}`,
    }).then((res: any) => {
      resolve(res);
    });
  });
}

export function getControllerStatus(): Promise<any> {
  return new Promise((resolve) => {
    request({
      url: api.Controller.getControllerStatus,
    }).then((res: any) => {
      resolve(res);
    });
  });
}

export function deleteControllerNetwork(network_id: string): Promise<any> {
  return new Promise((resolve) => {
    request({
      method: "DELETE",
      url: api.Controller.deleteNetwork + `/${network_id}`,
    }).then((res: any) => {
      resolve(res);
    });
  });
}

export function getNetworkMembers(network: string): Promise<Array<string>> {
  return new Promise((resolve) => {
    request({
      url: api.Controller.updateNetwork + "/" + network + "/member",
    }).then((res: any) => {
      let keys = Object.keys(res);
      if (keys.length < 1) resolve([]);
      else resolve(keys);
    });
  });
}
