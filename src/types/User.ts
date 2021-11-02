export interface User {
    id?: string;
    uid?: string;
    email?: string;
    username?: string;
    acceptedDefaultUsername?: boolean;
    displayName?: string;
    photoURL?: string;
    providerData?: Array<any>;
  }
