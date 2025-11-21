import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Stethoscope, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
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
          <h1 className="text-2xl font-bold text-foreground">Spécialités</h1>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher une spécialité..."
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
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 animate-fade-in">
            {filteredSpecialties.map((specialty) => (
              <Card
                key={specialty.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary"
                onClick={() => navigate(`/doctors?specialty=${specialty.id}`)}
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-2xl">
                    {specialty.icon || "🏥"}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground">
                      {specialty.name}
                    </h3>
                    {specialty.doctor_count && (
                      <p className="text-sm text-muted-foreground">
                        {specialty.doctor_count} médecins
                      </p>
                    )}
                  </div>
                  <Stethoscope className="h-5 w-5 text-primary" />
                </CardContent>
              </Card>
            ))}

            {filteredSpecialties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Aucune spécialité trouvée
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Specialties;
