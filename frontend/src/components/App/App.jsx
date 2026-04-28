import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React, { Suspense, lazy } from "react";
const DashboardPage = lazy(() => import("../../pages/DashboardPage.jsx"));
const CommunityGoalsPage = lazy(
  () => import("../../pages/CommunityGoalsPage.jsx"),
);
const UIShowcasePage = lazy(() => import("../../pages/UIShowcasePage.jsx"));
import "./App.css";

function App() {
  return (
    <div className="app-shell text-foreground">
      <div className="app-shell__bg" aria-hidden="true" />

      <header className="app-shell__header">
        <div className="app-shell__header-inner">
          <div className="app-shell__header-top">
            <div>
              <p className="app-shell__eyebrow">Civic Finance Lab</p>
              <h1 className="app-shell__title">Social Impact</h1>
            </div>
            <div className="app-shell__badge">Stage 1 Prototype</div>
          </div>

          <nav className="app-shell__nav" aria-label="Main navigation">
            <NavLink to="/" end className="contents">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "app-shell__nav-link",
                    !isActive && "bg-background/80 hover:bg-accent",
                  )}
                >
                  Main Dashboard
                </Button>
              )}
            </NavLink>
            <NavLink to="/community-goals" className="contents">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "app-shell__nav-link",
                    !isActive && "bg-background/80 hover:bg-accent",
                  )}
                >
                  Community Goals
                </Button>
              )}
            </NavLink>
            <NavLink to="/ui-showcase" className="contents">
              {({ isActive }) => (
                <Button
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "app-shell__nav-link",
                    !isActive && "bg-background/80 hover:bg-accent",
                  )}
                >
                  UI Showcase
                </Button>
              )}
            </NavLink>
          </nav>
        </div>
        <Separator className="opacity-60" />
      </header>

      <main className="app-shell__main">
        <Suspense
          fallback={<div className="app-shell__loading">Loading...</div>}
        >
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/community-goals" element={<CommunityGoalsPage />} />
            <Route path="/ui-showcase" element={<UIShowcasePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
