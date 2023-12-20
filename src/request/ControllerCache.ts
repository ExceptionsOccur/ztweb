import api from "../api/api";
import CommonRequest from "./request";
import {
  ControllerSettings,
  ControllerType,
  MemberSettings,
  MemberType,
  MemberCount,
} from "../data/Types";
import TypesConvert from "../data/TypesConvert";
import { generateRoute } from "../utils/utils";

const ControllerCache = {
  getAllControllerType: (): Promise<Array<ControllerType>> => {
    return request.getAllControllerType();
  },
  getAllMembersTypeByNwid: (nwid: string): Promise<Array<MemberType>> => {
    return request.getAllMembersTypeByNwid(nwid);
  },

  createController: (name: string): Promise<ControllerType> => {
    return request.createController(name);
  },
  deleteController: (nwid: string): Promise<ControllerType> => {
    return request.deleteController(nwid);
  },
  countMembers: (): Promise<MemberCount> => {
    return request.countMembers();
  },

  updateMember: (ms: MemberSettings): Promise<any> => {
    return request.updateMember(ms);
  },
  deleteMember: (ms: MemberSettings): Promise<any> => {
    return request.deleteMember(ms);
  },

  updateControllerIPv4Setting: (ct: ControllerType) => {
    ct.routes = [];
    if (ct.ipAssignmentPools[0])
      ct.routes.push({
        target: generateRoute(ct.ipAssignmentPools[0].ipRangeStart),
        via: "",
      });
    let settings = TypesConvert.toControllerSettings(ct);
    return request.updateController(settings);
  },
  updateControllerIPv6Setting: (ct: ControllerType) => {
    let settings = TypesConvert.toControllerSettings(ct);
    return request.updateController(settings);
  },
  updateControllerRouteSetting: (ct: ControllerType) => {
    let settings = TypesConvert.toControllerSettings(ct);
    return request.updateController(settings);
  },
};

//-------------------------------------------------------------------
const request = {
  getAllControllerType: (): Promise<Array<ControllerType>> => {
    return new Promise((resolve) => {
      CommonRequest({
        method: "POST",
        url: api.Controller.getAllControllerType,
      }).then((res: any) => {
        let tmp: Array<ControllerType> = [];
        res.map((item: any) => {
          tmp.push(JSON.parse(item));
        });
        resolve(tmp);
      });
    });
  },

  getAllMembersTypeByNwid: (nwid: string): Promise<Array<MemberType>> => {
    return new Promise((resolve) => {
      CommonRequest({
        method: "POST",
        url: api.Controller.getAllMembersTypeByNwid,
        data: JSON.stringify({ nwid: nwid }),
      }).then((res: any) => {
        if (res == null) {
          resolve([]);
          return;
        }
        let tmp: Array<MemberType> = [];
        res.map((item: any) => {
          tmp.push(JSON.parse(item));
        });
        resolve(tmp);
      });
    });
  },

  createController: (name: string): Promise<ControllerType> => {
    return new Promise((resolve) => {
      CommonRequest({
        method: "POST",
        url: api.Controller.createController,
        data: JSON.stringify({ name: name }),
      }).then((res: any) => {
        resolve(JSON.parse(res));
      });
    });
  },
  deleteController: (nwid: string): Promise<ControllerType> => {
    return new Promise((resolve) => {
      CommonRequest({
        method: "POST",
        url: api.Controller.deleteController,
        data: JSON.stringify({ nwid: nwid }),
      }).then((res: any) => {
        resolve(JSON.parse(res));
      });
    });
  },
  countMembers: (): Promise<MemberCount> => {
    return new Promise((resolve) => {
      CommonRequest({
        method: "POST",
        url: api.Controller.countMembers,
        data: JSON.stringify({}),
      }).then((res: any) => {
        resolve(res);
      });
    });
  },

  updateMember: (ms: MemberSettings): Promise<any> => {
    return new Promise((resolve) => {
      CommonRequest({
        url: api.Controller.updateMember,
        method: "POST",
        data: JSON.stringify(ms),
      }).then((res: any) => {
        resolve(res);
      });
    });
  },

  deleteMember: (ms: MemberSettings): Promise<any> => {
    return new Promise((resolve) => {
      CommonRequest({
        url: api.Controller.deleteMember,
        method: "POST",
        data: JSON.stringify(ms),
      }).then((res: any) => {
        resolve(res);
      });
    });
  },
  updateController: (cs: ControllerSettings): Promise<any> => {
    return new Promise((resolve) => {
      CommonRequest({
        url: api.Controller.updateController,
        method: "POST",
        data: JSON.stringify(cs),
      }).then((res: any) => {
        resolve(res);
      });
    });
  },
};

export default ControllerCache;
