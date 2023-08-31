import { useEffect } from 'react';
import { log } from '../../utils/log';

export const useLogger = (ref, message) => {
  useEffect(() => {
    if (ref.current) {
      log(`${message} gefunden`, 'green');
    } else {
      log(`${message} nicht gefunden`, 'red');
    }
  }, [ref, message]);
};
