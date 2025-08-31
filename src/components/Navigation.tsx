import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  BarChart3, 
  Camera, 
  Trophy, 
  Target, 
  Menu, 
  X,
  Home,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { 
    name: "Accueil", 
    href: "/", 
    icon: Home,
    description: "Vue d'ensemble" 
  },
  { 
    name: "Analyse", 
    href: "/analyse", 
    icon: Camera,
    description: "Screenshots & Analyses" 
  },
  { 
    name: "Matches Live", 
    href: "/matches", 
    icon: Play,
    description: "Cotes en temps réel" 
  },
  { 
    name: "Entraînement", 
    href: "/entrainement", 
    icon: Target,
    description: "Mode pratique" 
  },
  { 
    name: "Statistiques", 
    href: "/stats", 
    icon: BarChart3,
    description: "Performances & Progression" 
  },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header mobile */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-card/80">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Score Vision</h1>
              <p className="text-xs text-muted-foreground">Forge</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Navigation mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden">
          <nav className="fixed top-16 left-0 right-0 bg-card border-b border-border p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </nav>
        </div>
      )}

      {/* Navigation desktop (sidebar) */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-30">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Score Vision</h1>
              <p className="text-sm text-muted-foreground">Forge</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  <Icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs opacity-75">
                      {item.description}
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Résumé rapide en bas */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-2">Stratégie Actuelle</h3>
            <p className="text-xs text-muted-foreground">
              Prédire les buts entre 33min et mi-temps
            </p>
            <div className="flex gap-2 mt-2">
              <div className="flex-1 text-center p-2 bg-positive/10 rounded text-xs">
                <div className="font-bold text-positive">65%</div>
                <div className="text-positive/70">Positif</div>
              </div>
              <div className="flex-1 text-center p-2 bg-negative/10 rounded text-xs">
                <div className="font-bold text-negative">35%</div>
                <div className="text-negative/70">Négatif</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}