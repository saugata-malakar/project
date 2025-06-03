"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function QueueStatusPage() {
  const [queuePosition, setQueuePosition] = useState(7)
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(35)
  const [totalInQueue, setTotalInQueue] = useState(15)
  const [progress, setProgress] = useState(0)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly decide if the queue should advance
      if (Math.random() > 0.7 && queuePosition > 1) {
        setQueuePosition((prev) => prev - 1)
        setEstimatedWaitTime((prev) => Math.max(prev - 5, 5))
        setTotalInQueue((prev) => Math.max(prev - 1, queuePosition))
        setProgress((prev) => Math.min(prev + 10, 100))
      }

      setLastUpdated(new Date())
    }, 10000) // Update every 10 seconds

    // Initial progress
    setProgress(((totalInQueue - queuePosition) / totalInQueue) * 100)

    return () => clearInterval(interval)
  }, [queuePosition, totalInQueue])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/patient/confirmation" className="inline-flex items-center text-blue-600 mb-8 hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Confirmation
        </Link>

        <div className="max-w-md mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Live Queue Status</CardTitle>
              <CardDescription>Real-time updates on your position in the queue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{queuePosition}</div>
                  <div className="text-xs text-gray-500 mt-1">Your Position</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{estimatedWaitTime}</div>
                  <div className="text-xs text-gray-500 mt-1">Minutes Wait</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{totalInQueue}</div>
                  <div className="text-xs text-gray-500 mt-1">Total in Queue</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Queue Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>Department: General Medicine</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-yellow-400 mt-1.5 shrink-0"></div>
                <div>
                  <p className="font-medium text-sm">Almost your turn</p>
                  <p className="text-xs text-gray-600">
                    Please be ready. You'll be called in approximately {estimatedWaitTime} minutes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-100 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-gray-400 mt-1.5 shrink-0"></div>
                <div>
                  <p className="font-medium text-sm">Queue update</p>
                  <p className="text-xs text-gray-600">
                    The queue is moving as expected. Current processing time is 5 minutes per patient.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

