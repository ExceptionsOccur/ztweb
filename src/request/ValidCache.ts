import api from "../api/api";
import CommonRequest from "../utils/request";

import router from "../utils/routes";
import { getToken } from "../utils/token";

const ValidCache = {
  validPasscode: (passscode: string) => {
    return request.validPasscode(passscode);
  },
};

const request = {
  validPasscode(passcode: string): Promise<any> {
    return new Promise((resolve) => {
      CommonRequest({
        url: api.User.valid,
        method: "POST",
        data: JSON.stringify({ passcode: passcode }),
      }).then((res: any) => {
        if (getToken()) router.push("/content");
        resolve(res);
      });
    });
  },
};

export default ValidCache;
