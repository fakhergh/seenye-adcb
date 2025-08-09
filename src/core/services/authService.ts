import {
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { useMutation } from '@tanstack/react-query';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation<
    FirebaseAuthTypes.UserCredential,
    FirebaseAuthTypes.NativeFirebaseAuthError,
    LoginDto
  >({
    mutationKey: ['login'],
    mutationFn: ({ email, password }: LoginDto) =>
      signInWithEmailAndPassword(getAuth(), email, password),
  });
}

export function useRegister() {
  return useMutation<
    FirebaseAuthTypes.UserCredential,
    FirebaseAuthTypes.NativeFirebaseAuthError,
    RegisterDto
  >({
    mutationKey: ['register'],
    mutationFn: async ({ name, email, password }: RegisterDto) => {
      const response = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password,
      );

      await response.user.updateProfile({ displayName: name });

      return response;
    },
  });
}
