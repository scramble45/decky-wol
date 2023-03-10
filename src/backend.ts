import {
  ServerAPI
} from "decky-frontend-lib"

var serverAPI: ServerAPI | undefined = undefined;

export function setServerAPI(s: ServerAPI) {
  serverAPI = s;
}

async function backend_call<I, O>(name: string, params: I): Promise<O> {
  try {
    const res = await serverAPI!.callPluginMethod<I, O>(name, params);
    if (res.success) return res.result;
    else {
      console.error(res.result);
      throw res.result;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function is_running(): Promise<boolean> {
  return backend_call<{}, boolean>("is_running", {});
}

export async function toggle_wol(): Promise<boolean> {
  return backend_call<{}, boolean>("toggle_wol", {});
}

export async function uninstall(): Promise<{}> {
  return backend_call<{}, {}>("uninstall", {});
}

export async function ip(): Promise<string> {
  return backend_call<{}, string>("ip", {});
}

export async function hwmac(): Promise<string> {
  return backend_call<{}, string>("hwmac", {});
}