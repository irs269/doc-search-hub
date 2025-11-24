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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 pb-6">
      <div className="container mx-auto px-4 py-6 max-w-md sm:max-w-2xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Card className="border-0 overflow-hidden animate-fade-in-scale" style={{ boxShadow: 'var(--shadow-xl)' }}>
          <div className="h-2 bg-gradient-to-r from-primary via-primary-light to-secondary"></div>
          
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-20 animate-pulse-slow"></div>
                <Avatar className="w-32 h-32 border-4 border-white shadow-2xl relative z-10 ring-4 ring-primary/20">
                  <AvatarImage src={doctor.photo || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-primary via-primary-light to-secondary text-white text-3xl font-bold">
                    {getInitials(doctor.first_name, doctor.last_name)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 leading-tight">
                Dr. {doctor.first_name} {doctor.last_name}
              </h1>

              {doctor.specialties && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
                    <span className="text-lg">{doctor.specialties.icon || "🏥"}</span>
                  </div>
                  <span className="text-base font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {doctor.specialties.name}
                  </span>
                </div>
              )}
            </div>

            {doctor.description && (
              <div className="mb-6 p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl border border-border/50">
                <p className="text-muted-foreground leading-relaxed">{doctor.description}</p>
              </div>
            )}

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border/50 shadow-sm">
                <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground mb-0.5">Hôpital</p>
                  <p className="text-muted-foreground leading-relaxed">{doctor.hospital}</p>
                </div>
              </div>

              {doctor.address && (
                <div className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border/50 shadow-sm">
                  <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-secondary" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground mb-0.5">Adresse</p>
                    <p className="text-muted-foreground leading-relaxed">{doctor.address}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border/50 shadow-sm">
                <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground mb-0.5">Téléphone</p>
                  <p className="text-muted-foreground font-semibold">{doctor.phone_number}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleCall}
                size="lg"
                className="bg-gradient-to-r from-primary via-primary-light to-primary text-white shadow-lg hover:shadow-xl active:scale-[0.98] font-bold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Appeler
              </Button>

              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="bg-gradient-to-r from-secondary via-secondary-light to-secondary text-white shadow-lg hover:shadow-xl active:scale-[0.98] font-bold"
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
