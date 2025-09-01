import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, TrendingUp, Clock, Play } from "lucide-react";

interface Match {
  id: string;
  team1: string;
  team2: string;
  league: string;
  startTime: string;
  odds: {
    team1: number;
    draw: number;
    team2: number;
  };
  status: "live" | "upcoming" | "finished";
}

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de données de matches
    setTimeout(() => {
      setMatches([
        {
          id: "1",
          team1: "PSG",
          team2: "Real Madrid",
          league: "Champions League",
          startTime: "20:00",
          odds: { team1: 1.85, draw: 3.20, team2: 2.10 },
          status: "live"
        },
        {
          id: "2",
          team1: "Barcelona",
          team2: "Bayern Munich",
          league: "Champions League",
          startTime: "21:00",
          odds: { team1: 2.30, draw: 3.40, team2: 1.75 },
          status: "upcoming"
        },
        {
          id: "3",
          team1: "Liverpool",
          team2: "Manchester City",
          league: "Premier League",
          startTime: "17:30",
          odds: { team1: 2.05, draw: 3.10, team2: 1.95 },
          status: "live"
        },
        {
          id: "4",
          team1: "AC Milan",
          team2: "Inter Milan",
          league: "Serie A",
          startTime: "18:45",
          odds: { team1: 2.20, draw: 3.30, team2: 1.80 },
          status: "upcoming"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: Match["status"]) => {
    switch (status) {
      case "live":
        return <Badge className="bg-red-500 text-white animate-pulse">🔴 Live</Badge>;
      case "upcoming":
        return <Badge variant="secondary">À venir</Badge>;
      case "finished":
        return <Badge variant="outline">Terminé</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Matches Live</h1>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Eye className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Matches Live</h1>
        </div>
        <Button variant="outline" size="sm">
          <TrendingUp className="w-4 h-4 mr-2" />
          Actualiser
        </Button>
      </div>

      <div className="grid gap-4">
        {matches.map((match) => (
          <Card key={match.id} className="hover:shadow-card transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {match.team1} vs {match.team2}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{match.league}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(match.status)}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {match.startTime}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">{match.team1}</div>
                  <div className="text-lg font-bold text-primary">{match.odds.team1}</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Match nul</div>
                  <div className="text-lg font-bold text-primary">{match.odds.draw}</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">{match.team2}</div>
                  <div className="text-lg font-bold text-primary">{match.odds.team2}</div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Analyser
                </Button>
                {match.status === "live" && (
                  <Button size="sm" variant="secondary" className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Regarder
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}