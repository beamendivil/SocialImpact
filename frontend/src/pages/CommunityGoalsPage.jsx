import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import "./CommunityGoalsPage.css";

const GOALS = [
  {
    id: 1,
    title: "Increase local volunteer participation",
    target: "20% growth",
    progress: 72,
    status: "On Track",
    detail: "Current quarter volunteer signups are pacing ahead of projection.",
  },
  {
    id: 2,
    title: "Fund three youth education micro-grants",
    target: "3 grants",
    progress: 58,
    status: "In Progress",
    detail: "Two grant proposals have been approved, one remains in review.",
  },
  {
    id: 3,
    title: "Launch neighborhood sustainability project",
    target: "1 project",
    progress: 35,
    status: "Needs Attention",
    detail: "Partner confirmations are delayed, requiring outreach support.",
  },
];

function CommunityGoalsPage() {
  const averageProgress = useMemo(() => {
    const total = GOALS.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(total / GOALS.length);
  }, []);

  return (
    <section className="community-goals">
      <Card className="community-goals__hero">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">
            Community Goals
          </CardTitle>
          <CardDescription className="community-goals__hero-description">
            Track strategic initiatives with clear milestones and progress.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="community-goals__average">
            <p className="community-goals__hero-description text-sm">
              Average completion
            </p>
            <p className="text-xl font-semibold">{averageProgress}%</p>
          </div>
          <Progress value={averageProgress} className="h-2.5 bg-white/20" />
        </CardContent>
      </Card>

      <div className="community-goals__grid">
        {GOALS.map((goal) => (
          <Card key={goal.id} className="community-goals__card">
            <CardHeader className="space-y-3">
              <div className="community-goals__meta">
                <Badge variant={goal.progress >= 65 ? "default" : "secondary"}>
                  {goal.status}
                </Badge>
                <p className="community-goals__target">Target: {goal.target}</p>
              </div>
              <CardTitle className="text-lg leading-tight">
                {goal.title}
              </CardTitle>
              <CardDescription>{goal.detail}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="community-goals__progress-row">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-sm font-medium">{goal.progress}%</p>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default CommunityGoalsPage;
