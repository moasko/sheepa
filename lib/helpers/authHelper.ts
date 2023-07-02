import { getSession, signIn, signOut, useSession } from 'next-auth/react';


/**
 * Récupère la session active de l'utilisateur.
 * @returns La session active.
 */
export const getActiveSession = async () => {
  const session = await getSession();
  return session;
};

/**
 * Vérifie si l'utilisateur est connecté.
 * @returns True si l'utilisateur est connecté, sinon False.
 */
export const isUserLoggedIn = async () => {
  const session = await getActiveSession();
  return !!session;
};

/**
 * Vérifie si l'utilisateur a un rôle spécifique.
 * @param role Le rôle à vérifier.
 * @returns True si l'utilisateur a le rôle spécifié, sinon False.
 */
export const hasUserRole = async (role: string) => {
  const session = await getActiveSession();
  return session?.user?.role === role;
};

/**
 * Connecte l'utilisateur.
 */
export const login = async () => {
  await signIn();
};

/**
 * Déconnecte l'utilisateur.
 */
export const logout = async () => {
  await signOut();
};

export const isAuthentificated = () => {
  const session = useSession()
  return session.status === "authenticated"
}