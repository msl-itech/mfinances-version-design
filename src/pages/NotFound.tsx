import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useTilt } from "@/hooks/use-tilt";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div ref={root} className="flex min-h-screen items-center justify-center bg-muted">
      <SEOHead
        title="Page introuvable — MFinances"
        description="Cette page n'existe pas sur le site MFinances."
        canonical="https://mfinances.be/"
        noIndex
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page introuvable</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
