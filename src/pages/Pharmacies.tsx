import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Phone, ArrowLeft, Clock } from "lucide-react";
import LoadingCard from "@/components/LoadingCard";

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone_number: string;
  opening_hours: string | null;
  is_24h: boolean;
}

const Pharmacies = () => {
  const navigate = useNavigate();
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      const { data, error } = await supabase
        .from("pharmacies")
        .select("*")
        .order("name");

      if (error) throw error;
      setPharmacies(data || []);
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPharmacies = pharmacies.filter(
    (pharmacy) =>
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

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
            <h1 className="text-2xl font-bold text-foreground">Pharmacies</h1>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une pharmacie..."
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
            {[...Array(5)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {filteredPharmacies.map((pharmacy, index) => (
              <Card
                key={pharmacy.id}
                className="transition-all duration-300 border-0 overflow-hidden animate-slide-up"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                <CardContent className="p-5">
                  <div className="mb-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center shadow-lg">
                          <span className="text-2xl">💊</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-foreground leading-tight mb-1">
                            {pharmacy.name}
                          </h3>
                          {pharmacy.is_24h && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-secondary to-secondary-light text-white text-xs font-bold rounded-full shadow-sm">
                              <Clock className="h-3 w-3" />
                              24h/24
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-secondary/70" />
                        <span className="leading-relaxed">{pharmacy.address}</span>
                      </div>

                      {pharmacy.opening_hours && (
                        <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary/70" />
                          <span className="leading-relaxed">{pharmacy.opening_hours}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleCall(pharmacy.phone_number)}
                    className="w-full bg-gradient-to-r from-secondary to-secondary-light text-white shadow-md hover:shadow-lg active:scale-[0.98]"
                    size="lg"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    <span className="font-semibold">{pharmacy.phone_number}</span>
                  </Button>
                </CardContent>
              </Card>
            ))}

            {filteredPharmacies.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">Aucune pharmacie trouvée</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Essayez une autre recherche</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pharmacies;
