/* eslint-disable no-bitwise */
export const generateUuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const validateEmail = (email: string): boolean => {
  const regexp1 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const regexp2 = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return (
    regexp1.test(String(email.trim()).toLowerCase()) &&
    regexp2.test(String(email.trim()).toLowerCase())
  );
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  const regexp1 = /^(89|79)[\d]{9}$/gm;
  return regexp1.test(String(phoneNumber).replace(/[\D]/gi, ''));
}

export const extractDate = (data: any): any => {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map(x => extractDate(x));
  }

  if (typeof data === "object" && !Array.isArray(data)) {
    const keys = Object.keys(data);
    for (let key of keys) {
      data[key] = extractDate(data[key]);
    }
    return data;
  }

  if (typeof data === "string") {
    var a;
    a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(data);
    if (a) {
      return new Date(data);
    }
    return data;
  }

  return data;
}

export const formatPhoneNumber = (phone: string) => {
  if (!phone || typeof phone != "string") return "";
  const formatted = (phone as any).match(/(\-)|(\))/g)?.length > 0 ? true : false;
  const val = phone.replace(/\D/g, "");
  const mask = `+${val.length >= 1 ? val[0] : 7}-${val[1]||""}${val[2]||""}${val[3]||""}-${val[4]||""}${val[5]||""}${val[6]||""}-${val[7]||""}${val[8]||""}${val[9]||""}${val[10]||""}`;
  return mask.substr(0, formatted ? phone.length > 4 ? phone.length + 1 : phone.length : mask.length).replace(/(\-|\))*$/, "");
}

export const maskedDate = (raw: string) => {
  if (!raw || typeof raw != "string") return "";
  const formatted = (raw as any).match(/(\-)|(\))/g)?.length > 0 ? true : false;
  const val = raw.replace(/\D/igm, "");
  const day = val.substr(0, 2);
  const month = val.substr(2, 2);
  const year = val.substr(4, 4);
  return `${day.length > 0 ? day : "__"}.${month.length > 0 ? month : "__"}.${year.length > 0 ? year : "____"}`;
}
