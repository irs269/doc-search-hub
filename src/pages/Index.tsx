import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Activity, Building2 } from "lucide-react";
import logo from "@/assets/logo.png";

const Index = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Spécialités",
      description: "Rechercher par spécialité médicale",
      icon: Stethoscope,
      path: "/specialties",
      gradient: "from-primary to-primary-light",
    },
    {
      title: "Maladies",
      description: "Rechercher par symptômes ou maladie",
      icon: Activity,
      path: "/diseases",
      gradient: "from-secondary to-secondary-light",
    },
    {
      title: "Pharmacies",
      description: "Trouver une pharmacie proche",
      icon: Building2,
      path: "/pharmacies",
      gradient: "from-primary-dark to-secondary",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Logo and Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="docRech Logo"
              className="h-24 w-auto animate-pulse-slow"
            />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            docRech
          </h1>
          <p className="text-lg text-muted-foreground">
            Trouvez rapidement un médecin à Moroni
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.path}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(category.path)}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {category.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 text-center">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                🏥 Plus de 50 professionnels de santé référencés
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Trouvez le bon médecin pour vos besoins de santé
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
