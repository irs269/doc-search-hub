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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Médecins</h1>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un médecin..."
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
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 animate-fade-in">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary"
                onClick={() => navigate(`/doctor/${doctor.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary">
                      <AvatarImage src={doctor.photo || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary-light text-primary-foreground font-semibold">
                        {getInitials(doctor.first_name, doctor.last_name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground">
                        Dr. {doctor.first_name} {doctor.last_name}
                      </h3>

                      {doctor.specialties && (
                        <div className="flex items-center gap-2 mt-1 mb-2">
                          <span className="text-sm">
                            {doctor.specialties.icon || "🏥"}
                          </span>
                          <span className="text-sm text-primary font-medium">
                            {doctor.specialties.name}
                          </span>
                        </div>
                      )}

                      <div className="flex items-start gap-2 text-sm text-muted-foreground mb-1">
                        <Building2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{doctor.hospital}</span>
                      </div>

                      {doctor.address && (
                        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-1">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{doctor.address}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-secondary font-medium">
                        <Phone className="h-4 w-4" />
                        <span>{doctor.phone_number}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredDoctors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun médecin trouvé</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
