"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ConfirmationPage() {
  const [queuePosition, setQueuePosition] = useState(7)
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(35)
  const [progress, setProgress] = useState(0)

  // Simulate queue progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(20)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // In a real application, this would be connected to a real-time system
  // that updates the queue position and estimated wait time

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Check-In Successful</CardTitle>
            <CardDescription>You have been added to the queue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1">{queuePosition}</div>
              <div className="text-sm text-gray-500">Your position in queue</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Queue Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-blue-800">Estimated Wait Time</p>
                <p className="text-blue-600">Approximately {estimatedWaitTime} minutes</p>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg text-sm">
              <p className="font-medium mb-2">What happens next?</p>
              <ul className="space-y-2 text-gray-600">
                <li>1. You'll be notified when your position is approaching</li>
                <li>2. Please stay in the vicinity of the hospital</li>
                <li>3. When it's your turn, proceed to the reception desk</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/patient/status">View Live Queue Status</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

