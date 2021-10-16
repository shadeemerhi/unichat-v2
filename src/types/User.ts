export interface User {
    id?: string;
    uid: string;
    email: string;
    username?: string;
    displayName?: string;
    photoURL?: string;
    providerData: Array<any>;
  }
