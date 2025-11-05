import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(!!localStorage.getItem("accessToken"));

  const login = async (email, password) => {
    try {
      setError("");
      setIsLoading(true);
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Invalid email or password");
      }
      const data = await response.json();
      if (data.access_token && data.refresh_token) {
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        await fetchProfile(data.access_token);
        return true;
      }
      throw new Error("No tokens received from login");
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfile = async (token) => {
    try {
      const response = await authFetch("https://api.escuelajs.co/api/v1/auth/profile", {}, token);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Unauthorized: ${errorData.message || response.statusText}`);
      }
      const data = await response.json();
      setUser(data);
      setError("");
    } catch (error) {
      console.error("Profile fetch error:", error.message);
      if (error.message.includes("Unauthorized")) {
        setError("Invalid or expired access token. Attempting to refresh...");
        const newToken = await refreshAccessToken();
        if (newToken) {
          try {
            await fetchProfile(newToken);
          } catch (retryError) {
            console.error("Retry profile fetch error:", retryError.message);
            setError("Failed to load profile after token refresh. Please log in again.");
            logout();
          }
        } else {
          setError("Failed to refresh token. Please log in again.");
          logout();
        }
      } else {
        setError(error.message || "Failed to load profile. Please try again.");
      }
    }
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) {
      setError("No refresh token available. Please log in again.");
      logout();
      return null;
    }
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      const data = await response.json();
      if (data.access_token && data.refresh_token) {
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        setError("");
        return data.access_token;
      } else {
        throw new Error("No tokens returned from refresh endpoint");
      }
    } catch (error) {
      console.error("Refresh token error:", error.message);
      setError(error.message || "Session expired. Please log in again.");
      logout();
      return null;
    }
  };

  const authFetch = async (url, options = {}, token = accessToken) => {
    const fetchWithToken = async (token) => {
      const response = await fetch(url, {
        ...options,
        headers: { ...options.headers, Authorization: `Bearer ${token}` },
      });
      return response;
    };

    let response = await fetchWithToken(token);

    if (response.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        response = await fetchWithToken(newToken);
      }
    }

    return response;
  };

  const logout = () => {
    setUser(null);
    setAccessToken("");
    setRefreshToken("");
    localStorage.clear();
    setError("");
    setIsLoading(false);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (accessToken && !user && !isLoading) {
        setIsLoading(true);
        await fetchProfile(accessToken);
      } else {
        setIsLoading(false);
      } 
    };
    initializeAuth();
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, authFetch, error, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};