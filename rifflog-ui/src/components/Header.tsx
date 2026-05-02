import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Disc3, Ghost, Guitar, Home, Search, Upload } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";

const baseNavLinks = [
  { to: "/", label: "Library", icon: Home },
  { to: "/rig", label: "Rig", icon: Guitar },
];

const authNavLinks = [{ to: "/admin/upload", label: "Upload", icon: Upload }];

export default function Header() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      navigate(`/?q=${encodeURIComponent(value)}`);
    } else {
      navigate("/");
    }
  };

  const navLinks = isAuthenticated
    ? [...baseNavLinks, ...authNavLinks]
    : baseNavLinks;

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <div className="max-w-screen flex items-center px-6 py-4 justify-between border-[#26262c] border-b bg-[#0b0b0c]">
      {/* Logo + title */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <Disc3 size={22} className="text-[#ff6b35]" />
          <span className="text-3xl font-semibold text-white tracking-tight">
            Rifflog
          </span>
        </Link>
        <span className="text-xs text-[#76766f] mt-4">/</span>
        <span className="text-[10px] uppercase tracking-widest text-[#76766f] mt-4">
          Josh's Guitar Journal
        </span>
      </div>

      {/* Nav */}
      <nav className="flex items-center gap-1">
        {navLinks.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-widest font-medium border-b-2 transition-colors ${
                isActive
                  ? "text-[#ff6b35] border-[#ff6b35]"
                  : "text-[#76766f] border-transparent hover:text-[#b8b7b3]"
              }`}
            >
              <Icon size={14} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Search + upload */}
      <div className="flex items-center gap-3">
        {isAuthenticated && (
          <Button
            variant={"ghost"}
            onClick={logout}
            className="text-[#ff6b35] border-[#ff6b35] bg-transparent hover:bg-[#ff6b35]/10 hover:text-[#ff6b35] hover:cursor-pointer"
          >
            Logout
          </Button>
        )}
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76766f] pointer-events-none"
          />
          <Input
            id="search"
            value={searchParams.get("q") || ""}
            onChange={handleSearch}
            type="text"
            placeholder="Search takes, gear, tags..."
            className="pl-8 pr-12 text-sm bg-[#111113] border-[#26262c] text-[#b8b7b3] placeholder:text-[#4a4a4f] w-64 h-8"
          />
        </div>
        {isAuthenticated && (
          <Link to="/admin/upload">
            <Button
              variant="outline"
              size="sm"
              className="border-[#ff6b35] text-[#ff6b35] bg-transparent hover:bg-[#ff6b35]/10 hover:text-[#ff6b35] hover:cursor-pointer uppercase tracking-widest text-xs gap-1.5"
            >
              <Upload size={13} />
              New Upload
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
