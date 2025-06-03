"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckInPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    appointmentType: "",
    reasonForVisit: "",
    hasAppointment: "no",
    appointmentTime: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, hasAppointment: value }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would send the data to the server
    console.log("Form submitted:", formData)

    // Redirect to the confirmation page
    router.push("/patient/confirmation")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-blue-600 mb-8 hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Patient Check-In</CardTitle>
            <CardDescription>
              {step === 1 && "Please provide your personal information to begin the check-in process."}
              {step === 2 && "Tell us about your visit today."}
              {step === 3 && "Review your information before submitting."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Do you have an appointment today?</Label>
                    <RadioGroup
                      value={formData.hasAppointment}
                      onValueChange={handleRadioChange}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="appointment-yes" />
                        <Label htmlFor="appointment-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="appointment-no" />
                        <Label htmlFor="appointment-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.hasAppointment === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="appointmentTime">Appointment Time</Label>
                      <Input
                        id="appointmentTime"
                        name="appointmentTime"
                        type="time"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="appointmentType">Type of Visit</Label>
                    <Select
                      value={formData.appointmentType}
                      onValueChange={(value) => handleSelectChange("appointmentType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select visit type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Consultation</SelectItem>
                        <SelectItem value="followup">Follow-up Visit</SelectItem>
                        <SelectItem value="specialist">Specialist Consultation</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="lab">Laboratory Tests</SelectItem>
                        <SelectItem value="imaging">Imaging/Radiology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reasonForVisit">Reason for Visit</Label>
                    <Input
                      id="reasonForVisit"
                      name="reasonForVisit"
                      value={formData.reasonForVisit}
                      onChange={handleChange}
                      placeholder="Briefly describe your symptoms or reason for visit"
                      required
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Review Your Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Name</p>
                      <p>
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date of Birth</p>
                      <p>{formData.dateOfBirth}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p>{formData.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p>{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Appointment</p>
                      <p>{formData.hasAppointment === "yes" ? "Yes" : "No"}</p>
                    </div>
                    {formData.hasAppointment === "yes" && (
                      <div>
                        <p className="text-gray-500">Appointment Time</p>
                        <p>{formData.appointmentTime}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-500">Visit Type</p>
                      <p>{formData.appointmentType}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500">Reason for Visit</p>
                      <p>{formData.reasonForVisit}</p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" onClick={handleSubmit}>
                Complete Check-In
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

