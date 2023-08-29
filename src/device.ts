import { ClientJS } from 'clientjs';
import { safeLocalStorage } from './storage';
import type { DeviceInfo } from './types';

const client = new ClientJS();

const defaultDeviceInfo = {
  deviceId: null,
  locale: null,
  platform: null,
};

// eslint-disable-next-line import/prefer-default-export
export function getDeviceInfo(): DeviceInfo {
  const data: DeviceInfo = {
    ...defaultDeviceInfo,
    locale: client.getLanguage(),
  };

  if (safeLocalStorage.getItem('astrolytics-dId')) {
    data.deviceId = safeLocalStorage.getItem('astrolytics-dId');
  } else {
    data.deviceId = client.getFingerprint().toString();
    safeLocalStorage.setItem('astrolytics-dId', data.deviceId);
  }

  const isIpad = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 0)
      || navigator.platform === 'iPad';

  data.platform = isIpad ? 'iPadOS' : client.getOS();

  return data;
}
