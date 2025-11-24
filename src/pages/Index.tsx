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
      <div className="container mx-auto px-4 py-8 max-w-md sm:max-w-2xl">
        {/* Logo and Header */}
        <div className="text-center mb-10 animate-fade-in-scale">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-20 animate-pulse-slow"></div>
              <img
                src={logo}
                alt="docRech Logo"
                className="h-28 w-auto relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent animate-fade-in">
            docRech
          </h1>
          <p className="text-base text-muted-foreground font-medium px-4">
            Votre guide santé à Moroni
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-5 mb-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.path}
                className="cursor-pointer active:scale-[0.98] transition-all duration-300 border-0 group animate-slide-up overflow-hidden"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  boxShadow: 'var(--shadow-card)'
                }}
                onClick={() => navigate(category.path)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-6 p-6">
                    <div
                      className={`w-20 h-20 flex-shrink-0 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110 group-active:scale-105 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="h-10 w-10 text-white drop-shadow-md" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 text-left">
                      <h2 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {category.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Card className="border-0 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
                <p className="text-lg font-bold text-foreground">
                  50+ professionnels
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Les meilleurs médecins et pharmacies de Moroni
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
