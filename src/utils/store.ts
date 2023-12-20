import { defineStore } from "pinia";
import { NodeType } from "../data/Types";
import TypesDefault from "../data/TypesDefault";
import { ref } from "vue";
import api from "../api/api";
import CommonRequest from "../request/request";
import { covertTime } from "./utils";

export const useNodeStore = defineStore("nodeType", () => {
  const node_status = ref<NodeType>(TypesDefault.NodeType());

  function getNodeType() {
    return node_status.value;
  }

  function setNodeType(nt: NodeType) {
    node_status.value = nt;
  }

  function prefetch() {
    requestNodeStatus().then((res) => {
      node_status.value = res;
    });
  }

  function requestNodeStatus(): Promise<NodeType> {
    return new Promise((resolve) => {
      CommonRequest({
        url: api.Node.getNodeStatus,
      }).then((res: any) => {
        res.planetWorldTimestamp = covertTime(res.planetWorldTimestamp);
        res.clock = covertTime(res.clock);
        resolve(res);
      });
    });
  }

  return { setNodeType, getNodeType, prefetch };
});
