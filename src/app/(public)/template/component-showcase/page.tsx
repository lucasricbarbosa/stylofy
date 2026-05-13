import { AccountAccessCard } from "@/components/component-showcase/account-access-card";
import { BadgeVariantsCard } from "@/components/component-showcase/badge-variants-card";
import { BookAppointmentCard } from "@/components/component-showcase/book-appointment-card";
import { BrowserShareCard } from "@/components/component-showcase/browser-share-card";
import { ButtonGroupDemo } from "@/components/component-showcase/button-group-demo";
import { ButtonGroupInputGroup } from "@/components/component-showcase/button-group-input-group";
import { ButtonVariantsCard } from "@/components/component-showcase/button-variants-card";
import { BuyInvestmentCard } from "@/components/component-showcase/buy-investment-card";
import { CardBalanceCard } from "@/components/component-showcase/card-balance-card";
import { ClaimableBalanceCard } from "@/components/component-showcase/claimable-balance-card";
import { CodespacesCard } from "@/components/component-showcase/codespaces-card";
import { ConnectBankCard } from "@/components/component-showcase/connect-bank-card";
import { ContributionHistoryCard } from "@/components/component-showcase/contribution-history-card";
import { DistributeTrackCard } from "@/components/component-showcase/distribute-track-card";
import { EmptyAvatarGroup } from "@/components/component-showcase/empty-avatar-group";
import { EnvVariablesCard } from "@/components/component-showcase/env-variables-card";
import { ExploreCatalogCard } from "@/components/component-showcase/explore-catalog-card";
import { FeedbackFormCard } from "@/components/component-showcase/feedback-form-card";
import { FieldDemo } from "@/components/component-showcase/field-demo";
import { HierarchyCard } from "@/components/component-showcase/hierarchy-card";
import { InputGroupDemo } from "@/components/component-showcase/input-group-demo";
import { InviteTeamCard } from "@/components/component-showcase/invite-team-card";
import { ItemDemo } from "@/components/component-showcase/item-demo";
import { NavigationButtonsCard } from "@/components/component-showcase/navigation-buttons-card";
import { NoTeamMembersCard } from "@/components/component-showcase/no-team-members-card";
import { NotionPromptForm } from "@/components/component-showcase/notion-prompt-form";
import { PayoutPreferencesCard } from "@/components/component-showcase/payout-preferences-card";
import { PayoutThresholdCard } from "@/components/component-showcase/payout-threshold-card";
import { PowerUsageCard } from "@/components/component-showcase/power-usage-card";
import { ProfileCard } from "@/components/component-showcase/profile-card";
import { RecentTransactionsCard } from "@/components/component-showcase/recent-transactions-card";
import { ReportBugCard } from "@/components/component-showcase/report-bug-card";
import { SavingsTargetsCard } from "@/components/component-showcase/savings-targets-card";
import { SetMilestoneCard } from "@/components/component-showcase/set-milestone-card";
import { ShowcaseCard } from "@/components/component-showcase/showcase-card";
import { SleepReportCard } from "@/components/component-showcase/sleep-report-card";
import { SpinnerEmpty } from "@/components/component-showcase/spinner-empty";
import { StockPerformanceCard } from "@/components/component-showcase/stock-performance-card";
import { ToolbarCard } from "@/components/component-showcase/toolbar-card";
import { TrafficChartCard } from "@/components/component-showcase/traffic-chart-card";
import { TransferFundsCard } from "@/components/component-showcase/transfer-funds-card";
import { TypographyCard } from "@/components/component-showcase/typography-card";
import { YearlyActivityCard } from "@/components/component-showcase/yearly-activity-card";
import { TooltipProvider } from "../../../../components/ui/tooltip";

export default function Page() {
  return (
    <div className="min-h-screen bg-secondary/20">
      <TooltipProvider>
        <div className="mx-auto max-w-[2000px] p-4 md:p-6 lg:p-8">
          {/* Header opcional */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">
              Component Showcase
            </h1>
            <p className="text-muted-foreground">
              A collection of shadcn/ui components and patterns
            </p>
          </div>

          {/* Grid de 4 colunas responsivo */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Coluna 1 - Typography primeiro */}
            <div className="flex flex-col gap-4">
              <TypographyCard />
              <HierarchyCard />
              <CodespacesCard />
              <DistributeTrackCard />
              <ContributionHistoryCard />
              <ShowcaseCard title="Prompt Form">
                <NotionPromptForm />
              </ShowcaseCard>
              <ShowcaseCard title="Empty State">
                <EmptyAvatarGroup />
              </ShowcaseCard>
              <ShowcaseCard title="Loading State">
                <SpinnerEmpty />
              </ShowcaseCard>
              <ShowcaseCard title="Payment Form">
                <FieldDemo />
              </ShowcaseCard>
            </div>

            {/* Coluna 2 */}
            <div className="flex flex-col gap-4">
              <ToolbarCard />
              <NavigationButtonsCard />
              <ButtonVariantsCard />
              <ShowcaseCard title="Two-Factor Auth">
                <ItemDemo />
              </ShowcaseCard>
              <BadgeVariantsCard />
              <ShowcaseCard title="Button Group">
                <ButtonGroupDemo />
              </ShowcaseCard>
              <ShowcaseCard title="Input Group">
                <InputGroupDemo />
              </ShowcaseCard>
              <ButtonGroupInputGroup />
              <PayoutThresholdCard />
              <ClaimableBalanceCard />
              <ExploreCatalogCard />
              <SetMilestoneCard />
              <PowerUsageCard />
            </div>

            {/* Coluna 3 */}
            <div className="flex flex-col gap-4">
              <EnvVariablesCard />
              <BrowserShareCard />
              <TrafficChartCard />
              <InviteTeamCard />
              <NoTeamMembersCard />
              <ReportBugCard />
              <SavingsTargetsCard />
              <RecentTransactionsCard />
              <PayoutPreferencesCard />
            </div>

            {/* Coluna 4 */}
            <div className="flex flex-col gap-4">
              <FeedbackFormCard />
              <BookAppointmentCard />
              <SleepReportCard />
              <ProfileCard />
              <BuyInvestmentCard />
              <AccountAccessCard />
              <CardBalanceCard />
              <YearlyActivityCard />
              <TransferFundsCard />
              <StockPerformanceCard />
              <ConnectBankCard />
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
