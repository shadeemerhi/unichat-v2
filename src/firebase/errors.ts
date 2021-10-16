interface ErrorDictionary<ErrorKey> {
  [id: string]: ErrorKey
}

export const FIREBASE_ERRORS: ErrorDictionary<string> = {
  'Firebase: Error (auth/wrong-password).': 'Incorrect email or password',
};

export default FIREBASE_ERRORS;
