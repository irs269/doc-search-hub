import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Phone, ArrowLeft, Clock } from "lucide-react";

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
          <h1 className="text-2xl font-bold text-foreground">Pharmacies</h1>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher une pharmacie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-full border-2"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(5)].map((_, i) => (
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
            {filteredPharmacies.map((pharmacy) => (
              <Card
                key={pharmacy.id}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-secondary"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-foreground">
                          {pharmacy.name}
                        </h3>
                        {pharmacy.is_24h && (
                          <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
                            24h/24
                          </span>
                        )}
                      </div>

                      <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{pharmacy.address}</span>
                      </div>

                      {pharmacy.opening_hours && (
                        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                          <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{pharmacy.opening_hours}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleCall(pharmacy.phone_number)}
                    className="w-full bg-gradient-to-r from-secondary to-secondary-light hover:opacity-90"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    {pharmacy.phone_number}
                  </Button>
                </CardContent>
              </Card>
            ))}

            {filteredPharmacies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucune pharmacie trouvée</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pharmacies;
