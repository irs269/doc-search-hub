import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Building2,
  MessageCircle,
  Clock,
} from "lucide-react";
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

const DoctorDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchDoctor(id);
    }
  }, [id]);

  const fetchDoctor = async (doctorId: string) => {
    try {
      const { data, error } = await supabase
        .from("doctors")
        .select("*, specialties(name, icon)")
        .eq("id", doctorId)
        .single();

      if (error) throw error;
      setDoctor(data);
    } catch (error) {
      console.error("Error fetching doctor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    if (doctor?.phone_number) {
      window.location.href = `tel:${doctor.phone_number}`;
    }
  };

  const handleWhatsApp = () => {
    if (doctor?.phone_number) {
      const phone = doctor.phone_number.replace(/\D/g, "");
      window.open(`https://wa.me/269${phone}`, "_blank");
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4"></div>
          <div className="h-8 bg-muted rounded w-64 mx-auto mb-2"></div>
          <div className="h-6 bg-muted rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Médecin non trouvé</p>
          <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Card className="border-2 shadow-lg animate-fade-in">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <Avatar className="w-32 h-32 border-4 border-primary mb-4">
                <AvatarImage src={doctor.photo || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary-light text-primary-foreground text-3xl font-bold">
                  {getInitials(doctor.first_name, doctor.last_name)}
                </AvatarFallback>
              </Avatar>

              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dr. {doctor.first_name} {doctor.last_name}
              </h1>

              {doctor.specialties && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{doctor.specialties.icon || "🏥"}</span>
                  <span className="text-lg text-primary font-semibold">
                    {doctor.specialties.name}
                  </span>
                </div>
              )}
            </div>

            {doctor.description && (
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">{doctor.description}</p>
              </div>
            )}

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border">
                <Building2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Hôpital</p>
                  <p className="text-muted-foreground">{doctor.hospital}</p>
                </div>
              </div>

              {doctor.address && (
                <div className="flex items-start gap-3 p-4 bg-card rounded-lg border">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground">Adresse</p>
                    <p className="text-muted-foreground">{doctor.address}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 p-4 bg-card rounded-lg border">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Téléphone</p>
                  <p className="text-muted-foreground">{doctor.phone_number}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleCall}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-light hover:opacity-90"
              >
                <Phone className="mr-2 h-5 w-5" />
                Appeler
              </Button>

              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="bg-gradient-to-r from-secondary to-secondary-light hover:opacity-90"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDetail;
