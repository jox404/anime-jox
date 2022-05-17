import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyARA5dPGxGP424brfob5RnMxua8EF4deVg",
    authDomain: "anime-jox.firebaseapp.com",
    projectId: "anime-jox",
    storageBucket: "anime-jox.appspot.com",
    messagingSenderId: "402222793891",
    appId: "1:402222793891:web:e9f168c3a21a38d5da6b16"




    /* apiKey: 'AIzaSyAGTvA79pDUGHVQgNCoLxBEkyi-JLt1Uws',
    authDomain: 'html-css-js-98aaf.firebaseapp.com',
    projectId: 'html-css-js-98aaf',
    storageBucket: 'html-css-js-98aaf.appspot.com',
    messagingSenderId: '294499340289',
    appId: '1:294499340289:web:b6f09bfd4ba39d21f57000', */
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);