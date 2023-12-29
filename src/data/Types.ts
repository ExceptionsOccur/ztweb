export enum CardType {
  node = "节点详情",
  network = "网络管理",
  controller = "控制器管理",
  system = "系统状态",
}

export const MemberState = {
  OK: "OK",
  REQUESTING_CONFIGURATION: "REQUESTING_CONFIGURATION",
  ACCESS_DENIED: "ACCESS_DENIED",
};

export interface MemberCount {
  [key: string]: number;
}

export interface ResponseData {
  code: number;
  data: any;
}

export interface SystemInfoType {
  host: {
    os: string;
    platform: string;
    arch: string;
    version: string;
    uptime: number;
  };
  load: {
    load1: number;
    load5: number;
    load15: number;
  };
  memory: {
    total: number;
    used: number;
    available: number;
    usedPercent: number;
  };
  cpu: {
    cores: number;
    name: string;
  };
  [key: string]: string | object;
}

export interface SystemInfoMini {
  host: string;
  load: string;
  memory: string;
  cpu: string;
  uptime: string;
  [key: string]: string;
}

export interface ControllerIPv4Settings {
  nwid: string;
  ipAssignmentPools: [
    {
      ipRangeStart: string;
      ipRangeEnd: string;
    }
  ];
  routes: [
    {
      target: string;
      via: string | null;
    }
  ];
  v4AssignMode: { zt: boolean };
  [key: string]: string | Array<object> | object;
}

export interface ControllerSettings {
  nwid: string;
  name: string;
  private: boolean;
  ipAssignmentPools: {
    ipRangeStart: string;
    ipRangeEnd: string;
  }[];
  routes: {
    target: string;
    via: string | null;
  }[];
  v4AssignMode: { zt: boolean };
  v6AssignMode: { "6plane": boolean; rfc4193: boolean; zt: boolean };
  [key: string]: boolean | string | Array<object> | object;
}

export interface ControllerV4Settings {
  nwid: string;
  ipAssignmentPools: {
    ipRangeStart: string;
    ipRangeEnd: string;
  }[];
  routes: {
    target: string;
    via: string | null;
  }[];
  v4AssignMode: { zt: boolean };
  [key: string]: string | Array<object> | object;
}

export interface ControllerV6Settings {
  nwid: string;
  ipAssignmentPools: {
    ipRangeStart: string;
    ipRangeEnd: string;
  }[];
  v6AssignMode: { "6plane": boolean; rfc4193: boolean; zt: boolean };
  [key: string]: string | Array<object> | object;
}

export interface NodeType {
  address: string;
  clock: string;
  config: {
    settings: {
      allowTcpFallbackRelay: boolean;
      forceTcpRelay: boolean;
      listeningOn: Array<string>;
      portMappingEnabled: boolean;
      primaryPort: number;
      secondaryPort: number;
      softwareUpdate: string;
      softwareUpdateChannel: string;
      surfaceAddresses: Array<string>;
      tertiaryPort: number;
      [key: string]: boolean | number | string | Array<string>;
    };
  };
  online: boolean;
  planetWorldId: number;
  planetWorldTimestamp: string;
  publicIdentity: string;
  tcpFallbackActive: boolean;
  version: string;
  versionBuild: number;
  versionMajor: number;
  versionMinor: number;
  versionRev: number;
  [key: string]: boolean | number | string | object;
}

export interface MiniNodeType {
  naddress: string;
  ntime: string;
  nstatus: boolean;
  nid: number;
  nversion: string;
  [key: string]: boolean | number | string;
}

export interface MiniNetworkType {
  ntotal: number;
  nrecent: string;
  nauths: number;
  nversion: string;
  [key: string]: number | string;
}
export interface MiniControllerType {
  ctotal: number;
  cmember: number;
  cauths: number;
  cversion: string;
  [key: string]: number | string;
}

export interface NetworkType {
  allowDNS: boolean;
  allowDefault: boolean;
  allowGlobal: boolean;
  allowManaged: boolean;
  assignedAddresses: Array<string>;
  bridge: boolean;
  broadcastEnabled: boolean;
  dhcp: boolean;
  dns: {
    domain: string;
    servers: Array<string>;
  };
  id: string;
  mac: string;
  mtu: number;
  multicastSubscriptions: [
    {
      adi: number;
      mac: string;
    }
  ];
  name: string;
  netconfRevision: number;
  nwid: string;
  portDeviceName: string;
  portError: number;
  routes: {
    flags: number;
    metric: number;
    target: string;
    via: string;
  }[];
  status: string;
  type: string;
  [key: string]: boolean | number | string | object;
}

export interface ControllerType {
  authTokens: Array<string>;
  authorizationEndpoint: string;
  capabilities: Array<object>;
  clientId: string;
  creationTime: string;
  dns: Array<string>;
  enableBroadcast: boolean;
  id: string;
  ipAssignmentPools: {
    ipRangeStart: string;
    ipRangeEnd: string;
  }[];
  mtu: number;
  multicastLimit: number;
  name: string;
  nwid: string;
  objtype: string;
  private: boolean;
  remoteTraceLevel: number;
  remoteTraceTarget: string;
  revision: number;
  routes: {
    target: string;
    via: string | null;
  }[];
  rules: [{ type: string }];
  rulesSource: string;
  ssoEnabled: boolean;
  tags: Array<object>;
  v4AssignMode: { zt: boolean };
  v6AssignMode: { "6plane": boolean; rfc4193: boolean; zt: boolean };
  [key: string]:
    | boolean
    | number
    | string
    | Array<string>
    | Array<object>
    | object;
}

export interface ControllerRoutesSettings {
  routes: {
    target: string;
    via: string | null;
  }[];
  [key: string]: Array<object>;
}

export interface MemberType {
  activeBridge: boolean;
  address: string;
  authenticationExpiryTime: number;
  authorized: boolean;
  capabilities: Array<object>;
  creationTime: number;
  id: string;
  identity: string;
  ipAssignments: Array<string>;
  lastAuthorizedCredential: object;
  lastAuthorizedCredentialType: object;
  lastAuthorizedTime: number;
  lastDeauthorizedTime: number;
  noAutoAssignIps: boolean;
  nwid: string;
  objtype: string;
  remoteTraceLevel: number;
  remoteTraceTarget: string;
  revision: number;
  ssoExempt: boolean;
  tags: Array<object>;
  vMajor: number;
  vMinor: number;
  vProto: number;
  vRev: number;
  [key: string]:
    | boolean
    | number
    | string
    | Array<string>
    | Array<object>
    | object;
}

export interface MemberSettings {
  nwid: string;
  authorized: boolean;
  id: string;
  ipAssignments: Array<string>;
  version: string;
  [key: string]: boolean | number | string | Array<string>;
}
