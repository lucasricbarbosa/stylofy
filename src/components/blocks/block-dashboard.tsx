"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Database,
  FileBarChart,
  FolderKanban,
  GripVertical,
  HelpCircle,
  LayoutDashboard,
  MoreHorizontal,
  PanelLeftIcon,
  Plus,
  RefreshCw,
  Search,
  Settings,
  TrendingDown,
  TrendingUp,
  Users,
  Wand2,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const visitorData = [
  { date: "Jan 1", desktop: 186, mobile: 80 },
  { date: "Jan 5", desktop: 305, mobile: 200 },
  { date: "Jan 10", desktop: 237, mobile: 120 },
  { date: "Jan 15", desktop: 473, mobile: 190 },
  { date: "Jan 20", desktop: 209, mobile: 130 },
  { date: "Jan 25", desktop: 314, mobile: 180 },
  { date: "Feb 1", desktop: 186, mobile: 100 },
  { date: "Feb 5", desktop: 450, mobile: 280 },
  { date: "Feb 10", desktop: 380, mobile: 220 },
  { date: "Feb 15", desktop: 520, mobile: 300 },
];

const pieData = [
  { name: "Chrome", value: 275 },
  { name: "Safari", value: 200 },
  { name: "Firefox", value: 287 },
  { name: "Edge", value: 173 },
  { name: "Other", value: 190 },
];

const barData = [
  { name: "Chrome", value: 275 },
  { name: "Safari", value: 200 },
  { name: "Firefox", value: 187 },
  { name: "Edge", value: 173 },
  { name: "Other", value: 90 },
];

const tableData = [
  {
    id: 1,
    header: "Executive Summary",
    type: "Cover page",
    target: 1,
    limit: 2,
    reviewer: "John D.",
  },
  {
    id: 2,
    header: "Company Overview",
    type: "Narrative",
    target: 3,
    limit: 5,
    reviewer: "",
  },
  {
    id: 3,
    header: "Technical Approach",
    type: "Narrative",
    target: 5,
    limit: 8,
    reviewer: "Sarah M.",
  },
  {
    id: 4,
    header: "Past Performance",
    type: "Reference",
    target: 2,
    limit: 3,
    reviewer: "",
  },
  {
    id: 5,
    header: "Cost Proposal",
    type: "Financial",
    target: 4,
    limit: 6,
    reviewer: "Mike R.",
  },
];

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function BlockDashboard() {
  const [activeTimeRange, setActiveTimeRange] = useState("3months");

  return (
    <div className="flex p-2 h-[900px] w-full bg-background">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground hidden md:flex flex-col">
        {/* Brand */}
        <div className="flex items-center gap-2 px-4 py-[14px] border-b border-sidebar-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <span className="font-semibold">Acme Inc.</span>
        </div>

        {/* Quick Create */}
        <div className="p-2">
          <button className="flex w-full items-center gap-2 rounded-md bg-sidebar-primary text-white px-3 py-2 text-sm font-medium">
            <Plus className="h-4 w-4" />
            Quick Create
          </button>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 overflow-auto p-2 space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={RefreshCw} label="Lifecycle" />
          <NavItem icon={BarChart3} label="Analytics" />
          <NavItem icon={FolderKanban} label="Projects" />
          <NavItem icon={Users} label="Team" />

          <Separator className="my-4 bg-sidebar-border" />
          <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Documents
          </p>

          <NavItem icon={Database} label="Data Library" />
          <NavItem icon={FileBarChart} label="Reports" />
          <NavItem icon={Wand2} label="Word Assistant" />
          <NavItem icon={MoreHorizontal} label="More" />
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-2 space-y-1">
          <NavItem icon={Settings} label="Settings" />
          <NavItem icon={HelpCircle} label="Get Help" />
          <NavItem icon={Search} label="Search" />

          <div className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-sidebar-accent">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs">
                CN
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">shadcn</p>
              <p className="text-xs text-muted-foreground truncate">
                m@example.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center gap-2 border-b border-border px-0 py-4">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <PanelLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Documents</h1>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto py-6 p-0 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Total Revenue"
              value="$1,250.00"
              change="+12.5%"
              trend="up"
              subtitle="Revenue"
              description="Trending up this month"
            />
            <KPICard
              title="New Customers"
              value="1,234"
              change="-20%"
              trend="down"
              subtitle="Acquisition"
              description="Down from last month"
            />
            <KPICard
              title="Active Accounts"
              value="45,678"
              change="+12.5%"
              trend="up"
              subtitle="Accounts"
              description="Strong user retention"
            />
            <KPICard
              title="Growth Rate"
              value="4.5%"
              change="+4.5%"
              trend="up"
              subtitle="Growth"
              description="Steady performance"
            />
          </div>

          {/* Total Visitors Chart */}
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <CardTitle className="text-foreground">
                  Total Visitors
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Total for the last 3 months
                </CardDescription>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
                <button
                  onClick={() => setActiveTimeRange("3months")}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    activeTimeRange === "3months"
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Last 3 months
                </button>
                <button
                  onClick={() => setActiveTimeRange("30days")}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    activeTimeRange === "30days"
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Last 30 days
                </button>
                <button
                  onClick={() => setActiveTimeRange("7days")}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    activeTimeRange === "7days"
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Last 7 days
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitorData}>
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "var(--color-muted-foreground)",
                        fontSize: 12,
                      }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "var(--color-muted-foreground)",
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="desktop"
                      stackId="1"
                      stroke="var(--color-chart-1)"
                      fill="var(--color-chart-1)"
                      fillOpacity={0.4}
                    />
                    <Area
                      type="monotone"
                      dataKey="mobile"
                      stackId="1"
                      stroke="var(--color-chart-2)"
                      fill="var(--color-chart-2)"
                      fillOpacity={0.4}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <div className="hidden lg:flex items-center gap-1 border-b border-border">
              <button className="px-4 py-2 text-sm font-medium border-b-2 border-primary text-foreground">
                Outline
              </button>
              <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                Past Performance
                <Badge variant="secondary" className="text-xs">
                  3
                </Badge>
              </button>
              <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
                Key Personnel
                <Badge variant="secondary" className="text-xs">
                  2
                </Badge>
              </button>
              <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
                Focus Documents
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Customize Columns</Button>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>
          </div>

          {/* Table */}
          <Card className="bg-card text-card-foreground border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="w-12"></TableHead>
                    <TableHead className="w-12">
                      <Checkbox />
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Header
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Section Type
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Target
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Limit
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Reviewer
                    </TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id} className="border-border">
                      <TableCell>
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      </TableCell>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="text-foreground font-medium">
                        {row.header}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-muted text-muted-foreground"
                        >
                          {row.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          defaultValue={row.target}
                          className="w-16 h-8 bg-input border-border"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          defaultValue={row.limit}
                          className="w-16 h-8 bg-input border-border"
                        />
                      </TableCell>
                      <TableCell>
                        {row.reviewer ? (
                          <span className="text-foreground">
                            {row.reviewer}
                          </span>
                        ) : (
                          <Select>
                            <SelectTrigger className="w-36 h-8 bg-input border-border">
                              <SelectValue placeholder="Assign reviewer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="john">John D.</SelectItem>
                              <SelectItem value="sarah">Sarah M.</SelectItem>
                              <SelectItem value="mike">Mike R.</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  0 of 68 row(s) selected.
                </p>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Rows per page
                    </span>
                    <Select defaultValue="10">
                      <SelectTrigger className="w-16 h-8 bg-input border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <span className="text-sm text-foreground">Page 1 of 7</span>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts Row */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Pie Chart */}
            <Card className="bg-card text-card-foreground border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Pie Chart - Donut with Text
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  January - June 2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        strokeWidth={2}
                        stroke="var(--color-card)"
                      >
                        {pieData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">
                        1,125
                      </p>
                      <p className="text-sm text-muted-foreground">Visitors</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm flex items-center gap-1 text-foreground">
                    Trending up by 5.2% this month
                    <TrendingUp className="h-4 w-4 text-chart-1" />
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="bg-card text-card-foreground border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Bar Chart - Mixed
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  January - June 2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical">
                      <XAxis
                        type="number"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "var(--color-muted-foreground)",
                          fontSize: 12,
                        }}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "var(--color-muted-foreground)",
                          fontSize: 12,
                        }}
                        width={60}
                      />
                      <Bar dataKey="value" radius={4}>
                        {barData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm flex items-center gap-1 text-foreground">
                    Trending up by 5.2% this month
                    <TrendingUp className="h-4 w-4 text-chart-1" />
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function KPICard({
  title,
  value,
  change,
  trend,
  subtitle,
  description,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  subtitle: string;
  description: string;
}) {
  return (
    <Card className="bg-card text-card-foreground border-border">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardDescription className="text-muted-foreground text-sm">
            {title}
          </CardDescription>
          <Badge
            variant="secondary"
            className={`text-xs ${
              trend === "up" ? "text-chart-1" : "text-destructive"
            }`}
          >
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {change}
          </Badge>
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm font-medium text-foreground">{subtitle}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
