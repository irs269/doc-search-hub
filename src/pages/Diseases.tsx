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
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5 pb-6">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-md sm:max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-full hover:bg-secondary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Maladies</h1>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une maladie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 rounded-2xl border-2 bg-background shadow-sm focus:shadow-md transition-shadow"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-4 max-w-md sm:max-w-2xl">
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse border-0 shadow-md">
                <CardContent className="p-5">
                  <div className="space-y-3">
                    <div className="h-6 bg-muted rounded-lg w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-6 bg-muted rounded-full w-1/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {filteredDiseases.map((disease, index) => (
              <Card
                key={disease.id}
                className="cursor-pointer active:scale-[0.98] transition-all duration-300 border-0 group overflow-hidden animate-slide-up"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  boxShadow: 'var(--shadow-card)'
                }}
                onClick={() =>
                  navigate(`/doctors?specialty=${disease.specialty_id}&disease=${disease.id}`)
                }
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <Activity className="h-7 w-7 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-foreground mb-2 leading-tight group-hover:text-secondary transition-colors">
                        {disease.name}
                      </h3>
                      {disease.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {disease.description}
                        </p>
                      )}
                      {disease.specialties && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-secondary/15 to-secondary/10 text-secondary text-xs font-bold rounded-full border border-secondary/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          {disease.specialties.name}
                        </span>
                      )}
                    </div>
                    <div className="flex-shrink-0 self-start mt-2">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:shadow-lg transition-all">
                        <svg className="w-5 h-5 text-secondary group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredDiseases.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">Aucune maladie trouvée</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Essayez une autre recherche</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Diseases;
