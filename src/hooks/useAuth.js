import { getAuthToken, setAuthToken, clearAuthToken } from '../services/auth'

export default function useAuth() {
  const token = getAuthToken()
  const isAuthenticated = !!token

  return {
    setToken: setAuthToken,
    token,
    isAuthenticated,
    clearToken: clearAuthToken,
  }
}
