import React, { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { fetchTransactions } from "@/utils/ynabApi";
import { calculateSocialImpact } from "@/utils/impactLogic";
import { generateImpactNarrative } from "@/utils/impactNarrative";
import "./DashboardPage.css";

// Sample transaction data for Stage 1.2 (will be replaced with real YNAB data in Stage 2)
const SAMPLE_TRANSACTIONS = [
  {
    id: 1,
    description: "Local Coffee Shop",
    amount: 5.5,
    isLocal: true,
  },
  {
    id: 2,
    description: "National Chain Restaurant",
    amount: 15.0,
    isLocal: false,
  },
  {
    id: 3,
    description: "Tucson Bookstore",
    amount: 24.99,
    isLocal: true,
  },
  {
    id: 4,
    description: "Gas Station",
    amount: 45.0,
    isLocal: false,
  },
  {
    id: 5,
    description: "Local Farmer's Market",
    amount: 35.75,
    isLocal: true,
  },
  {
    id: 6,
    description: "Big Box Store",
    amount: 120.0,
    isLocal: false,
  },
];

const KNOWN_NATIONAL_CHAINS = [
  "amazon",
  "walmart",
  "target",
  "starbucks",
  "costco",
  "mcdonald",
  "chipotle",
  "shell",
  "chevron",
  "circle k",
  "home depot",
  "lowes",
  "safeway",
  "kroger",
  "whole foods",
  "best buy",
  "walgreens",
  "cvs",
];

function isLikelyLocal(payeeName) {
  if (!payeeName) {
    return true;
  }

  const normalized = payeeName.toLowerCase();
  return !KNOWN_NATIONAL_CHAINS.some((chain) => normalized.includes(chain));
}

function toImpactTransaction(transaction) {
  const amountAsDollars = Math.abs(transaction.amount || 0) / 1000;
  const local = isLikelyLocal(transaction.payee_name);

  return {
    id: transaction.id,
    description:
      transaction.payee_name || transaction.memo || "YNAB Transaction",
    amount: amountAsDollars,
    isLocal: local,
    milliunits: Math.abs(transaction.amount || 0),
    date: transaction.date,
  };
}

function getImpactData(transaction) {
  const result = calculateSocialImpact(
    transaction.milliunits,
    transaction.isLocal,
  );
  const score = Math.min(
    100,
    Math.round((result.totalEconomicOutput / result.normalizedAmount) * 40),
  );

  return {
    multiplier: result.multiplier,
    impact: result.totalEconomicOutput,
    score,
    fiscalRoi: result.fiscalRoi,
    lostValue: result.lostValue,
  };
}

function ImpactCard({ data }) {
  const { multiplier, impact, score } = getImpactData(data);

  return (
    <Card className="dashboard-page__transaction">
      <CardHeader className="space-y-2">
        <div className="dashboard-page__transaction-header">
          <CardTitle className="dashboard-page__transaction-name">
            {data.description}
          </CardTitle>
          <Badge variant={data.isLocal ? "default" : "secondary"}>
            {data.isLocal ? "Local" : "National"}
          </Badge>
        </div>
        <CardDescription>
          Multiplier {multiplier.toFixed(2)}x applied to transaction amount.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="dashboard-page__value-row">
          <p className="text-sm text-muted-foreground">Spend</p>
          <p className="text-lg font-semibold">${data.amount.toFixed(2)}</p>
        </div>
        <div className="space-y-1.5">
          <div className="dashboard-page__value-row">
            <p className="text-sm text-muted-foreground">Impact</p>
            <p className="dashboard-page__impact-value text-lg font-semibold">
              ${impact.toFixed(2)}
            </p>
          </div>
          <Progress value={score} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [sourceLabel, setSourceLabel] = useState("Loading");
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let isMounted = true;

    async function loadTransactions() {
      try {
        setIsLoading(true);
        setErrorText("");
        const budgets = await getYnabBudgets();
        const primaryBudget = budgets[0];

        if (!primaryBudget?.id) {
          throw new Error("No YNAB budgets available");
        }

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const sinceDate = thirtyDaysAgo.toISOString().split("T")[0];

        const ynabTransactions = await getYnabTransactions(
          primaryBudget.id,
          sinceDate,
        );

        const outflowTransactions = ynabTransactions
          .filter((transaction) => (transaction.amount || 0) < 0)
          .map(toImpactTransaction)
          .filter((transaction) => transaction.amount > 0);

        if (!outflowTransactions.length) {
          throw new Error("No recent outflow transactions available in YNAB");
        }

        if (!isMounted) {
          return;
        }

        setTransactions(outflowTransactions);
        setSourceLabel("Live YNAB data");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setTransactions(
          SAMPLE_TRANSACTIONS.map((transaction) => ({
            ...transaction,
            milliunits: Math.round(transaction.amount * 1000),
          })),
        );
        setSourceLabel("Fallback sample data");
        setErrorText(error.message || "Unable to load YNAB transactions");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadTransactions();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleTransactions = useMemo(
    () => transactions.slice(0, visibleCount),
    [transactions, visibleCount],
  );

  const totals = useMemo(
    () =>
      visibleTransactions.reduce(
        (acc, item) => {
          const impact = getImpactData(item);
          acc.spend += item.amount;
          acc.impact += impact.impact;
          acc.localCount += item.isLocal ? 1 : 0;
          acc.lostValue += impact.lostValue;
          acc.betterStreets += impact.fiscalRoi.betterStreets;
          acc.reidParkZoo += impact.fiscalRoi.reidParkZoo;
          acc.generalFund += impact.fiscalRoi.generalFund;
          return acc;
        },
        {
          spend: 0,
          impact: 0,
          localCount: 0,
          lostValue: 0,
          betterStreets: 0,
            const apiTransactions = await fetchTransactions();
            if (!Array.isArray(apiTransactions) || apiTransactions.length === 0) {
              throw new Error("No transactions returned from API");
            }
            if (!isMounted) return;
            setTransactions(apiTransactions);
            setSourceLabel("Live YNAB data");
    <section className="dashboard-page">
      <Card className="dashboard-page__hero">
        <CardHeader>
          <CardTitle className="dashboard-page__hero-title">
            Main Dashboard
          </CardTitle>
          <CardDescription className="dashboard-page__hero-description">
            Track budgets, monitor impact initiatives, and align community
            spending with your mission.
          </CardDescription>
        </CardHeader>
        <CardContent className="dashboard-page__kpis">
          <Card className="dashboard-page__kpi">
            <CardHeader className="pb-2">
              <CardDescription className="dashboard-page__kpi-label">
                Visible Spend
              </CardDescription>
              <CardTitle className="text-xl">
                ${totals.spend.toFixed(2)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="dashboard-page__kpi">
            <CardHeader className="pb-2">
              <CardDescription className="dashboard-page__kpi-label">
                Impact Value
              </CardDescription>
              <CardTitle className="text-xl">
                ${totals.impact.toFixed(2)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="dashboard-page__kpi">
            <CardHeader className="pb-2">
              <CardDescription className="dashboard-page__kpi-label">
                Local Share
              </CardDescription>
              <CardTitle className="text-xl">{localShare}%</CardTitle>
            </CardHeader>
          </Card>
          <Card className="dashboard-page__kpi">
            <CardHeader className="pb-2">
              <CardDescription className="dashboard-page__kpi-label">
                Data Source
              </CardDescription>
              <CardTitle className="text-xl">{sourceLabel}</CardTitle>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>

      <div className="dashboard-page__summary">
        <Card className="dashboard-page__narrative">
          <CardHeader>
            <CardTitle className="dashboard-page__narrative-title">
              Impact Narrative
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="dashboard-page__narrative-text">
              {narrative.heading}
            </p>
            <p className="dashboard-page__narrative-text">{narrative.body}</p>
            <p className="dashboard-page__narrative-callout">
              {narrative.callout}
            </p>
            <div className="dashboard-page__status">
              <Badge
                variant={
                  sourceLabel === "Live YNAB data" ? "default" : "secondary"
                }
              >
                {sourceLabel}
              </Badge>
              {isLoading && <span>Refreshing...</span>}
            </div>
            {errorText && (
              <p className="text-sm text-amber-700">
                Live sync notice: {errorText}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="dashboard-page__grid">
        {visibleTransactions.map((transaction) => (
          <ImpactCard key={transaction.id} data={transaction} />
        ))}
      </div>

      {visibleCount < transactions.length && (
        <div className="dashboard-page__actions">
          <Button
            onClick={handleShowMore}
            size="lg"
            className="dashboard-page__button"
          >
            Show more
          </Button>
        </div>
      )}
    </section>
  );
}

export default DashboardPage;
