import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Camera, FileImage, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Analyse() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "Fichier téléchargé",
        description: `${file.name} est prêt pour l'analyse`,
      });
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      toast({
        title: "Erreur",
        description: "Veuillez d'abord télécharger un screenshot",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    // Simulation d'analyse
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analyse terminée",
        description: "Les cotes ont été extraites avec succès",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Camera className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Analyse de Screenshots</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Télécharger Screenshot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <FileImage className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-sm text-muted-foreground">
                  Glissez votre screenshot ici ou cliquez pour sélectionner
                </span>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </Label>
            </div>

            {uploadedFile && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <FileImage className="w-4 h-4" />
                <span className="text-sm font-medium">{uploadedFile.name}</span>
              </div>
            )}

            <Button 
              onClick={handleAnalyze}
              disabled={!uploadedFile || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Analyser Screenshot
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Section Résultats */}
        <Card>
          <CardHeader>
            <CardTitle>Résultats d'Analyse</CardTitle>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Extraction des cotes en cours...</p>
              </div>
            ) : uploadedFile ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Cotes détectées :</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Équipe 1:</span>
                      <span className="ml-2 font-medium">1.85</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Match nul:</span>
                      <span className="ml-2 font-medium">3.20</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Équipe 2:</span>
                      <span className="ml-2 font-medium">2.10</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Confiance:</span>
                      <span className="ml-2 font-medium text-positive">92%</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Téléchargez un screenshot pour voir les résultats
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}