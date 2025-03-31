
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Laptop } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm border border-white/30 shadow-sm"
        >
          {theme === "light" ? (
            <Sun className="h-5 w-5 text-dutch-orange" />
          ) : theme === "dark" ? (
            <Moon className="h-5 w-5 text-dutch-blue" />
          ) : (
            <Laptop className="h-5 w-5 text-dutch-purple" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-sm border border-white/30">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="h-4 w-4 mr-2 text-dutch-orange" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="h-4 w-4 mr-2 text-dutch-blue" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="h-4 w-4 mr-2 text-dutch-purple" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
