import Reactotron, { networking, openInEditor } from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';

import { storage } from '@/core/lib/storage';

Reactotron.configure({ name: 'Seenye' })
  .useReactNative()
  .use(openInEditor())
  .use(networking())
  .use(mmkvPlugin({ storage, ignore: [] }))
  .connect();

console.tron = Reactotron;
