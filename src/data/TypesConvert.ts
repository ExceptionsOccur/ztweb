import {
  ControllerSettings,
  ControllerType,
  ControllerV4Settings,
  ControllerV6Settings,
  ControllerRoutesSettings,
  MemberType,
  MemberSettings,
  NodeType,
} from "./Types";
import TypeDefault from "./TypesDefault";

const TypesConvert = {
  toMiniNodeType: (node: NodeType) => {
    let n = TypeDefault.MiniNodeType();
    n.naddress = node.address;
    n.ntime = node.clock;
    n.nstatus = node.online;
    n.nid = node.planetWorldId;
    n.nversion = node.version;
    return n;
  },

  toControllerSettings: (c: ControllerType): ControllerSettings => {
    let cs = TypeDefault.ControllerSettings();
    cs.nwid = c.nwid;
    cs.name = c.name;
    cs.private = c.private;
    cs.ipAssignmentPools = c.ipAssignmentPools;
    cs.routes = c.routes;
    cs.v4AssignMode = c.v4AssignMode;
    cs.v6AssignMode = c.v6AssignMode;
    return cs;
  },
  toControllerV4Settings: (ct: ControllerSettings): ControllerV4Settings => {
    let v4s = TypeDefault.ControllerV4Settings();
    v4s.nwid = ct.nwid;
    v4s.ipAssignmentPools = ct.ipAssignmentPools;
    v4s.routes = ct.routes;
    v4s.v4AssignMode = ct.v4AssignMode;
    return v4s;
  },
  toControllerV6Settings: (ct: ControllerSettings): ControllerV6Settings => {
    let v6s = TypeDefault.ControllerV6Settings();
    v6s.nwid = ct.nwid;
    v6s.ipAssignmentPools = ct.ipAssignmentPools;
    v6s.v6AssignMode = ct.v6AssignMode;
    return v6s;
  },
  toControllerRouteSettings: (
    ct: ControllerSettings
  ): ControllerRoutesSettings => {
    let routes = TypeDefault.ControllerRoutesSettings();
    routes.routes = ct.routes;
    return routes;
  },
  toMemberSettings: (mt: MemberType): MemberSettings => {
    let ms = TypeDefault.MemberSettings();
    ms.nwid = mt.nwid;
    ms.id = mt.id;
    ms.ipAssignments = mt.ipAssignments;
    ms.authorized = mt.authorized;
    ms.version = `${mt.vMajor}.${mt.vMinor}.${mt.vRev}`;
    return ms;
  },
};

export default TypesConvert;
