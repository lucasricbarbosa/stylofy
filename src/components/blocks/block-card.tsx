"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Apple,
  ArrowDown,
  ArrowUp,
  Chrome,
  Copy,
  CreditCard,
  Github,
  Minus,
  MoreHorizontal,
  Plus,
  Send,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";

// Chart data
const revenueSparkline = [
  { v: 18000 },
  { v: 21000 },
  { v: 19500 },
  { v: 22000 },
  { v: 20500 },
  { v: 23500 },
  { v: 24891 },
];
const usersAreaData = [
  { v: 9200 },
  { v: 8800 },
  { v: 9000 },
  { v: 8600 },
  { v: 8500 },
  { v: 8400 },
  { v: 8423 },
];
const goalBarData = [
  { d: "M", v: 280 },
  { d: "T", v: 320 },
  { d: "W", v: 300 },
  { d: "T", v: 380 },
  { d: "F", v: 350 },
];
const exerciseLineData = [
  { day: "Mon", thisWeek: 32, lastWeek: 28 },
  { day: "Tue", thisWeek: 48, lastWeek: 38 },
  { day: "Wed", thisWeek: 55, lastWeek: 42 },
  { day: "Thu", thisWeek: 40, lastWeek: 52 },
  { day: "Fri", thisWeek: 62, lastWeek: 48 },
  { day: "Sat", thisWeek: 75, lastWeek: 35 },
  { day: "Sun", thisWeek: 58, lastWeek: 45 },
];

// Team members data
const teamMembers = [
  {
    name: "Marcus Chen",
    email: "marcus.chen@company.io",
    avatar: 12,
    role: "Owner",
  },
  {
    name: "Priya Sharma",
    email: "priya.s@company.io",
    avatar: 25,
    role: "Editor",
  },
  {
    name: "Jordan Blake",
    email: "j.blake@company.io",
    avatar: 33,
    role: "Viewer",
  },
];

// Payments data
const paymentsData = [
  { id: 1, status: "Success", email: "alex.turner@mail.co", amount: "$428.00" },
  {
    id: 2,
    status: "Pending",
    email: "nina.patel@inbox.org",
    amount: "$195.50",
  },
  {
    id: 3,
    status: "Success",
    email: "james.wright@post.net",
    amount: "$1,024.00",
  },
  { id: 4, status: "Failed", email: "emma.stone@cloud.io", amount: "$672.00" },
  {
    id: 5,
    status: "Processing",
    email: "lucas.kim@work.com",
    amount: "$89.99",
  },
  { id: 6, status: "Success", email: "sofia.reyes@hub.dev", amount: "$312.75" },
];

// Notifications data
const notifications = [
  { title: "New comment on your post", time: "1h ago" },
  { title: "Payment received from client", time: "3h ago" },
  { title: "Your export is ready", time: "5h ago" },
];

// Share document users
const shareUsers = [
  {
    name: "Elena Rodriguez",
    email: "elena.r@team.co",
    avatar: 44,
    access: "edit",
  },
  { name: "David Park", email: "d.park@team.co", avatar: 52, access: "view" },
  {
    name: "Amira Hassan",
    email: "amira.h@team.co",
    avatar: 29,
    access: "view",
  },
];

export function BlockCards() {
  // State for all interactive cards
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2026, 4, 15),
  );
  const [goalValue, setGoalValue] = useState(380);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [functionalCookies, setFunctionalCookies] = useState(false);
  const [performanceCookies, setPerformanceCookies] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);
  const [chatMessages, setChatMessages] = useState([
    {
      from: "other",
      text: "Hey! I saw your project submission. Really impressive work on the dashboard.",
    },
    {
      from: "me",
      text: "Thanks! I spent a lot of time on the data visualization part.",
    },
    { from: "other", text: "It shows. Would love to collaborate sometime!" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [teamRoles, setTeamRoles] = useState<Record<string, string>>({
    "Marcus Chen": "Owner",
    "Priya Sharma": "Editor",
    "Jordan Blake": "Viewer",
  });
  const [shareAccess, setShareAccess] = useState<Record<string, string>>({
    "Elena Rodriguez": "edit",
    "David Park": "view",
    "Amira Hassan": "view",
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { from: "me", text: newMessage }]);
      setNewMessage("");
    }
  };

  const togglePaymentSelection = (id: number) => {
    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  return (
    <div className="w-full p-2 bg-background text-foreground min-h-screen">
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {/* 1. Revenue stat with sparkline */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
              Monthly Revenue
            </CardDescription>
            <CardTitle className="text-3xl font-bold">$24,891.40</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-primary">
              <ArrowUp className="h-4 w-4" />
              <span>+12.4% vs last month</span>
            </div>
            <div className="h-16 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueSparkline}>
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 2. Active Users stat with area chart */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
              Active Users
            </CardDescription>
            <CardTitle className="text-3xl font-bold">8,423</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-destructive">
              <ArrowDown className="h-4 w-4" />
              <span>-3.2% this week</span>
            </div>
            <div className="h-16 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usersAreaData}>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="var(--color-chart-2)"
                    fill="var(--color-chart-2)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 3. Twitter-style follow card */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-border ring-offset-2 ring-offset-background">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?img=47"
                    alt="Maya Johnson"
                  />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    MJ
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Maya Johnson</p>
                  <p className="text-sm text-muted-foreground">@mayacodes</p>
                </div>
              </div>
              <Button
                variant={isFollowing ? "outline" : "default"}
                size="sm"
                className={
                  isFollowing ? "" : "bg-primary text-primary-foreground"
                }
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
            <p className="mt-4 text-sm">
              Building cool stuff with TypeScript and React. Obsessed with clean
              code and good coffee. #WebDev
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
              <span>
                <strong className="text-foreground">847</strong> following
              </span>
              <span className="mx-2">·</span>
              <span>
                <strong className="text-foreground">12.4k</strong> followers
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 4. Team Members list */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription className="text-muted-foreground">
              Invite collaborators to your workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.email}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 ring-2 ring-border ring-offset-2 ring-offset-background">
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?img=${member.avatar}`}
                      alt={member.name}
                    />
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>
                <Select
                  value={teamRoles[member.name]}
                  onValueChange={(value) =>
                    setTeamRoles({ ...teamRoles, [member.name]: value })
                  }
                >
                  <SelectTrigger className="w-24 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Owner">Owner</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                    <SelectItem value="Billing">Billing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Invite member
            </Button>
          </CardFooter>
        </Card>

        {/* 5. Calendar card */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader className="pb-2">
            <CardTitle>Upcoming</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md"
            />
            <div className="p-4 pt-2 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Team standup</span>
                <span className="text-muted-foreground ml-auto">9:00 AM</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-chart-2" />
                <span>Client review</span>
                <span className="text-muted-foreground ml-auto">2:30 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Move Goal stepper */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle>Move Goal</CardTitle>
            <CardDescription className="text-muted-foreground">
              Set your daily activity target.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setGoalValue(Math.max(100, goalValue - 10))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="text-center">
                <span className="text-5xl font-bold">{goalValue}</span>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  Calories/Day
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setGoalValue(goalValue + 10)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-14">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={goalBarData}>
                  <Bar dataKey="v" fill="var(--color-chart-1)" radius={3} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Button className="w-full bg-primary text-primary-foreground">
              Set Goal
            </Button>
          </CardContent>
        </Card>

        {/* 7. Create an account */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Get started with your free account today.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="w-full">
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <hr className="w-full border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" />
            </div>
            <Button className="w-full bg-primary text-primary-foreground">
              Create account
            </Button>
          </CardContent>
        </Card>

        {/* 8. Chat card */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-border ring-offset-2 ring-offset-background">
                <AvatarImage
                  src="https://i.pravatar.cc/150?img=32"
                  alt="Alex Rivera"
                />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  AR
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-medium">
                  Alex Rivera
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  alex.r@mail.com
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 text-sm ${
                    msg.from === "me"
                      ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
                      : "bg-muted text-foreground rounded-2xl rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              className="bg-primary text-primary-foreground"
            >
              <Send className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* 9. Notifications card */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription className="text-muted-foreground">
              You have 3 unread messages.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Push Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Receive alerts on your device.
                </p>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            <div className="space-y-3 pt-2">
              {notifications.map((notif, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notif.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notif.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 10. Payment Method form */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription className="text-muted-foreground">
              Add a new payment method to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid grid-cols-3 gap-3"
            >
              <div>
                <RadioGroupItem
                  value="card"
                  id="card"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="card"
                  className={`flex flex-col items-center justify-center rounded-md border-2 p-3 cursor-pointer transition-colors ${
                    paymentMethod === "card"
                      ? "border-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <CreditCard className="mb-1 h-5 w-5" />
                  <span className="text-xs">Card</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="paypal"
                  id="paypal"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="paypal"
                  className={`flex flex-col items-center justify-center rounded-md border-2 p-3 cursor-pointer transition-colors ${
                    paymentMethod === "paypal"
                      ? "border-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <svg
                    className="mb-1 h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.645h6.922c2.33 0 4.164.63 5.318 1.822.548.567.922 1.224 1.114 1.957.203.775.225 1.7.066 2.748l-.014.088v.257l.2.115a3.97 3.97 0 0 1 1.006.748c.367.398.637.872.805 1.407.174.556.252 1.2.231 1.914-.025.833-.17 1.559-.435 2.17-.277.636-.663 1.18-1.146 1.618a4.983 4.983 0 0 1-1.673.995c-.63.224-1.35.388-2.148.488-.824.103-1.724.155-2.679.155H12.5a1.43 1.43 0 0 0-1.414 1.22l-.065.347-.547 3.473-.05.262a.296.296 0 0 1-.291.251H7.076Z" />
                  </svg>
                  <span className="text-xs">PayPal</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="apple"
                  id="apple"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="apple"
                  className={`flex flex-col items-center justify-center rounded-md border-2 p-3 cursor-pointer transition-colors ${
                    paymentMethod === "apple"
                      ? "border-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <Apple className="mb-1 h-5 w-5" />
                  <span className="text-xs">Apple</span>
                </Label>
              </div>
            </RadioGroup>
            <div className="space-y-2">
              <Label htmlFor="card-name">Name</Label>
              <Input id="card-name" placeholder="Name on card" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-city">City</Label>
              <Input id="card-city" placeholder="City" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Expires</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem
                        key={i}
                        value={String(i + 1).padStart(2, "0")}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="YY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={i} value={String(26 + i)}>
                        {String(26 + i)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground">
              Continue
            </Button>
          </CardContent>
        </Card>

        {/* 11. Cookie Settings */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle>Cookie Settings</CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your cookie preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Strictly Necessary</p>
                <p className="text-xs text-muted-foreground">
                  Essential for the site to function.
                </p>
              </div>
              <Switch checked disabled />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Functional Cookies</p>
                <p className="text-xs text-muted-foreground">
                  Enable personalized features.
                </p>
              </div>
              <Switch
                checked={functionalCookies}
                onCheckedChange={setFunctionalCookies}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Performance Cookies</p>
                <p className="text-xs text-muted-foreground">
                  Help us improve our service.
                </p>
              </div>
              <Switch
                checked={performanceCookies}
                onCheckedChange={setPerformanceCookies}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Save preferences
            </Button>
          </CardFooter>
        </Card>

        {/* 12. Report an issue */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle>Report an Issue</CardTitle>
            <CardDescription className="text-muted-foreground">
              Let us know what went wrong.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Area</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="deployments">Deployments</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Security Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Severity 1</SelectItem>
                    <SelectItem value="2">Severity 2</SelectItem>
                    <SelectItem value="3">Severity 3</SelectItem>
                    <SelectItem value="4">Severity 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Brief summary of the issue" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the issue in detail..."
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-primary text-primary-foreground">
              Submit
            </Button>
          </CardFooter>
        </Card>

        {/* 13. Share document */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle>Share this document</CardTitle>
            <CardDescription className="text-muted-foreground">
              Anyone with the link can view.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                readOnly
                value="https://app.example.com/docs/project-x"
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">People with access</p>
              <div className="space-y-3">
                {shareUsers.map((user) => (
                  <div
                    key={user.email}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 ring-2 ring-border ring-offset-2 ring-offset-background">
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?img=${user.avatar}`}
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Select
                      value={shareAccess[user.name]}
                      onValueChange={(value) =>
                        setShareAccess({ ...shareAccess, [user.name]: value })
                      }
                    >
                      <SelectTrigger className="w-24 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="edit">Can edit</SelectItem>
                        <SelectItem value="view">Can view</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 14. Payments table */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription className="text-muted-foreground">
              Your transaction history this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="w-10">
                    <Checkbox
                      checked={selectedPayments.length === paymentsData.length}
                      onCheckedChange={(checked) =>
                        setSelectedPayments(
                          checked ? paymentsData.map((p) => p.id) : [],
                        )
                      }
                    />
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Amount
                  </TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentsData.map((payment) => (
                  <TableRow key={payment.id} className="border-border">
                    <TableCell>
                      <Checkbox
                        checked={selectedPayments.includes(payment.id)}
                        onCheckedChange={() =>
                          togglePaymentSelection(payment.id)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payment.status === "Success"
                            ? "default"
                            : payment.status === "Failed"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{payment.email}</TableCell>
                    <TableCell className="text-right font-medium">
                      {payment.amount}
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
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {selectedPayments.length} of {paymentsData.length} selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* 15. Progress / Goal card */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle>Q2 Goal</CardTitle>
            <CardDescription className="text-muted-foreground">
              Track your quarterly progress.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <span className="text-4xl font-bold">68%</span>
            </div>
            <Progress value={68} className="h-2" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold">11</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 16. Exercise Minutes line chart card (wider) */}
        <Card className="mb-4 break-inside-avoid bg-card text-card-foreground border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>Exercise Minutes</CardTitle>
            <CardDescription className="text-muted-foreground">
              Daily workout comparison: this week vs last week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={exerciseLineData}>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "var(--color-muted-foreground)",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="thisWeek"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    dot={false}
                    name="This Week"
                  />
                  <Line
                    type="monotone"
                    dataKey="lastWeek"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                    dot={false}
                    name="Last Week"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
