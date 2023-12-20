export function covertTime(timestamp: any) {
  return new Date(timestamp).toLocaleDateString();
}

export function randomIPRange(): string[] {
  let a_class = [10];
  let b_class = [172];
  let c_class = [192, 168];
  let random = Math.floor(Math.random() * 3);

  let res: Array<string> = [];

  switch (random) {
    case 0:
      {
        a_class.push(Math.floor(Math.random() * 256));
        a_class.push(Math.floor(Math.random() * 256));
        res.push(
          ...[
            a_class.join(".") + ".0/24",
            a_class.join(".") + ".1",
            a_class.join(".") + ".254",
          ]
        );
      }
      break;
    case 1:
      {
        b_class.push(Math.floor(Math.random() * 6) + 16);
        b_class.push(Math.floor(Math.random() * 256));
        res.push(
          ...[
            b_class.join(".") + ".0/24",
            b_class.join(".") + ".1",
            b_class.join(".") + ".254",
          ]
        );
      }
      break;
    case 2:
      {
        c_class.push(Math.floor(Math.random() * 256));
        res.push(
          ...[
            c_class.join(".") + ".0/24",
            c_class.join(".") + ".1",
            c_class.join(".") + ".254",
          ]
        );
      }
      break;
  }

  return res;
}

export function executeMoreTimes(fn: Function, times = 1): Array<any> {
  let res = [];
  while (times) {
    res.push(fn());
    times--;
  }
  return res;
}

export function getRFCIPStr(network_id: string): string {
  return `fd${network_id.slice(0, 2)}:${network_id.slice(
    2,
    6
  )}:${network_id.slice(6, 10)}:${network_id.slice(10, 14)}:${network_id.slice(
    14
  )}99:93__:____:____`;
}
interface ASCIITableObj {
  [key: string]: number | string;
}
const ASCIITable: ASCIITableObj = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": "a",
  "11": "b",
  "12": "c",
  "13": "d",
  "14": "e",
  "15": "f",
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
};

export function get6PlaneIPStr(network_id: string): string {
  let bytes = [];
  let high_32bit = network_id.slice(0, 8);
  let low_32bit = network_id.slice(8);
  for (let index = 0; index < high_32bit.length; index++) {
    bytes.push(
      ASCIITable[
        (ASCIITable[high_32bit[index]] as number) ^
          (ASCIITable[low_32bit[index]] as number)
      ].toString()
    );
  }
  let plane_ip = bytes.join("");
  return `fc${plane_ip.slice(0, 2)}:${plane_ip.slice(2, 6)}:${plane_ip.slice(
    6
  )}__:____:____:0000:0000:0001`;
}

export function generateRoute(ip: string) {
  let dst_arr = ip.split(".").slice(0, 3);
  dst_arr.push("0");
  return dst_arr.join(".") + "/24";
}

export function delArrayIndex(arr: any[], index: number): any[] {
  if (index > arr.length - 1) return arr;
  if (arr.length == 0 || (arr.length == 1 && index == 0)) return [];
  if (index == arr.length) return arr.slice(0, index);
  if (index == 0) return arr.slice(1);
  return arr.slice(0, index).concat(arr.slice(index + 1));
}

export function ptrWhenDel(arr: any[], index: number): number {
  if (index > arr.length - 1) return -1;
  if (arr.length == 0 || (arr.length == 1 && index == 0)) return -1;
  if (index == 0) return 1;
  return index - 1;
}
