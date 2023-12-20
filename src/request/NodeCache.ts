import api from "../api/api";
import CommonRequest from "./request";
import { NodeType, SystemInfo } from "../data/Types";
import { covertTime } from "../utils/utils";
import TypesDefault from "../data/TypesDefault";

const NodeCache = {
  getNodeStatus: () => {
    return request.getNodeType();
  },
  getSystemInfo: () => {
    return request.getSystemInfo();
  },
};

const request = {
  getNodeType(): Promise<NodeType> {
    return new Promise((resolve) => {
      CommonRequest({
        method: "POST",
        url: api.Node.getNodeStatus,
      }).then((res: any) => {
        if (res.error) {
          resolve(TypesDefault.NodeType());
          return;
        }
        let res_json = JSON.parse(res);
        res_json.clock = covertTime(res_json.clock);
        resolve(res_json);
      });
    });
  },
  getSystemInfo(): Promise<SystemInfo> {
    return new Promise((resolve) => {
      CommonRequest({
        method: "POST",
        url: api.System.getSystemInfo,
      }).then((res: any) => {
        let system_info = TypesDefault.SystemInfo();
        system_info.cpu.cores = res.cpu.length;
        system_info.cpu.name = res.cpu[0].modelName;
        system_info.host.arch = res.host.kernelArch;
        system_info.host.os = res.host.os;
        system_info.host.platform = res.host.platform;
        system_info.host.uptime = res.host.uptime;
        system_info.host.version = res.host.kernelVersion;
        system_info.load = res.load;
        system_info.memory.total = res.memory.total;
        system_info.memory.used = res.memory.used;
        system_info.memory.available = res.memory.available;
        system_info.memory.usedPercent = res.memory.usedPercent;
        resolve(system_info);
      });
    });
  },
};

export default NodeCache;
