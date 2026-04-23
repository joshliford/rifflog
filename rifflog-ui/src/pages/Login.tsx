import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { requestLogin } from "../services/authService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await requestLogin({ username, password });
      login(response.token);
      navigate("/");
    } catch (error) {
      setLoginError("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-8 bg-[#0c0c0d]">
      <div className="flex py-6">
        <h1 className="text-3xl text-white">Rifflog</h1>
      </div>
      <div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              <Label htmlFor="username">Username</Label>
              <Input
                className="border rounded-lg pl-2 p-1"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
              />
              <Label htmlFor="password">Password</Label>
              <Input
                className="border rounded-lg pl-2 p-1"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
              />
              <Button
                type="submit"
                className="w-full border rounded-lg p-1.5 hover:cursor-pointer transition-all hover:bg-gray-700"
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
              {loginError && (
                <div className="flex justify-center">
                  <p className="text-red-400">{loginError}</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
