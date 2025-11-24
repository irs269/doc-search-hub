import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Stethoscope, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingCard from "@/components/LoadingCard";

interface Specialty {
  id: string;
  name: string;
  icon: string;
  doctor_count?: number;
}

const Specialties = () => {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      const { data, error } = await supabase
        .from("specialties")
        .select("*")
        .order("name");

      if (error) throw error;
      setSpecialties(data || []);
    } catch (error) {
      console.error("Error fetching specialties:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSpecialties = specialties.filter((specialty) =>
    specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-6">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-md sm:max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-full hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Spécialités</h1>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une spécialité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 rounded-2xl border-2 bg-background shadow-sm focus:shadow-md transition-shadow"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-4 max-w-md sm:max-w-2xl">
        {loading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-3 animate-fade-in">
            {filteredSpecialties.map((specialty, index) => (
              <Card
                key={specialty.id}
                className="cursor-pointer active:scale-[0.98] transition-all duration-300 border-0 group overflow-hidden animate-slide-up"
                style={{ 
                  animationDelay: `${index * 40}ms`,
                  boxShadow: 'var(--shadow-card)'
                }}
                onClick={() => navigate(`/doctors?specialty=${specialty.id}`)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform">
                      {specialty.icon || "🏥"}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {specialty.name}
                      </h3>
                      {specialty.doctor_count && (
                        <p className="text-sm text-muted-foreground font-medium mt-0.5">
                          {specialty.doctor_count} médecin{specialty.doctor_count > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-lg transition-all">
                        <Stethoscope className="h-5 w-5 text-primary group-hover:text-white transition-colors" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredSpecialties.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">
                  Aucune spécialité trouvée
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">Essayez une autre recherche</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Specialties;
