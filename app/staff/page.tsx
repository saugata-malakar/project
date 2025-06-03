"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, ChevronDown, Clock, Filter, Home, LogOut, Menu, Search, Settings, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for the queue
const queueData = [
  {
    id: 1,
    name: "John Smith",
    time: "09:15 AM",
    status: "In Progress",
    department: "General Medicine",
    waitTime: 0,
    priority: "high",
  },
  {
    id: 2,
    name: "Maria Garcia",
    time: "09:30 AM",
    status: "Waiting",
    department: "General Medicine",
    waitTime: 5,
    priority: "medium",
  },
  {
    id: 3,
    name: "Robert Johnson",
    time: "09:45 AM",
    status: "Waiting",
    department: "General Medicine",
    waitTime: 15,
    priority: "medium",
  },
  {
    id: 4,
    name: "Sarah Williams",
    time: "10:00 AM",
    status: "Waiting",
    department: "General Medicine",
    waitTime: 25,
    priority: "low",
  },
  {
    id: 5,
    name: "David Brown",
    time: "10:15 AM",
    status: "Waiting",
    department: "General Medicine",
    waitTime: 35,
    priority: "low",
  },
  {
    id: 6,
    name: "Jennifer Lee",
    time: "10:30 AM",
    status: "Waiting",
    department: "General Medicine",
    waitTime: 45,
    priority: "low",
  },
  {
    id: 7,
    name: "Michael Wilson",
    time: "10:45 AM",
    status: "Waiting",
    department: "General Medicine",
    waitTime: 55,
    priority: "low",
  },
]

// Mock data for departments
const departments = ["General Medicine", "Pediatrics", "Orthopedics", "Cardiology", "Dermatology", "Ophthalmology"]

export default function StaffDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("queue")
  const [selectedDepartment, setSelectedDepartment] = useState("General Medicine")
  const [departmentName, setDepartmentName] = useState("General Medicine")
  const [maxPatients, setMaxPatients] = useState("50")
  const [avgTime, setAvgTime] = useState("15")
  const [notificationTime, setNotificationTime] = useState("10")

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="space-y-4 py-4">
            <div className="px-4 py-2 flex items-center border-b">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-blue-600 mr-2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <span className="text-xl font-bold">MediQueue</span>
            </div>
            <div className="px-4 py-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Dr. Sarah Johnson</p>
                  <p className="text-sm text-gray-500">General Medicine</p>
                </div>
              </div>
            </div>
            <nav className="space-y-1 px-2">
              <Link
                href="/staff"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-100 text-blue-700"
              >
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
              >
                <Users className="mr-3 h-5 w-5" />
                Patients
              </Link>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
              >
                <Clock className="mr-3 h-5 w-5" />
                Appointments
              </Link>
              <Link
                href="#"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="border-t px-4 py-4">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/">
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 px-4 border-b">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-blue-600 mr-2"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span className="text-xl font-bold">MediQueue</span>
          </div>
          <div className="px-4 py-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Dr. Sarah Johnson</p>
                <p className="text-sm text-gray-500">General Medicine</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            <Link
              href="/staff"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-100 text-blue-700"
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Users className="mr-3 h-5 w-5" />
              Patients
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Clock className="mr-3 h-5 w-5" />
              Appointments
            </Link>
            <Link
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="border-t px-4 py-4">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Link>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <header className="bg-white shadow-sm z-10 fixed top-0 right-0 left-0 md:left-64 h-16">
          <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" />
                  </div>
                  <Input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search patients"
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="sr-only">View notifications</span>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-3">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <User className="h-4 w-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 pt-16">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Staff Dashboard</h1>
                  <p className="mt-1 text-sm text-gray-500">Manage patient queue and appointments</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        {selectedDepartment}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Select Department</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {departments.map((dept) => (
                        <DropdownMenuItem key={dept} onClick={() => setSelectedDepartment(dept)}>
                          {dept}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <Tabs defaultValue="queue" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="queue">Queue Management</TabsTrigger>
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                  <TabsTrigger value="settings">Department Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="queue" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Current Queue</CardTitle>
                        <CardDescription>
                          {queueData.filter((p) => p.status === "Waiting").length} patients waiting
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{queueData.length}</div>
                        <p className="text-xs text-muted-foreground">Total patients in queue today</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Average Wait Time</CardTitle>
                        <CardDescription>Current processing time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">25 min</div>
                        <p className="text-xs text-muted-foreground">5 minutes per patient</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Next Patient</CardTitle>
                        <CardDescription>Ready to be called</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-xl font-medium">{queueData[1]?.name}</div>
                        <Button className="w-full">Call Patient</Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Patient Queue</CardTitle>
                      <CardDescription>Manage and update patient status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-2 font-medium">Patient</th>
                              <th className="text-left py-3 px-2 font-medium">Check-in Time</th>
                              <th className="text-left py-3 px-2 font-medium">Wait Time</th>
                              <th className="text-left py-3 px-2 font-medium">Priority</th>
                              <th className="text-left py-3 px-2 font-medium">Status</th>
                              <th className="text-left py-3 px-2 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {queueData.map((patient) => (
                              <tr key={patient.id} className="border-b">
                                <td className="py-3 px-2">{patient.name}</td>
                                <td className="py-3 px-2">{patient.time}</td>
                                <td className="py-3 px-2">
                                  {patient.waitTime === 0 ? "Now" : `${patient.waitTime} min`}
                                </td>
                                <td className="py-3 px-2">
                                  <Badge
                                    variant={
                                      patient.priority === "high"
                                        ? "destructive"
                                        : patient.priority === "medium"
                                          ? "default"
                                          : "outline"
                                    }
                                  >
                                    {patient.priority}
                                  </Badge>
                                </td>
                                <td className="py-3 px-2">
                                  <Badge variant={patient.status === "In Progress" ? "default" : "secondary"}>
                                    {patient.status}
                                  </Badge>
                                </td>
                                <td className="py-3 px-2">
                                  <div className="flex space-x-2">
                                    <Button
                                      size="sm"
                                      variant={patient.status === "In Progress" ? "outline" : "default"}
                                      disabled={patient.status === "In Progress"}
                                    >
                                      {patient.status === "In Progress" ? "In Progress" : "Call"}
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      Details
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Export List</Button>
                      <Button>Add Patient</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="stats" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Queue Statistics</CardTitle>
                      <CardDescription>Performance metrics for {selectedDepartment}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 mb-1">Total Patients Today</div>
                          <div className="text-3xl font-bold">24</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 mb-1">Avg. Wait Time</div>
                          <div className="text-3xl font-bold">18 min</div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <div className="text-sm text-yellow-600 mb-1">Longest Wait</div>
                          <div className="text-3xl font-bold">45 min</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="text-sm text-purple-600 mb-1">Patients Processed</div>
                          <div className="text-3xl font-bold">17</div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Queue Activity</h3>
                        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                          <p className="text-gray-500">Queue activity chart will be displayed here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Department Settings</CardTitle>
                      <CardDescription>Configure queue settings for {selectedDepartment}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="department-name">Department Name</Label>
                          <Input
                            id="department-name"
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="max-patients">Maximum Patients Per Day</Label>
                          <Input
                            id="max-patients"
                            type="number"
                            value={maxPatients}
                            onChange={(e) => setMaxPatients(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="avg-time">Average Time Per Patient (minutes)</Label>
                          <Input
                            id="avg-time"
                            type="number"
                            value={avgTime}
                            onChange={(e) => setAvgTime(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notification-time">Notification Time (minutes before)</Label>
                          <Input
                            id="notification-time"
                            type="number"
                            value={notificationTime}
                            onChange={(e) => setNotificationTime(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Queue Priority Rules</Label>
                        <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                          <div className="flex items-center">
                            <Checkbox id="priority-appointments" />
                            <label htmlFor="priority-appointments" className="ml-2 text-sm">
                              Prioritize scheduled appointments
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox id="priority-elderly" />
                            <label htmlFor="priority-elderly" className="ml-2 text-sm">
                              Prioritize elderly patients (65+)
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox id="priority-emergency" defaultChecked />
                            <label htmlFor="priority-emergency" className="ml-2 text-sm">
                              Prioritize emergency cases
                            </label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// This component is used in the staff dashboard but wasn't defined
const Label = ({ htmlFor, children, className = "" }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium ${className}`}>
    {children}
  </label>
)

// This component is used in the staff dashboard but wasn't defined
const Checkbox = ({ id, defaultChecked = false }) => (
  <input
    type="checkbox"
    id={id}
    defaultChecked={defaultChecked}
    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
  />
)

