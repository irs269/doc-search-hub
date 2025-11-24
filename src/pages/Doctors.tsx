import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Phone, ArrowLeft, Building2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Doctor {
  id: string;
  first_name: string;
  last_name: string;
  photo: string | null;
  specialty_id: string;
  hospital: string;
  address: string;
  phone_number: string;
  description: string | null;
  specialties?: {
    name: string;
    icon: string;
  };
}

const Doctors = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const specialtyId = searchParams.get("specialty");
  const diseaseId = searchParams.get("disease");

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, [specialtyId, diseaseId]);

  const fetchDoctors = async () => {
    try {
      let query = supabase
        .from("doctors")
        .select("*, specialties(name, icon)")
        .order("last_name");

      if (specialtyId) {
        query = query.eq("specialty_id", specialtyId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setDoctors(data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-6">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-md sm:max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Médecins</h1>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher un médecin..."
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
              <Card key={i} className="animate-pulse border-0 shadow-md">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-muted"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-muted rounded-lg w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {filteredDoctors.map((doctor, index) => (
              <Card
                key={doctor.id}
                className="cursor-pointer active:scale-[0.98] transition-all duration-300 border-0 group overflow-hidden animate-slide-up"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  boxShadow: 'var(--shadow-card)'
                }}
                onClick={() => navigate(`/doctor/${doctor.id}`)}
              >
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <Avatar className="w-20 h-20 border-4 border-primary/10 ring-2 ring-primary/20 shadow-lg">
                      <AvatarImage src={doctor.photo || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary-light text-primary-foreground font-bold text-lg">
                        {getInitials(doctor.first_name, doctor.last_name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
                        Dr. {doctor.first_name} {doctor.last_name}
                      </h3>

                      {doctor.specialties && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm">
                              {doctor.specialties.icon || "🏥"}
                            </span>
                          </div>
                          <span className="text-sm text-primary font-semibold">
                            {doctor.specialties.name}
                          </span>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4 flex-shrink-0 text-primary/60" />
                          <span className="truncate">{doctor.hospital}</span>
                        </div>

                        {doctor.address && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0 text-secondary/60" />
                            <span className="truncate">{doctor.address}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm font-medium text-secondary">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <span>{doctor.phone_number}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 self-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-lg transition-all">
                        <svg className="w-5 h-5 text-primary group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredDoctors.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">Aucun médecin trouvé</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Essayez une autre recherche</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
