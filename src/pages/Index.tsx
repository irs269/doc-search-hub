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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl animate-scale-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md sm:max-w-2xl relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-12 animate-fade-in-scale">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light to-secondary rounded-full blur-3xl opacity-30 animate-glow group-hover:opacity-50 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-20 animate-pulse-slow"></div>
              <img
                src={logo}
                alt="docRech Logo"
                className="h-32 w-auto relative z-10 drop-shadow-2xl floating"
              />
            </div>
          </div>
          <h1 className="text-6xl font-black mb-4 text-shimmer">
            docRech
          </h1>
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse"></div>
            <p className="text-base text-foreground font-semibold">
              Votre guide santé à Moroni
            </p>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-4 mb-10">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.path}
                className="cursor-pointer active:scale-[0.98] transition-all duration-500 border-0 group animate-slide-up overflow-hidden relative"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  boxShadow: 'var(--shadow-card)'
                }}
                onClick={() => navigate(category.path)}
              >
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                <CardContent className="p-0 relative">
                  <div className="flex items-center gap-5 p-6 bg-gradient-to-br from-background via-background to-background/95 relative z-10">
                    {/* Icon with advanced effects */}
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} blur-md opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                      <div
                        className={`w-20 h-20 flex-shrink-0 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110 group-active:scale-105 transition-all duration-300 shadow-xl relative`}
                      >
                        <Icon className="h-10 w-10 text-white drop-shadow-lg" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    <div className="flex-1 text-left">
                      <h2 className="text-xl font-bold text-foreground mb-1 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {category.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    
                    {/* Arrow with glow effect */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300 group-hover:shadow-lg">
                        <svg className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {/* Info Section with advanced design */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Card className="border-0 relative overflow-hidden group">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 animate-shimmer" style={{ backgroundSize: '200% 200%' }}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <CardContent className="p-8 relative">
              <div className="flex flex-col items-center gap-4">
                {/* Icon with multiple glow layers */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary-light to-secondary flex items-center justify-center shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl animate-bounce-subtle">🏥</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-2xl font-black bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent mb-1">
                    50+ Professionnels
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    Les meilleurs médecins et pharmacies de Moroni
                  </p>
                </div>
                
                {/* Trust indicators */}
                <div className="flex items-center gap-6 mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${i === 1 ? 'from-primary to-primary-light' : i === 2 ? 'from-secondary to-secondary-light' : 'from-primary-dark to-primary'} border-2 border-background flex items-center justify-center text-white text-xs font-bold`}>
                          {i === 1 ? '👨‍⚕️' : i === 2 ? '👩‍⚕️' : '💊'}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground ml-1">Vérifiés</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <span className="text-xs font-semibold text-muted-foreground">4.8/5</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
