import { makeServerRequest } from "./request";

export function getProduct() {
  return makeServerRequest({ url: `/products`, method: "GET" });
}
export function setProduct(formData:Record<string, any>) {
    return makeServerRequest({ url: `/products`, method: "POST" , formData });
  }
