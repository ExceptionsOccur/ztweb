import {
  ControllerType,
  ControllerSettings,
  ControllerV4Settings,
  ControllerV6Settings,
  ControllerRoutesSettings,
  MemberSettings,
  MiniNodeType,
  NetworkType,
  NodeType,
  SystemInfoMini,
  MiniControllerType,
  MiniNetworkType,
  SystemInfoType,
} from "./Types";

const TypesDefault = {
  MiniNodeType: (): MiniNodeType => {
    return {
      naddress: "",
      ntime: "",
      nstatus: false,
      nid: 0,
      nversion: "",
    };
  },
  MiniNetworkType: (): MiniNetworkType => {
    return {
      ntotal: 0,
      nrecent: "",
      nauths: 0,
      nversion: "",
    };
  },
  MiniControllerType: (): MiniControllerType => {
    return {
      ctotal: 0,
      cmember: 0,
      cauths: 0,
      cversion: "",
    };
  },

  SystemInfo: (): SystemInfoType => {
    return {
      host: {
        os: "unknow",
        platform: "unknow",
        arch: "unknow",
        version: "unknow",
        uptime: 0,
      },
      load: {
        load1: 0,
        load5: 0,
        load15: 0,
      },
      memory: {
        total: 0,
        used: 0,
        available: 0,
        usedPercent: 0,
      },
      cpu: {
        cores: 0,
        name: "unknow",
      },
    };
  },
  SystemInfoMini: (): SystemInfoMini => {
    return {
      host: "",
      load: "",
      memory: "",
      cpu: "",
      uptime: "",
    };
  },

  NodeType: (): NodeType => {
    return {
      address: "",
      clock: "",
      config: {
        settings: {
          allowTcpFallbackRelay: false,
          forceTcpRelay: false,
          listeningOn: [],
          portMappingEnabled: false,
          primaryPort: 0,
          secondaryPort: 0,
          softwareUpdate: "",
          softwareUpdateChannel: "",
          surfaceAddresses: [],
          tertiaryPort: 0,
        },
      },
      online: false,
      planetWorldId: 0,
      planetWorldTimestamp: "",
      publicIdentity: "",
      tcpFallbackActive: false,
      version: "",
      versionBuild: 0,
      versionMajor: 0,
      versionMinor: 0,
      versionRev: 0,
    };
  },

  ControllerType: (): ControllerType => {
    return {
      authTokens: [],
      authorizationEndpoint: "",
      capabilities: [],
      clientId: "",
      creationTime: "",
      dns: [],
      enableBroadcast: false,
      id: "",
      ipAssignmentPools: [],
      mtu: 0,
      multicastLimit: 0,
      name: "",
      nwid: "",
      objtype: "",
      private: false,
      remoteTraceLevel: 0,
      remoteTraceTarget: "",
      revision: 0,
      routes: [],
      rules: [{ type: "" }],
      rulesSource: "",
      ssoEnabled: false,
      tags: [],
      v4AssignMode: { zt: false },
      v6AssignMode: { "6plane": false, rfc4193: false, zt: false },
    };
  },
  ControllerSettings: (): ControllerSettings => {
    return {
      nwid: "",
      name: "",
      private: true,
      ipAssignmentPools: [],
      routes: [
        {
          target: "",
          via: "",
        },
      ],
      v4AssignMode: { zt: false },
      v6AssignMode: { "6plane": false, rfc4193: false, zt: false },
    };
  },
  ControllerV4Settings: (): ControllerV4Settings => {
    return {
      nwid: "",
      ipAssignmentPools: [],
      routes: [
        {
          target: "",
          via: "",
        },
      ],
      v4AssignMode: { zt: false },
    };
  },
  ControllerV6Settings: (): ControllerV6Settings => {
    return {
      nwid: "",
      ipAssignmentPools: [],
      v6AssignMode: { "6plane": false, rfc4193: false, zt: false },
    };
  },
  ControllerRoutesSettings: (): ControllerRoutesSettings => {
    return {
      routes: [],
    };
  },
  MemberSettings: (): MemberSettings => {
    return {
      nwid: "",
      authorized: false,
      id: "",
      ipAssignments: [],
      version: "",
    };
  },
  NetworkType: (): NetworkType => {
    return {
      allowDNS: false,
      allowDefault: false,
      allowGlobal: false,
      allowManaged: false,
      assignedAddresses: [""],
      bridge: false,
      broadcastEnabled: false,
      dhcp: false,
      dns: {
        domain: "",
        servers: [""],
      },
      id: "",
      mac: "",
      mtu: 0,
      multicastSubscriptions: [
        {
          adi: 0,
          mac: "",
        },
      ],
      name: "",
      netconfRevision: 0,
      nwid: "",
      portDeviceName: "",
      portError: 0,
      routes: [
        {
          flags: 0,
          metric: 0,
          target: "",
          via: "",
        },
      ],
      status: "",
      type: "",
    };
  },
};

export default TypesDefault;
