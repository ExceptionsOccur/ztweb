const Controller = "/controller";
const Network = "/network";
const Peer = "/peer";
const Node = "/node";
const Scheme = "/zerotier";
const User = "/user";
const System = "/sys";

const ws = "ws://10.101.5.53:8000/zerotier/ws";
const api = {
  ws: ws,
  User: {
    valid: Scheme + User + "/valid",
  },
  Controller: {
    getAllControllerType: Scheme + Controller + "/getAllControllerType",
    updateController: Scheme + Controller + "/updateController",
    createController: Scheme + Controller + "/createController",
    deleteController: Scheme + Controller + "/deleteController",
    getAllMembersTypeByNwid: Scheme + Controller + "/getAllMembersTypeByNwid",
    getMemberType: Scheme + Controller + "/getMemberType",
    countMembers: Scheme + Controller + "/countMembers",
    updateMember: Scheme + Controller + "/updateMember",
    deleteMember: Scheme + Controller + "/deleteMember",
  },

  Network: {
    getAllNetworkType: Scheme + Network + "/getAllNetworkType",
    joinToNetwork: Scheme + Network + "/joinToNetwork",
    leaveNetwork: Scheme + Network + "/leaveNetwork",
  },

  Peer: {
    listPeers: Peer,
    getPeerDetail: Peer, // with params peerid
  },

  Node: {
    getNodeStatus: Scheme + Node + "/status",
  },
  System: {
    getSystemInfo: Scheme + System + "/getSystemInfo",
  },
};

export default api;
