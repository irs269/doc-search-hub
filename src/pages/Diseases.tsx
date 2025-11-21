import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Activity, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Disease {
  id: string;
  name: string;
  description: string;
  specialty_id: string;
  specialties?: {
    name: string;
  };
}

const Diseases = () => {
  const navigate = useNavigate();
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const { data, error } = await supabase
        .from("diseases")
        .select("*, specialties(name)")
        .order("name");

      if (error) throw error;
      setDiseases(data || []);
    } catch (error) {
      console.error("Error fetching diseases:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDiseases = diseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Maladies</h1>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher une maladie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-full border-2"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 animate-fade-in">
            {filteredDiseases.map((disease) => (
              <Card
                key={disease.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-secondary"
                onClick={() =>
                  navigate(`/doctors?specialty=${disease.specialty_id}&disease=${disease.id}`)
                }
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center flex-shrink-0">
                      <Activity className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {disease.name}
                      </h3>
                      {disease.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {disease.description}
                        </p>
                      )}
                      {disease.specialties && (
                        <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                          {disease.specialties.name}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredDiseases.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucune maladie trouvée</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Diseases;
