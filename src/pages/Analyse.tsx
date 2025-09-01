import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Camera, FileImage, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Analyse() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setUploadedFiles(fileArray);
      toast({
        title: "Fichiers téléchargés",
        description: `${fileArray.length} image(s) prête(s) pour l'analyse`,
      });
    }
  };

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez d'abord télécharger des screenshots",
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
                  Glissez vos screenshots ici ou cliquez pour sélectionner (plusieurs images)
                </span>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </Label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <FileImage className="w-4 h-4" />
                    <span className="text-sm font-medium">{file.name}</span>
                  </div>
                ))}
              </div>
            )}

            <Button 
              onClick={handleAnalyze}
              disabled={uploadedFiles.length === 0 || isAnalyzing}
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
            ) : uploadedFiles.length > 0 ? (
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
                Téléchargez des screenshots pour voir les résultats
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}