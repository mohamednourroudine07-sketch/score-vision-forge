import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Camera, 
  Play, 
  Target, 
  BarChart3, 
  TrendingUp,
  Upload,
  Eye,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Screenshots Analysés",
      value: "247",
      change: "+12 cette semaine",
      icon: Camera,
      color: "text-primary"
    },
    {
      title: "Précision Globale",
      value: "68.4%",
      change: "+2.1% ce mois",
      icon: Target,
      color: "text-positive"
    },
    {
      title: "Matches Suivis", 
      value: "156",
      change: "23 aujourd'hui",
      icon: Play,
      color: "text-secondary"
    },
    {
      title: "Stratégies Testées",
      value: "8",
      change: "2 cette semaine",
      icon: BarChart3,
      color: "text-accent"
    }
  ];

  const quickActions = [
    {
      title: "Analyser Screenshots",
      description: "Importer et analyser de nouveaux screenshots",
      icon: Upload,
      variant: "hero" as const,
      onClick: () => navigate("/analyse")
    },
    {
      title: "Matches Live",
      description: "Voir les cotes en temps réel",
      icon: Eye,
      variant: "secondary" as const,
      onClick: () => navigate("/matches")
    },
    {
      title: "Mode Entraînement",
      description: "Pratiquer sur des captures d'écran",
      icon: Target,
      variant: "accent" as const,
      onClick: () => navigate("/entrainement")
    },
    {
      title: "Rapport Mensuel",
      description: "Générer un rapport de performance",
      icon: FileText,
      variant: "outline" as const,
      onClick: () => {}
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête héro */}
      <div className="bg-gradient-hero rounded-2xl p-8 text-white shadow-elevated">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">
            Bienvenue dans Score Vision Forge
          </h1>
          <p className="text-white/90 mb-6">
            Analysez vos screenshots de cotes, développez votre stratégie de paris sportifs 
            et maximisez vos performances avec des outils d'analyse avancés.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="lg" onClick={() => navigate("/analyse")}>
              <Camera className="w-5 h-5" />
              Commencer l'Analyse
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              <Play className="w-5 h-5" />
              Voir Guide
            </Button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-card transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>          
          );
        })}
      </div>

      {/* Actions rapides */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Actions Rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card key={action.title} className="hover:shadow-card transition-all duration-300 cursor-pointer group" onClick={action.onClick}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {action.title}
                    </CardTitle>
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4">
                    {action.description}
                  </p>
                  <Button variant={action.variant} size="sm" className="w-full">
                    Accéder
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Analyse récente */}
      <Card>
        <CardHeader>
          <CardTitle>Dernières Analyses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { match: "PSG vs Madrid", time: "Il y a 2h", result: "Positif", confidence: "92%" },
              { match: "Barcelona vs Bayern", time: "Il y a 4h", result: "Négatif", confidence: "78%" },
              { match: "Liverpool vs City", time: "Il y a 6h", result: "Positif", confidence: "85%" },
            ].map((analysis, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium">{analysis.match}</p>
                  <p className="text-sm text-muted-foreground">{analysis.time}</p>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    analysis.result === "Positif" 
                      ? "bg-positive/10 text-positive" 
                      : "bg-negative/10 text-negative"
                  }`}>
                    {analysis.result}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{analysis.confidence}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}